import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-br from-[#19202A] to-[#1B2230] bg-opacity-95 backdrop-blur-md border-b border-[#232B3B] shadow-md">
      <div className="max-w-7xl mx-auto px-8 sm:px-16 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 select-none">
          <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="11,2 20,7 20,15 11,20 2,15 2,7" fill="#3B82F6" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">VC Discovery</span>
        </Link>
        {/* Navigation Links */}
<div className="flex items-center space-x-24">
<Link href="/" className="text-white font-bold text-xl hover:text-blue-400 transition-colors px-8 py-4 rounded-full hover:bg-[#2A3345]">
            Home
          </Link>
<Link href="/about" className="text-white font-bold text-xl hover:text-blue-400 transition-colors px-8 py-4 rounded-full hover:bg-[#2A3345]">
            About
          </Link>
<Link href="/contact" className="text-white font-bold text-xl hover:text-blue-400 transition-colors px-8 py-4 rounded-full hover:bg-[#2A3345]">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;