'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useScroll, motion, useMotionValueEvent } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(13,12,29,0.85)] backdrop-blur-[20px] border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#534AB7] to-[#D85A30] flex-shrink-0" />
          <span className="font-bold text-xl text-white tracking-tight group-hover:text-white/90 transition-colors">
            Inzira
          </span>
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Testimonials'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <span className="inline-block border border-white/20 text-white px-5 py-2 rounded-full hover:border-white/60 hover:bg-white/5 transition-all duration-200 cursor-pointer text-sm font-semibold">
              Log In
            </span>
          </Link>
          <Link href="/auth/register">
            <span className="inline-block bg-gradient-to-r from-[#D85A30] to-[#EF9F27] text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-[#D85A30]/30 transition-all duration-200 cursor-pointer text-sm">
              Get Started
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden text-white hover:text-white/80 transition-colors p-1"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[69px] left-0 right-0 bottom-0 bg-[#0D0C1D]/95 backdrop-blur-lg z-40 p-6 flex flex-col gap-6 animate-fadeIn">
          <nav className="flex flex-col gap-5">
            {['Features', 'How It Works', 'Testimonials'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-white/80 hover:text-white transition-colors border-b border-white/5 pb-2"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-4 mt-auto">
            <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="block text-center border border-white/20 text-white px-5 py-2.5 rounded-full hover:border-white/60 hover:bg-white/5 transition-all text-sm font-semibold cursor-pointer">
                Log In
              </span>
            </Link>
            <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="block text-center bg-gradient-to-r from-[#D85A30] to-[#EF9F27] text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-[#D85A30]/30 transition-all text-sm cursor-pointer">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
