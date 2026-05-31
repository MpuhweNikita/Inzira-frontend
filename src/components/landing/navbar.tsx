'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

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
          ? 'bg-[#0e0e18]/90 backdrop-blur-[20px] border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-2.5 h-2.5 rounded-full bg-[#e84b2a] flex-shrink-0" />
          <span className="font-extrabold text-xl text-white tracking-tight group-hover:text-white/90 transition-colors">
            Inzira
          </span>
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'How It Works', 'Testimonials'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/auth/login">
            <span className="inline-flex items-center gap-2 bg-transparent text-white/80 hover:text-white px-4 py-2 text-sm font-semibold transition-all cursor-pointer">
              Log In
            </span>
          </Link>
          <Link href="/auth/register">
            <span className="inline-flex items-center gap-3 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white pl-5 pr-1.5 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer text-xs shadow-md shadow-[#e84b2a]/20">
              <span>Get Started</span>
              <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0e0e18]">
                <ArrowRight className="w-3 h-3 text-[#e84b2a] stroke-[3px]" />
              </span>
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
        <div className="md:hidden fixed top-[69px] left-0 right-0 bottom-0 bg-[#0e0e18]/95 backdrop-blur-lg z-40 p-6 flex flex-col gap-6 animate-fadeIn">
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
              <span className="flex items-center justify-center gap-3 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white py-2.5 rounded-full font-semibold transition-all text-sm cursor-pointer shadow-lg shadow-[#e84b2a]/20">
                <span>Get Started</span>
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#0e0e18]">
                  <ArrowRight className="w-3 h-3 text-[#e84b2a] stroke-[3px]" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
