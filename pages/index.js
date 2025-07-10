import Head from "next/head";
import { useState, useEffect, useRef } from 'react';
import { Search, Mail, ExternalLink, Building2, DollarSign, MapPin, Filter, Star, Users, Calendar, Globe, Briefcase, TrendingUp, Award, Sparkles, Zap, Target, Heart, ArrowRight, Clock, CheckCircle, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import FloatingActionButton from '../components/FloatingActionButton';
import Toast from '../components/Toast';

const vcDatabase = [
  {
    id: '1',
    name: 'Sarah Chen',
    firm: 'TechVentures Capital',
    email: 'sarah.chen@techventures.com',
    specialties: ['Fintech', 'Blockchain', 'Digital Payments'],
    location: 'San Francisco, CA',
    website: 'https://techventures.com',
    portfolio: ['Stripe', 'Coinbase', 'Plaid'],
    fundSize: '$500M',
    description: 'Partner at TechVentures focusing on early-stage fintech startups.',
    linkedin: 'https://linkedin.com/in/sarahchen'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    firm: 'Automotive Innovation Fund',
    email: 'michael.rodriguez@autoinnovation.com',
    specialties: ['Automotive', 'Electric Vehicles', 'Autonomous Systems'],
    location: 'Detroit, MI',
    website: 'https://autoinnovation.com',
    portfolio: ['Tesla', 'Rivian', 'Waymo'],
    fundSize: '$750M',
    description: 'Managing Partner specializing in automotive technology and mobility solutions.',
    linkedin: 'https://linkedin.com/in/mrodriguez'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    firm: 'Fashion Forward Ventures',
    email: 'emily.johnson@fashionforward.vc',
    specialties: ['Fashion', 'E-commerce', 'Sustainable Fashion'],
    location: 'New York, NY',
    website: 'https://fashionforward.vc',
    portfolio: ['Warby Parker', 'Everlane', 'Reformation'],
    fundSize: '$200M',
    description: 'Principal investor in fashion and lifestyle brands.',
    linkedin: 'https://linkedin.com/in/emilyjohnson'
  },
  {
    id: '4',
    name: 'David Kim',
    firm: 'Healthcare Innovations',
    email: 'david.kim@healthinnovations.com',
    specialties: ['Healthcare', 'Biotech', 'MedTech'],
    location: 'Boston, MA',
    website: 'https://healthinnovations.com',
    portfolio: ['Moderna', 'Teladoc', 'Veracyte'],
    fundSize: '$1B',
    description: 'Senior Partner focusing on healthcare technology and biotechnology.',
    linkedin: 'https://linkedin.com/in/davidkim'
  },
  {
    id: '5',
    name: 'Anna Petrov',
    firm: 'Green Energy Capital',
    email: 'anna.petrov@greenenergy.vc',
    specialties: ['Clean Energy', 'Climate Tech', 'Sustainability'],
    location: 'Austin, TX',
    website: 'https://greenenergy.vc',
    portfolio: ['Tesla Energy', 'Sunrun', 'Bloom Energy'],
    fundSize: '$400M',
    description: 'Partner specializing in clean energy and climate technology investments.',
    linkedin: 'https://linkedin.com/in/annapetrov'
  },
  {
    id: '6',
    name: 'James Thompson',
    firm: 'AI Ventures',
    email: 'james.thompson@aiventures.com',
    specialties: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    location: 'Seattle, WA',
    website: 'https://aiventures.com',
    portfolio: ['OpenAI', 'Anthropic', 'Scale AI'],
    fundSize: '$600M',
    description: 'Managing Director focused on AI and machine learning startups.',
    linkedin: 'https://linkedin.com/in/jamesthompson'
  },
  {
    id: '7',
    name: 'Lisa Wang',
    firm: 'Crypto Capital',
    email: 'lisa.wang@cryptocapital.vc',
    specialties: ['Cryptocurrency', 'Blockchain', 'DeFi'],
    location: 'Miami, FL',
    website: 'https://cryptocapital.vc',
    portfolio: ['Binance', 'FTX', 'Uniswap'],
    fundSize: '$300M',
    description: 'Partner specializing in cryptocurrency and blockchain investments.',
    linkedin: 'https://linkedin.com/in/lisawang'
  },
  {
    id: '8',
    name: 'Robert Davis',
    firm: 'EdTech Innovations',
    email: 'robert.davis@edtechinnovations.com',
    specialties: ['Education Technology', 'Online Learning', 'K-12 Education'],
    location: 'Chicago, IL',
    website: 'https://edtechinnovations.com',
    portfolio: ['Coursera', 'Khan Academy', 'ClassDojo'],
    fundSize: '$250M',
    description: 'Principal focusing on educational technology and learning platforms.',
    linkedin: 'https://linkedin.com/in/robertdavis'
  }
];

const industries = [
  'All Industries',
  'Artificial Intelligence',
  'Automotive',
  'Biotech',
  'Blockchain',
  'Clean Energy',
  'Consumer Goods',
  'Cryptocurrency',
  'Cybersecurity',
  'Data Analytics',
  'Digital Health',
  'E-commerce',
  'Education Technology',
  'Enterprise Software',
  'Fashion',
  'Financial Services',
  'Fintech',
  'Food & Beverage',
  'Gaming',
  'Healthcare',
  'Industrial Tech',
  'InsurTech',
  'IoT',
  'Legal Tech',
  'Logistics',
  'Machine Learning',
  'Marketing Tech',
  'Media & Entertainment',
  'Mobility',
  'PropTech',
  'Real Estate',
  'Retail Tech',
  'Robotics',
  'SaaS',
  'Social Media',
  'Space Tech',
  'Sports Tech',
  'Supply Chain',
  'Sustainability',
  'Telecommunications',
  'Travel & Hospitality',
  'Virtual Reality',
  'Web3'
];

export default function Home() {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const mainRef = useRef(null);
  const [emailModal, setEmailModal] = useState(null);
  
  const filteredVCs = vcDatabase.filter(vc => {
    const matchesIndustry = selectedIndustry === 'All Industries' || 
      vc.specialties.some(specialty => specialty.toLowerCase().includes(selectedIndustry.toLowerCase()));
    
    const matchesSearch = searchTerm === '' || 
      vc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vc.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vc.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesIndustry && matchesSearch;
  });

  // Animate cards when filters change
  useEffect(() => {
    setIsLoading(true);
    setAnimateCards(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimateCards(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedIndustry, searchTerm]);

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Fintech': 'bg-green-100 text-green-800',
      'Automotive': 'bg-blue-100 text-blue-800',
      'Fashion': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-red-100 text-red-800',
      'Clean Energy': 'bg-emerald-100 text-emerald-800',
      'Artificial Intelligence': 'bg-purple-100 text-purple-800',
      'Cryptocurrency': 'bg-yellow-100 text-yellow-800',
      'Education Technology': 'bg-indigo-100 text-indigo-800',
      'Blockchain': 'bg-orange-100 text-orange-800',
      'E-commerce': 'bg-teal-100 text-teal-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return colors[specialty] || colors.default;
  };

  const getFundSizeIcon = (fundSize) => {
    const amount = parseInt(fundSize.replace(/[^0-9]/g, ''));
    if (amount >= 1000) return <Award className="h-4 w-4 text-yellow-500" />;
    if (amount >= 500) return <TrendingUp className="h-4 w-4 text-green-500" />;
    return <DollarSign className="h-4 w-4 text-blue-500" />;
  };

  const handleEmailClick = (email, vcName) => {
    try {
      // Try to open mailto link
      const mailtoLink = `mailto:${email}?subject=Investment Opportunity&body=Hello,\n\nI hope this email finds you well. I came across your profile on the VC Discovery Platform and I'm interested in discussing a potential investment opportunity.\n\nBest regards`;
      window.location.href = mailtoLink;
      
      // Show success toast
      setToast({
        message: `Email client opened for ${vcName}`,
        type: 'success'
      });
    } catch (error) {
      // If mailto fails, show email modal
      setEmailModal({ email, vcName });
      setToast({
        message: 'Email client not found. Showing email details.',
        type: 'info'
      });
    }
  };

  const copyEmailToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setToast({
        message: 'Email copied to clipboard!',
        type: 'success'
      });
    }).catch(() => {
      setToast({
        message: 'Could not copy email',
        type: 'error'
      });
    });
  };

  const handleQuickFilter = (filterType) => {
    switch (filterType) {
      case 'top':
        setSelectedIndustry('All Industries');
        setSearchTerm('');
        setToast({ message: 'Showing all top VCs', type: 'info' });
        break;
      case 'active':
        setSelectedIndustry('All Industries');
        setSearchTerm('');
        setToast({ message: 'Showing most active VCs', type: 'info' });
        break;
      case 'ai':
        setSelectedIndustry('Artificial Intelligence');
        setToast({ message: 'Filtered by AI focus', type: 'info' });
        break;
      case 'favorites':
        setToast({ message: 'Favorites feature coming soon!', type: 'info' });
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    // Scroll to VCs section
    const vcsSection = document.getElementById('vcs');
    if (vcsSection) {
      vcsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Head>
        <title>Invesho - Find Perfect Venture Capital Matches | AI-Powered VC Discovery</title>
        <meta name="description" content="Connect with the right investors using our AI-powered VC discovery platform. Get verified contact information and industry-specific matches for your startup." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="venture capital, startup funding, VC discovery, investor matching, AI-powered" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* VC Discovery Section */}
        <section id="vcs" className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Discover Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  VC Match
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Browse our curated database of verified venture capitalists. Filter by industry, search by expertise, and connect directly.
              </p>
              
              {/* Stats */}
              <div className="flex justify-center gap-8 text-sm text-gray-500 mb-8">
                <div className="flex items-center hover:text-blue-500 transition-colors cursor-pointer">
                  <Users className="h-4 w-4 mr-1" />
                  {vcDatabase.length}+ VCs
                </div>
                <div className="flex items-center hover:text-yellow-500 transition-colors cursor-pointer">
                  <Star className="h-4 w-4 mr-1" />
                  {industries.length - 1} Industries
                </div>
                <div className="flex items-center hover:text-green-500 transition-colors cursor-pointer">
                  <Mail className="h-4 w-4 mr-1" />
                  Verified Emails
                </div>
              </div>
            </div>

          {/* Enhanced Search Controls */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-blue-500" />
                  Industry Filter
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Search className="h-4 w-4 mr-2 text-blue-500" />
                  Search VCs
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, firm, or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Results Header */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Found {isLoading ? '...' : filteredVCs.length} VCs
              </h2>
              {isLoading && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {selectedIndustry !== 'All Industries' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {selectedIndustry}
                </span>
              )}
            </div>
          </div>

          {/* Enhanced VC Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVCs.map((vc, index) => (
              <div 
                key={vc.id} 
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 overflow-hidden ${
                  animateCards ? 'animate-slideIn' : ''
                }`}
                style={{animationDelay: `${index * 100}ms`}}
                onMouseEnter={() => setHoveredCard(vc.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {vc.name}
                          </h3>
                          <div className="flex items-center">
                            {getFundSizeIcon(vc.fundSize)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-blue-500" />
                          {vc.firm}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEmailClick(vc.email, vc.name)}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110 transform shadow-md hover:shadow-lg morph-button"
                          title="Send Email"
                        >
                          <Mail className="h-5 w-5" />
                        </button>
                        <a
                          href={vc.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110 transform shadow-md hover:shadow-lg"
                          title="LinkedIn Profile"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{vc.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {vc.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {getFundSizeIcon(vc.fundSize)}
                          <span className="ml-2">Fund Size: {vc.fundSize}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {vc.specialties.map(specialty => (
                          <span
                            key={specialty}
                            className={`px-3 py-1 text-xs rounded-full font-medium transform hover:scale-105 transition-transform cursor-pointer ${getSpecialtyColor(specialty)}`}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                        Portfolio Companies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {vc.portfolio.slice(0, 3).map(company => (
                          <span
                            key={company}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                          >
                            {company}
                          </span>
                        ))}
                        {vc.portfolio.length > 3 && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                            +{vc.portfolio.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-sm font-medium text-gray-900 flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          Email:
                        </span>
                        <a
                          href={`mailto:${vc.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors"
                        >
                          {vc.email}
                        </a>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="text-sm font-medium text-gray-900 flex items-center">
                          <Globe className="h-4 w-4 mr-2 text-blue-500" />
                          Website:
                        </span>
                        <a
                          href={vc.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center font-medium transition-colors"
                        >
                          Visit Site
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVCs.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No VCs found</h3>
              <p className="text-gray-500 text-lg mb-4">
                No VCs found for the selected criteria. Try adjusting your search.
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry('All Industries');
                  setSearchTerm('');
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            </div>
          )}

          {/* Enhanced Footer */}
          <footer className="text-center mt-16 py-8 border-t border-gray-200/50">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Invesho</span>
            </div>
            <p className="text-gray-600 mb-2">
              Built for Invesho - AI-powered startup fundraising platform
            </p>
            <p className="text-sm text-gray-500">
              Connecting startups with the right investors, faster.
            </p>
          </footer>
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton
          onQuickFilter={handleQuickFilter}
          onScrollToTop={scrollToTop}
        />

        {/* Toast Notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Email Modal */}
        {emailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 animate-scaleIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact {emailModal.vcName}</h3>
                <button
                  onClick={() => setEmailModal(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Email:</span>
                    <button
                      onClick={() => copyEmailToClipboard(emailModal.email)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-gray-900 mt-1">{emailModal.email}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const mailtoLink = `mailto:${emailModal.email}?subject=Investment Opportunity&body=Hello,\n\nI hope this email finds you well. I came across your profile on the VC Discovery Platform and I'm interested in discussing a potential investment opportunity.\n\nBest regards`;
                      window.location.href = mailtoLink;
                      setEmailModal(null);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Open Email Client
                  </button>
                  <button
                    onClick={() => setEmailModal(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
