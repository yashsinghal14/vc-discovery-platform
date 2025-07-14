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
      <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
        Discover and Connect with <span className="text-blue-400">Top Venture Capitalists</span>
      </h1>
      <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-300 sm:text-xl">
        Search, filter, and reach out to the right investors for your startup. Instantly find VCs, visit their sites, and email them directly.
      </p>
      <br />
      {/* Search bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-[800px] max-w-lg px-4 min-h-[30px] mx-auto transition-all duration-200 border border-blue-100 rounded-full shadow-lg bg-white/80 backdrop-blur-md focus-within:ring-2 focus-within:ring-blue-300"
      >
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-6 text-base text-gray-800 placeholder-gray-400 transition-all duration-200 bg-transparent rounded-full outline-none min-h-[30px] focus:ring-0 focus:border-blue-500"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            if (onSearch) onSearch(e.target.value);
          }}
        />
        <button
          type="submit"
          className="min-w-[70px] min-h-[30px] ml-2 font-semibold text-white transition-all duration-200 rounded-full shadow bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
        >
          Search
        </button>
      </form>

      <br />
      {/* Start button */}
      <a href="#vc-list">
        <button className="px-6 py-2 min-w-[180px] ml-2 text-base font-semibold text-white transition-all duration-200 ease-in-out rounded-full shadow-md bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95">
          Start Searching
        </button>
      </a>
    </section>
  );
};

export default HeroSection;
