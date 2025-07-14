import { useState, useEffect } from 'react';

const HeroSection = ({ value, onSearch }) => {
  const [search, setSearch] = useState(value || '');

  useEffect(() => {
    setSearch(value || '');
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(search);
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#19202A] to-[#1B2230] px-4 py-24">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
        Discover and Connect with <span className="text-blue-400">Top Venture Capitalists</span>
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
        Search, filter, and reach out to the right investors for your startup. Instantly find VCs, visit their sites, and email them directly.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center bg-white/10 backdrop-blur-sm rounded-xl shadow-md px-2 py-1 mb-8">
        <input
          type="text"
          className="flex-1 bg-transparent text-white placeholder-gray-400 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          placeholder="Search for VCs, firms, or specialties..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-base transition-all focus:ring-2 focus:ring-blue-400 ml-2"
        >
          Search
        </button>
      </form>

      {/* Start button */}
      <a href="#vc-list">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-200 hover:shadow-blue-500/40 active:scale-95">
          Start Searching
        </button>
      </a>
    </section>
  );
};

export default HeroSection;
