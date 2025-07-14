const express = require('express');
const router = express.Router();
const validator = require('validator');
const nodemailer = require('nodemailer');
const dns = require('dns');
const { promisify } = require('util');

const resolveMx = promisify(dns.resolveMx);

// Email validation endpoint
router.post('/validate', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        valid: false, 
        message: 'Email is required' 
      });
    }

    const validationResult = await validateEmail(email);
    res.json(validationResult);
  } catch (error) {
    console.error('Email validation error:', error);
    res.status(500).json({ 
      valid: false, 
      message: 'Email validation failed' 
    });
  }
});

// Batch email validation
router.post('/validate-batch', async (req, res) => {
  try {
    const { emails } = req.body;
    
    if (!Array.isArray(emails)) {
      return res.status(400).json({ 
        error: 'Emails must be an array' 
      });
    }

    const results = await Promise.allSettled(
      emails.map(email => validateEmail(email))
    );

    const validationResults = results.map((result, index) => ({
      email: emails[index],
      ...(result.status === 'fulfilled' ? result.value : { valid: false, message: 'Validation failed' })
    }));

    res.json({
      results: validationResults,
      summary: {
        total: emails.length,
        valid: validationResults.filter(r => r.valid).length,
        invalid: validationResults.filter(r => !r.valid).length
      }
    });
  } catch (error) {
    console.error('Batch email validation error:', error);
    res.status(500).json({ 
      error: 'Batch email validation failed' 
    });
  }
});

// Send test email
router.post('/send-test', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    if (!to || !subject || !message) {
      return res.status(400).json({ 
        error: 'To, subject, and message are required' 
      });
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@invesho.com',
      to: to,
      subject: subject,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message 
    });
  }
});

// Helper function to validate email
async function validateEmail(email) {
  const result = {
    email: email,
    valid: false,
    checks: {
      format: false,
      domain: false,
      mx: false
    },
    message: ''
  };

  // Check email format
  if (!validator.isEmail(email)) {
    result.message = 'Invalid email format';
    return result;
  }
  result.checks.format = true;

  // Extract domain
  const domain = email.split('@')[1];
  
  try {
    // Check MX records
    const mxRecords = await resolveMx(domain);
    if (mxRecords && mxRecords.length > 0) {
      result.checks.mx = true;
      result.checks.domain = true;
      result.valid = true;
      result.message = 'Email appears to be valid';
    } else {
      result.message = 'No MX records found for domain';
    }
  } catch (error) {
    result.message = `Domain validation failed: ${error.message}`;
  }

  return result;
}

module.exports = router;
