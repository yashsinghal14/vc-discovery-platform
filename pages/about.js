import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About | VC Discovery</title>
      </Head>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-[#19202A] to-[#1B2230]">
        <div className="flex-grow flex flex-col items-center justify-center w-full px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-center">About VC Discovery</h1>
          <p className="text-lg text-gray-300 max-w-2xl text-center mb-10">
            VC Discovery is dedicated to helping founders and startups connect with the right venture capitalists. Our mission is to make fundraising transparent, efficient, and accessible for everyone.
          </p>
          <div className="bg-white/5 rounded-2xl p-8 max-w-xl w-full text-center shadow-lg border border-white/10 mt-4">
            <h2 className="text-2xl font-bold text-white mb-4">Our Team</h2>
            <p className="text-gray-400 mb-2">We are a passionate group of entrepreneurs, engineers, and investors building the future of startup fundraising.</p>
            <div className="flex flex-col items-center gap-2 mt-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 mb-2" />
              <span className="text-white font-semibold">Your Name</span>
              <span className="text-gray-400 text-sm">Founder & CEO</span>
            </div>
            <div className="text-gray-500 text-xs mt-6">(Team section is a placeholder. Add your real team info here!)</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 