import Head from "next/head";
import { useState, useEffect, useRef } from 'react';
import { Mail, ExternalLink, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

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
  const [vcDatabase, setVcDatabase] = useState([]);
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

  // Load VC data from public/vc_emails.json
  useEffect(() => {
    fetch('/vc_emails.json')
      .then(res => res.json())
      .then(data => setVcDatabase(Array.isArray(data) ? data : []))
      .catch(() => setVcDatabase([]));
  }, []);

  // Unified filter logic
  const filteredVCs = vcDatabase.filter(vc => {
    const matchesIndustry = selectedIndustry === 'All Industries' ||
      (vc.specialties && Array.isArray(vc.specialties) && vc.specialties.some(specialty => specialty.toLowerCase().includes(selectedIndustry.toLowerCase())));
    const matchesSearch = searchTerm === '' ||
      (vc.name && vc.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vc.firm && vc.firm.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (vc.specialties && Array.isArray(vc.specialties) && vc.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())));
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
      'Fintech': 'bg-slate-800 text-slate-100',
      'Automotive': 'bg-gray-700 text-gray-100',
      'Fashion': 'bg-pink-700 text-white',
      'Healthcare': 'bg-red-700 text-white',
      'Clean Energy': 'bg-green-700 text-white',
      'Artificial Intelligence': 'bg-indigo-700 text-white',
      'Cryptocurrency': 'bg-yellow-600 text-gray-900',
      'Education Technology': 'bg-indigo-800 text-white',
      'Blockchain': 'bg-orange-700 text-white',
      'E-commerce': 'bg-teal-700 text-white',
      'default': 'bg-gray-800 text-white'
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

  // Handler for both search bars
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Head>
        <title>VC Discovery Platform</title>
      </Head>
      <Navbar />
      <HeroSection onSearch={handleSearch} />
      {/* VC Search/Results Section */}
      <section id="vc-list" className="bg-gradient-to-br from-[#19202A] to-[#1B2230] py-16 px-4 min-h-[60vh]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-white">Venture Capitalists</h2>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select
                className="bg-[#232B3B] text-white px-4 py-2 rounded-lg focus:outline-none w-auto md:w-auto"
                value={selectedIndustry}
                onChange={e => setSelectedIndustry(e.target.value)}
              >
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 justify-center">
            {filteredVCs.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12 text-lg">No VCs found. Try a different search or filter.</div>
            )}
            {filteredVCs.map(vc => (
              <div
                key={vc.id}
                className="bg-[#232B3B] rounded-2xl p-6 shadow-lg flex flex-col gap-4 border border-[#232B3B] hover:border-blue-500 transition-all hover:scale-[1.03] duration-200 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl uppercase">
                    {vc.name[0]}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{vc.name}</div>
                    <div className="text-blue-400 font-medium">{vc.firm}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-1">
                  {vc.specialties.map(s => (
                    <span key={s} className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-xs font-medium">{s}</span>
                  ))}
                </div>
                <div className="text-gray-300 text-sm mb-1">{vc.location}</div>
                <div className="text-gray-400 text-sm mb-2 line-clamp-2">{vc.description}</div>
                <div className="border-t border-[#2D3748] pt-3 flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-gray-400 font-semibold">Portfolio:</span>
                  {Array.isArray(vc.portfolio) && vc.portfolio.slice(0, 3).map(company => (
                    <span key={company} className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs font-medium">{company}</span>
                  ))}
                  {Array.isArray(vc.portfolio) && vc.portfolio.length > 3 && (
                    <span className="bg-blue-700 text-white px-2 py-1 rounded text-xs font-medium">+{vc.portfolio.length - 3} more</span>
                  )}
                </div>
                <div className="border-t border-[#2D3748] pt-4 flex gap-3 mt-2">
                  <a href={`mailto:${vc.email}`} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all" title="Email VC"><Mail className="h-4 w-4" /> Email</a>
                  <a href={vc.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-gray-700 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all" title="Visit Website"><ExternalLink className="h-4 w-4" /> Website</a>
                  <button className="flex items-center gap-1 bg-gray-700 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all" title="More Info" /* onClick for modal to be added */><Info className="h-4 w-4" /> Info</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
