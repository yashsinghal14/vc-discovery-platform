const mongoose = require('mongoose');

const vcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  firm: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  emailValidated: {
    type: Boolean,
    default: false
  },
  emailValidationDate: {
    type: Date
  },
  emailValidationResult: {
    type: Object,
    default: null
  },
  specialties: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  portfolio: [{
    type: String,
    trim: true
  }],
  fundSize: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  investmentStage: [{
    type: String,
    enum: ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Growth', 'Late Stage'],
    trim: true
  }],
  checkSize: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  geography: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    enum: ['manual', 'scraped', 'api', 'imported'],
    default: 'manual'
  },
  scraped: {
    date: {
      type: Date
    },
    source: {
      type: String
    }
  },
  contactAttempts: [{
    date: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['email', 'linkedin', 'phone', 'website']
    },
    result: {
      type: String,
      enum: ['success', 'bounced', 'no_response', 'invalid']
    },
    notes: {
      type: String
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
vcSchema.index({ email: 1 });
vcSchema.index({ specialties: 1 });
vcSchema.index({ location: 1 });
vcSchema.index({ firm: 1 });
vcSchema.index({ isActive: 1 });
vcSchema.index({ 'checkSize.min': 1, 'checkSize.max': 1 });

// Virtual for full name
vcSchema.virtual('fullName').get(function() {
  return `${this.name} - ${this.firm}`;
});

// Pre-save middleware
vcSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Static method to find VCs by industry
vcSchema.statics.findByIndustry = function(industry) {
  return this.find({
    specialties: { $in: [new RegExp(industry, 'i')] },
    isActive: true
  });
};

// Static method to find VCs by location
vcSchema.statics.findByLocation = function(location) {
  return this.find({
    $or: [
      { location: new RegExp(location, 'i') },
      { geography: { $in: [new RegExp(location, 'i')] } }
    ],
    isActive: true
  });
};

// Static method to find VCs by check size
vcSchema.statics.findByCheckSize = function(amount) {
  return this.find({
    'checkSize.min': { $lte: amount },
    'checkSize.max': { $gte: amount },
    isActive: true
  });
};

// Instance method to update email validation
vcSchema.methods.updateEmailValidation = function(validationResult) {
  this.emailValidated = validationResult.valid;
  this.emailValidationDate = new Date();
  this.emailValidationResult = validationResult;
  return this.save();
};

// Instance method to add contact attempt
vcSchema.methods.addContactAttempt = function(method, result, notes) {
  this.contactAttempts.push({
    method: method,
    result: result,
    notes: notes
  });
  return this.save();
};

module.exports = mongoose.model('Vc', vcSchema);
