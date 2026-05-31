'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Map, Mic, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Upload Resume',
    description: 'Provide your PDF or DOCX resume. We safely extract and evaluate details.',
  },
  {
    number: '2',
    icon: Cpu,
    title: 'AI ATS Scoring',
    description: 'Score credentials against top ATS matching algorithms in real-time.',
  },
  {
    number: '3',
    icon: Map,
    title: 'Custom Roadmap',
    description: 'Obtain step-by-step career path roadmaps with courses and timeline estimates.',
  },
  {
    number: '4',
    icon: Mic,
    title: 'Mock Practice',
    description: 'Rehearse mock interviews tailored to your stack with constructive feedback.',
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="how-it-works" className="pt-6 pb-24 bg-[#f5f5f5] text-[#0e0e18] relative overflow-hidden">
      {/* Decorative Ornaments (Consistent across all sections) */}
      {/* 1. Dot Grid Pattern in corner */}
      <div className="absolute top-12 left-12 w-16 h-16 bg-[radial-gradient(#e84b2a_2px,transparent_2px)] [background-size:10px_10px] opacity-20 select-none pointer-events-none" />

      {/* 2. Large hollow circle outline cropped */}
      <div className="absolute -right-20 top-1/4 w-72 h-72 rounded-full border-4 border-[#e84b2a]/10 select-none pointer-events-none" />

      {/* 3. Organic splash blob shape */}
      <div 
        className="absolute left-[-40px] top-1/3 w-64 h-64 bg-gradient-to-br from-[#e84b2a]/5 to-[#ff6b4a]/5 blur-lg pointer-events-none"
        style={{ borderRadius: '50% 50% 30% 70% / 50% 60% 40% 60%' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: 2x2 Grid of Cards with Crosshair */}
        <div className="lg:col-span-7 relative">
          
          {/* Intersecting large + crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[1.5px] h-full bg-[#e84b2a]/15" />
            <div className="h-[1.5px] w-full bg-[#e84b2a]/15 absolute" />
            <div className="w-10 h-10 rounded-full bg-[#f5f5f5] border-2 border-[#e84b2a]/30 flex items-center justify-center absolute text-[#e84b2a] font-bold text-xl select-none shadow-sm">
              +
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 relative z-10"
          >
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-[#e84b2a]/5 flex flex-col items-start hover:shadow-md transition-shadow duration-300 relative overflow-hidden h-full"
                >
                  {/* Number Badge */}
                  <div className="w-8 h-8 rounded-full bg-[#0e0e18] text-white flex items-center justify-center font-bold text-xs mb-4">
                    {step.number}
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-[#e84b2a]/5 rounded-lg text-[#e84b2a]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#0e0e18]">{step.title}</h3>
                  </div>
                  
                  <p className="text-xs text-[#6b6b75] leading-relaxed font-light">{step.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Side: Descriptive Title and CTA */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-xs font-bold text-[#e84b2a] tracking-[0.2em] uppercase">
            HOW IT WORKS
          </span>
          {/* Heading with Clash and keyword highlight */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0e0e18] tracking-tight leading-[1.15]">
            The Fastest Way To Achieve <span className="text-[#e84b2a]">Career Upskilling</span>
          </h2>
          <p className="text-sm font-light text-[#6b6b75] leading-relaxed">
            Accelerate your career transitions with AI-powered resume analysis, custom course recommendations, progress trackers, and real-time audio mock interviews.
          </p>
          <div className="pt-2">
            <Link href="/auth/register">
              <span className="inline-flex items-center gap-3 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white pl-6 pr-2 py-2 rounded-full font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md shadow-[#e84b2a]/20">
                <span>Get Started Free</span>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0e0e18]">
                  <ArrowRight className="w-3.5 h-3.5 text-[#e84b2a] stroke-[3px]" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Partner Logos Bar
      <div className="max-w-7xl mx-auto px-6 mt-24 border-t border-[#0e0e18]/5 pt-12 text-center relative z-20">
        <p className="text-xs uppercase tracking-widest text-[#6b6b75] mb-8 font-semibold">
          Empowering developers at top global engineering teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale font-clash select-none">
          <span className="font-extrabold text-xl tracking-tight text-[#0e0e18]">GOOGLE</span>
          <span className="font-extrabold text-xl tracking-tight text-[#0e0e18]">META</span>
          <span className="font-extrabold text-xl tracking-tight text-[#0e0e18]">AMAZON</span>
          <span className="font-extrabold text-xl tracking-tight text-[#0e0e18]">NETFLIX</span>
          <span className="font-extrabold text-xl tracking-tight text-[#0e0e18]">STRIPE</span>
        </div>
      </div> */}

      {/* Bottom Wave Divider: Sweeping asymmetric S-curve curve transitioning Light -> Dark #0e0e18 */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full leading-[0] pointer-events-none z-10">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[40px] md:h-[60px] lg:h-[80px]" preserveAspectRatio="none">
          <path 
            d="M0,140 C150,140 280,80 432,80 L1080,80 C1180,80 1320,40 1440,40 L1440,160 L0,160 Z" 
            fill="#0e0e18" 
          />
        </svg>
      </div>
    </section>
  );
}
