import Link from 'next/link';
import { ArrowUp, Heart, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'GitHub', href: '#', icon: Github },
  ];
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className="bg-gradient-to-br from-[#19202A] to-[#1B2230] text-white pt-12 pb-6 mt-12">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6 px-4">
        <Link href="/" className="flex items-center space-x-2 mb-2 select-none">
          <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="11,2 20,7 20,15 11,20 2,15 2,7" fill="#3B82F6" />
            </svg>
          </div>
          <span className="text-xl font-extrabold tracking-tight">VC Discovery</span>
        </Link>
        <p className="text-gray-400 text-base max-w-xl mb-2">
          Discover, search, and connect with top venture capitalists. Instantly find VCs, visit their sites, and email them directly.
        </p>
        <div className="flex gap-4 mb-2">
          {socialLinks.map((social) => (
            <Link key={social.name} href={social.href} className="p-2 bg-[#232B3B] rounded-lg hover:bg-blue-700 transition-colors duration-200 group" title={social.name}>
              <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mt-2">
          <span>© {currentYear} VC Discovery. All rights reserved.</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-1">Made with <Heart className="h-4 w-4 text-red-500" /> for founders</span>
        </div>
        <button
          onClick={scrollToTop}
          className="mt-4 p-2 bg-[#232B3B] rounded-lg hover:bg-blue-700 transition-colors duration-200 group"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
