import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact | VC Discovery</title>
      </Head>
      <Navbar />
      <main className="min-h-[60vh] bg-gradient-to-br from-[#19202A] to-[#1B2230] flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-300 max-w-2xl text-center mb-10">
          Have questions, feedback, or want to partner? Fill out the form below and we’ll get back to you soon.
        </p>
        <form onSubmit={handleSubmit} className="bg-[#232B3B] rounded-2xl p-8 max-w-xl w-full flex flex-col gap-4 shadow-lg">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="px-4 py-3 rounded-lg bg-[#181F2A] text-white placeholder-gray-400 focus:outline-none"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="px-4 py-3 rounded-lg bg-[#181F2A] text-white placeholder-gray-400 focus:outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="px-4 py-3 rounded-lg bg-[#181F2A] text-white placeholder-gray-400 focus:outline-none min-h-[120px]"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg text-lg transition-all mt-2"
          >
            Send Message
          </button>
          {submitted && <div className="text-green-400 text-center mt-2">Thank you! Your message has been received.</div>}
        </form>
      </main>
      <Footer />
    </>
  );
} 