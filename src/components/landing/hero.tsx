'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { ScoreRing } from '../ui/ScoreRing';

export function Hero() {
  const headlineText = "Accelerate Your Career with AI-Powered Guidance";
  const words = headlineText.split(" ");

  // Framer Motion variants for stagger words animation with blur
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden text-white w-full"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(83, 74, 183, 0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(60, 52, 137, 0.2) 0%, transparent 50%), #0D0C1D'
      }}
    >
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-[-100px] w-[400px] h-[400px] rounded-full bg-[#3C3489] opacity-[0.12] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-50px] w-[300px] h-[300px] rounded-full bg-[#D85A30] opacity-[0.08] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left column (60%) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Indigo border badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#3C3489] bg-[#3C3489]/10 text-xs font-semibold tracking-wider text-[#7F77DD] uppercase">
            AI-Powered Career Platform
          </div>

          {/* Headline Word Stagger */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white max-w-2xl"
          >
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <p className="text-base sm:text-lg text-[#6B6A8A] leading-relaxed max-w-lg">
            Upload your resume, discover skill gaps, get a personalized roadmap, and ace your next interview — all powered by AI.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
            <Link href="/auth/register">
              <motion.span
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(216,90,48,0.6)' }}
                whileTap={{ scale: 0.97 }}
                style={{ boxShadow: '0 8px 32px rgba(216,90,48,0.4)' }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D85A30] to-[#C94E26] px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-200 cursor-pointer"
              >
                Analyze My Resume <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
            <a href="#how-it-works">
              <motion.span 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center text-white hover:text-white/80 font-bold group px-6 py-4 rounded-2xl cursor-pointer text-lg"
              >
                <Play className="w-5 h-5 text-[#D85A30] fill-[#D85A30] group-hover:scale-110 transition-transform mr-2" />
                Watch Demo
              </motion.span>
            </a>
          </div>
        </div>

        {/* Right column (40%) */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] lg:h-[400px]">
          {/* Card Mockup with fade-in and float animation */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-[320px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="bg-gradient-to-b from-[#1A1259]/80 to-[#0D0C1D]/80 border border-[#3C3489]/40 backdrop-blur-[20px] rounded-[24px] p-8 shadow-[0_0_60px_rgba(60,52,137,0.3),0_25px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center"
            >
              <ScoreRing score={87} size={150} dark={true} />
              
              <div className="mt-6 space-y-3 w-full">
                {[
                  "Strong keywords",
                  "Good formatting",
                  "Relevant experience"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="w-5 h-5 rounded-full bg-[#1D9E75]/20 flex items-center justify-center text-[#1D9E75]">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
