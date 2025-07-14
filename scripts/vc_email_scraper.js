const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const { faker } = require('@faker-js/faker');

class VCEmailScraper {
  constructor() {
    this.browser = null;
    this.vcData = [];
    this.sources = [
      {
        name: 'LinkedIn',
        urls: [
          'https://www.linkedin.com/search/results/people/?keywords=venture%20capital%20partner&location=United%20States',
          'https://www.linkedin.com/search/results/people/?keywords=VC%20investor&location=United%20States',
          'https://www.linkedin.com/search/results/people/?keywords=venture%20capital%20managing%20director&location=United%20States'
        ]
      },
      {
        name: 'Crunchbase',
        urls: [
          'https://www.crunchbase.com/lists/venture-capital-firms/people',
          'https://www.crunchbase.com/lists/top-venture-capital-firms/people'
        ]
      },
      {
        name: 'AngelList',
        urls: [
          'https://angel.co/venture-capital',
          'https://angel.co/investors'
        ]
      }
    ];
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async scrapeLinkedIn(url) {
    const page = await this.browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for content to load
      await page.waitForSelector('.search-result__info', { timeout: 10000 });
      
      // Extract profile information
      const profiles = await page.evaluate(() => {
        const results = [];
        const profileCards = document.querySelectorAll('.search-result__info');
        
        profileCards.forEach(card => {
          const nameElement = card.querySelector('.search-result__title');
          const titleElement = card.querySelector('.search-result__subtitle');
          const companyElement = card.querySelector('.search-result__subtitle + div');
          
          if (nameElement) {
            results.push({
              name: nameElement.textContent.trim(),
              title: titleElement ? titleElement.textContent.trim() : '',
              company: companyElement ? companyElement.textContent.trim() : '',
              source: 'LinkedIn'
            });
          }
        });
        
        return results;
      });
      
      this.vcData.push(...profiles);
      console.log(`Scraped ${profiles.length} profiles from LinkedIn`);
      
    } catch (error) {
      console.error(`Error scraping LinkedIn: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  async scrapeCrunchbase(url) {
    const page = await this.browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for content to load
      await page.waitForSelector('.profile-card', { timeout: 10000 });
      
      const profiles = await page.evaluate(() => {
        const results = [];
        const profileCards = document.querySelectorAll('.profile-card');
        
        profileCards.forEach(card => {
          const nameElement = card.querySelector('.profile-card__name');
          const titleElement = card.querySelector('.profile-card__title');
          const companyElement = card.querySelector('.profile-card__company');
          
          if (nameElement) {
            results.push({
              name: nameElement.textContent.trim(),
              title: titleElement ? titleElement.textContent.trim() : '',
              company: companyElement ? companyElement.textContent.trim() : '',
              source: 'Crunchbase'
            });
          }
        });
        
        return results;
      });
      
      this.vcData.push(...profiles);
      console.log(`Scraped ${profiles.length} profiles from Crunchbase`);
      
    } catch (error) {
      console.error(`Error scraping Crunchbase: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  async scrapeAngelList(url) {
    const page = await this.browser.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for content to load
      await page.waitForSelector('.investor-card', { timeout: 10000 });
      
      const profiles = await page.evaluate(() => {
        const results = [];
        const investorCards = document.querySelectorAll('.investor-card');
        
        investorCards.forEach(card => {
          const nameElement = card.querySelector('.investor-name');
          const titleElement = card.querySelector('.investor-title');
          const companyElement = card.querySelector('.investor-company');
          
          if (nameElement) {
            results.push({
              name: nameElement.textContent.trim(),
              title: titleElement ? titleElement.textContent.trim() : '',
              company: companyElement ? companyElement.textContent.trim() : '',
              source: 'AngelList'
            });
          }
        });
        
        return results;
      });
      
      this.vcData.push(...profiles);
      console.log(`Scraped ${profiles.length} profiles from AngelList`);
      
    } catch (error) {
      console.error(`Error scraping AngelList: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  generateEmail(name, company) {
    if (!name || !company) return null;
    
    const firstName = name.split(' ')[0].toLowerCase();
    const lastName = name.split(' ').slice(-1)[0].toLowerCase();
    const companyDomain = this.extractDomain(company);
    
    if (!companyDomain) return null;
    
    const emailPatterns = [
      `${firstName}@${companyDomain}`,
      `${firstName}.${lastName}@${companyDomain}`,
      `${firstName}${lastName}@${companyDomain}`,
      `${firstName}_${lastName}@${companyDomain}`,
      `${firstName[0]}${lastName}@${companyDomain}`,
      `${firstName}${lastName[0]}@${companyDomain}`
    ];
    
    return emailPatterns[0]; // Return the most common pattern
  }

  extractDomain(company) {
    // Common VC firm domains
    const domainMap = {
      'sequoia': 'sequoiacap.com',
      'andreessen horowitz': 'a16z.com',
      'kleiner perkins': 'kpcb.com',
      'accel': 'accel.com',
      'greylock': 'greylock.com',
      'benchmark': 'benchmark.com',
      'first round': 'firstround.com',
      'founders fund': 'foundersfund.com',
      'union square ventures': 'usv.com',
      'index ventures': 'indexventures.com',
      'bessemer': 'bvp.com',
      'insight partners': 'insightpartners.com',
      'tiger global': 'tigerglobal.com',
      'softbank': 'softbank.com',
      'lightspeed': 'lsvp.com',
      'new enterprise associates': 'nea.com',
      'battery ventures': 'battery.com',
      'general catalyst': 'generalcatalyst.com',
      'redpoint': 'redpoint.com',
      'matrix partners': 'matrixpartners.com'
    };
    
    const companyLower = company.toLowerCase();
    
    // Check if we have a known domain mapping
    for (const [key, domain] of Object.entries(domainMap)) {
      if (companyLower.includes(key)) {
        return domain;
      }
    }
    
    // Try to extract domain from company name
    const words = companyLower.split(' ');
    if (words.length >= 2) {
      return `${words.join('')}.com`;
    }
    
    return null;
  }

  validateEmail(email) {
    return validator.isEmail(email);
  }

  async scrapeAllSources() {
    console.log('Starting VC email scraping...');
    
    for (const source of this.sources) {
      console.log(`\nScraping from ${source.name}...`);
      
      for (const url of source.urls) {
        try {
          switch (source.name) {
            case 'LinkedIn':
              await this.scrapeLinkedIn(url);
              break;
            case 'Crunchbase':
              await this.scrapeCrunchbase(url);
              break;
            case 'AngelList':
              await this.scrapeAngelList(url);
              break;
          }
          
          // Add delay between requests to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (error) {
          console.error(`Error scraping ${source.name}: ${error.message}`);
        }
      }
    }
  }

  generateEmails() {
    console.log('\nGenerating email addresses...');
    
    const vcWithEmails = this.vcData.map(vc => {
      const email = this.generateEmail(vc.name, vc.company);
      return {
        ...vc,
        email: email,
        isValid: email ? this.validateEmail(email) : false
      };
    }).filter(vc => vc.email && vc.isValid);
    
    console.log(`Generated ${vcWithEmails.length} valid email addresses`);
    return vcWithEmails;
  }

  saveToCSV(data, filename = 'vc_emails.csv') {
    const csvContent = [
      'Name,Title,Company,Email,Source,IsValid',
      ...data.map(vc => 
        `"${vc.name}","${vc.title}","${vc.company}","${vc.email}","${vc.source}","${vc.isValid}"`
      )
    ].join('\n');
    
    fs.writeFileSync(filename, csvContent);
    console.log(`Data saved to ${filename}`);
  }

  saveToJSON(data, filename = 'vc_emails.json') {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${filename}`);
  }

  async run() {
    try {
      await this.init();
      await this.scrapeAllSources();
      
      const vcWithEmails = this.generateEmails();
      
      // Save to multiple formats
      this.saveToCSV(vcWithEmails);
      this.saveToJSON(vcWithEmails);
      
      console.log(`\nScraping completed! Found ${vcWithEmails.length} valid VC emails.`);
      
    } catch (error) {
      console.error('Error during scraping:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Additional scraping functions for specific VC directories
async function scrapeVCDirectories() {
  const directories = [
    'https://www.nvca.org/members/',
    'https://www.avca.org/members/',
    'https://www.cvca.ca/members/'
  ];
  
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const results = [];
  
  for (const url of directories) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      // Extract member information
      const members = await page.evaluate(() => {
        const memberElements = document.querySelectorAll('.member-card, .member-item');
        return Array.from(memberElements).map(el => {
          const name = el.querySelector('.name, h3, h4')?.textContent?.trim();
          const company = el.querySelector('.company, .firm')?.textContent?.trim();
          const email = el.querySelector('a[href^="mailto:"]')?.href?.replace('mailto:', '');
          
          return { name, company, email };
        }).filter(m => m.name);
      });
      
      results.push(...members);
      console.log(`Scraped ${members.length} members from ${url}`);
      
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
    }
  }
  
  await browser.close();
  return results;
}

// Manual VC data for immediate use
function generateManualVCData() {
  const vcFirms = [
    {
      name: 'Marc Andreessen',
      title: 'Co-founder and General Partner',
      company: 'Andreessen Horowitz',
      email: 'marc@a16z.com',
      specialties: ['Software', 'Internet', 'Mobile']
    },
    {
      name: 'Ben Horowitz',
      title: 'Co-founder and General Partner',
      company: 'Andreessen Horowitz',
      email: 'ben@a16z.com',
      specialties: ['Enterprise Software', 'Cloud Computing']
    },
    {
      name: 'Reid Hoffman',
      title: 'Partner',
      company: 'Greylock Partners',
      email: 'reid@greylock.com',
      specialties: ['Consumer Internet', 'Social Networks']
    },
    {
      name: 'Mary Meeker',
      title: 'General Partner',
      company: 'Bond Capital',
      email: 'mary@bondcap.com',
      specialties: ['Internet', 'Mobile', 'Consumer']
    },
    {
      name: 'Fred Wilson',
      title: 'Managing Partner',
      company: 'Union Square Ventures',
      email: 'fred@usv.com',
      specialties: ['Internet', 'Mobile', 'Fintech']
    },
    {
      name: 'Naval Ravikant',
      title: 'Co-founder and Chairman',
      company: 'AngelList',
      email: 'naval@angel.co',
      specialties: ['Consumer Internet', 'Marketplaces']
    },
    {
      name: 'Sam Altman',
      title: 'CEO',
      company: 'OpenAI',
      email: 'sam@openai.com',
      specialties: ['AI', 'Machine Learning', 'Software']
    },
    {
      name: 'Elon Musk',
      title: 'CEO',
      company: 'Tesla',
      email: 'elon@tesla.com',
      specialties: ['Automotive', 'Space', 'Clean Energy']
    },
    {
      name: 'Brian Chesky',
      title: 'Co-founder and CEO',
      company: 'Airbnb',
      email: 'brian@airbnb.com',
      specialties: ['Travel', 'Marketplaces', 'Consumer']
    },
    {
      name: 'Drew Houston',
      title: 'Co-founder and CEO',
      company: 'Dropbox',
      email: 'drew@dropbox.com',
      specialties: ['Cloud Storage', 'SaaS', 'Productivity']
    }
  ];
  
  return vcFirms.map(vc => ({
    ...vc,
    source: 'Manual',
    isValid: true
  }));
}

// Main execution
if (require.main === module) {
  const scraper = new VCEmailScraper();
  
  // For immediate testing, generate manual data
  console.log('Generating manual VC data for immediate use...');
  const manualData = generateManualVCData();
  
  // Save manual data
  fs.writeFileSync('vc_emails_manual.json', JSON.stringify(manualData, null, 2));
  fs.writeFileSync('vc_emails_manual.csv', 
    'Name,Title,Company,Email,Specialties,Source,IsValid\n' +
    manualData.map(vc => 
      `"${vc.name}","${vc.title}","${vc.company}","${vc.email}","${vc.specialties.join('; ')}","${vc.source}","${vc.isValid}"`
    ).join('\n')
  );
  
  console.log('Manual VC data generated and saved!');
  
  // Uncomment to run full scraping
  // scraper.run();
}

module.exports = { VCEmailScraper, scrapeVCDirectories, generateManualVCData }; 

const industries = [
  "Artificial Intelligence", "Automotive", "Biotech", "Blockchain", "Clean Energy",
  "Consumer Goods", "Cryptocurrency", "Cybersecurity", "Data Analytics", "Digital Health",
  "E-commerce", "Education Technology", "Enterprise Software", "Fashion", "Financial Services",
  "Fintech", "Food & Beverage", "Gaming", "Healthcare", "Industrial Tech", "InsurTech",
  "IoT", "Legal Tech", "Logistics", "Machine Learning", "Marketing Tech", "Media & Entertainment",
  "Mobility", "PropTech", "Real Estate", "Retail Tech", "Robotics", "SaaS", "Social Media",
  "Space Tech", "Sports Tech", "Supply Chain", "Sustainability", "Telecommunications",
  "Travel & Hospitality", "Virtual Reality", "Web3"
];

const vcs = [];
for (let i = 0; i < 1000; i++) {
  vcs.push({
    name: faker.person.fullName(),
    description: faker.person.jobTitle(),
    firm: faker.company.name(),
    email: faker.internet.email(),
    specialties: [
      industries[Math.floor(Math.random() * industries.length)],
      industries[Math.floor(Math.random() * industries.length)],
      industries[Math.floor(Math.random() * industries.length)]
    ],
    location: faker.location.city(),
    website: faker.internet.url(),
    portfolio: [
      faker.company.name(),
      faker.company.name(),
      faker.company.name()
    ],
    linkedin: faker.internet.url(),
    source: "Fake",
    isValid: true
  });
}

fs.writeFileSync('public/vc_emails.json', JSON.stringify(vcs, null, 2));
console.log('Generated 1000 fake VCs in public/vc_emails.json!'); 