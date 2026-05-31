'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const testimonials = [
  {
    name: 'Amara N.',
    role: 'Data Analyst at TechCorp',
    quote: "The mock interviews are scary good. The AI feedback felt like a real technical interview. It helped me close key knowledge gaps in my SQL and data analysis strategies.",
    stars: 5,
    initials: 'AN',
  },
  {
    name: 'Jean Pierre K.',
    role: 'Full Stack Developer',
    quote: "Inzira's roadmap feature gave me a clear path to senior dev. I got promoted 3 months after following the personalized learning checkpoints and project guides.",
    stars: 5,
    initials: 'JK',
  },
  {
    name: 'David M.',
    role: 'Backend Engineer',
    quote: "My resume ATS score went from 54 to 89 after following the recommendations. I started getting recruiter callbacks within a week of uploading the update.",
    stars: 5,
    initials: 'DM',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-[#f5f5f5] py-24 pb-36 relative overflow-hidden text-[#0e0e18]">
      {/* Decorative Ornaments (Consistent across all sections) */}
      {/* 1. Dot Grid Pattern in corner */}
      <div className="absolute top-12 left-12 w-16 h-16 bg-[radial-gradient(#e84b2a_2px,transparent_2px)] [background-size:10px_10px] opacity-20 select-none pointer-events-none" />

      {/* 2. Large hollow circle outline cropped */}
      <div className="absolute -left-20 top-1/4 w-72 h-72 rounded-full border-4 border-[#e84b2a]/10 select-none pointer-events-none" />

      {/* 3. Organic splash blob shape */}
      <div 
        className="absolute right-[-40px] top-1/3 w-64 h-64 bg-gradient-to-br from-[#e84b2a]/5 to-[#ff6b4a]/5 blur-lg pointer-events-none"
        style={{ borderRadius: '50% 50% 30% 70% / 50% 60% 40% 60%' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Testimonial details */}
        <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-xs font-bold text-[#e84b2a] tracking-[0.2em] uppercase">
            TESTIMONIALS
          </span>
          {/* Heading with Clash and keyword highlight */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0e0e18] tracking-tight leading-tight">
            What Say Our Developers, <br />
            About <span className="text-[#e84b2a]">Inzira Careers</span>
          </h2>

          <div className="relative min-h-[160px] w-full flex items-center justify-center lg:justify-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <p className="italic text-[#0e0e18] text-base leading-relaxed max-w-xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-extrabold text-[#0e0e18] text-sm">{current.name}</h4>
                  <p className="text-xs text-[#6b6b75] font-light">{current.role}</p>
                </div>
                
                {/* Yellow Stars */}
                <div className="flex items-center gap-1 text-[#EF9F27]">
                  {[...Array(current.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-3 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white pl-6 pr-2 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md shadow-[#e84b2a]/20 border-none outline-none"
            >
              <span>Next Review</span>
              <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#e84b2a]">
                <ArrowRight className="w-3.5 h-3.5 text-[#e84b2a] stroke-[3px]" />
              </span>
            </button>
            <Link href="/auth/register">
              <span className="text-xs font-bold text-[#0e0e18]/80 hover:underline cursor-pointer">
                Join our community
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side: Portrait Image with Blobs */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] lg:h-[400px]">
          <div className="relative">
            {/* Outline Circle Ornament */}
            <div className="absolute -left-6 -top-6 w-[280px] h-[280px] rounded-full border border-[#e84b2a]/10 z-0" />
            
            {/* Orange Blob */}
            <div 
              className="absolute -right-8 bottom-6 w-20 h-20 bg-gradient-to-br from-[#e84b2a] to-[#ff6b4a] opacity-80 blur-[1px] shadow-lg z-10"
              style={{ borderRadius: '40% 60% 70% 30% / 50%' }}
            />

            {/* Oval Portrait Frame */}
            <div className="w-[240px] h-[320px] rounded-[110px] border-4 border-[#0e0e18]/10 overflow-hidden shadow-2xl relative z-20">
              <img 
                src="/leader_portrait.png" 
                alt="Tech leader portrait" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Decorative Quote Mark */}
            <div className="absolute bottom-4 left-[-16px] w-12 h-12 rounded-full bg-[#e84b2a] text-white flex items-center justify-center font-serif text-3xl shadow-lg z-30 select-none pointer-events-none">
              &ldquo;
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider: Sweeping asymmetric S-curve curve transitioning Light -> Dark #0e0e18 */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full leading-[0] pointer-events-none z-10">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[80px] md:h-[120px] lg:h-[160px]" preserveAspectRatio="none">
          <path 
            d="M0,0 C100,0 180,140 280,140 L960,140 C1120,140 1280,0 1440,0 L1440,160 L0,160 Z" 
            fill="#0e0e18" 
          />
        </svg>
      </div>
    </section>
  );
}
