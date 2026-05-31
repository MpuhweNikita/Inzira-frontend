'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
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
      className="relative flex items-center justify-center pt-24 pb-10 overflow-hidden text-white w-full"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(232, 75, 42, 0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(60, 52, 137, 0.2) 0%, transparent 50%), #0e0e18'
      }}
    >
      {/* Decorative Ornaments from Reference Image */}
      {/* 1. Large irregular orange paint-splash blob */}
      <div 
        className="absolute left-[-60px] top-[15%] w-72 h-64 bg-gradient-to-br from-[#e84b2a]/15 to-[#ff6b4a]/5 blur-[20px] pointer-events-none select-none"
        style={{ borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%' }}
      />
      
      {/* 2. Small 6x6 orange dot-grid pattern in corner */}
      <div className="absolute top-8 left-8 w-16 h-16 bg-[radial-gradient(#e84b2a_2.5px,transparent_2.5px)] [background-size:12px_12px] opacity-30 select-none pointer-events-none" />

      {/* 3. Large hollow circle outline partially cropped at left viewport edge */}
      <div className="absolute -left-32 top-1/4 w-80 h-80 rounded-full border-[6px] border-[#e84b2a]/10 select-none pointer-events-none" />

      {/* 4. ✕ marks stacked vertically on left side */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-80 text-sm font-bold font-mono select-none pointer-events-none">
        <span className="text-white">✕</span>
        <span className="text-[#e84b2a]">✕</span>
        <span className="text-white">✕</span>
      </div>

      {/* 5. Triangle arrow clusters (▲▲▲) on the right side */}
      <div className="absolute right-8 top-[25%] flex flex-col gap-2 opacity-25 text-[#e84b2a] text-xs font-bold select-none pointer-events-none">
        <span>▲</span>
        <span>▲</span>
        <span>▲</span>
      </div>

      {/* 6. Thin horizontal orange line accent near bottom-right */}
      <div className="absolute right-12 bottom-12 w-28 h-0.5 bg-[#e84b2a] opacity-35 select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column: Welcoming words and CTA */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pl-20">
          {/* Indigo border badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#e84b2a]/30 bg-[#e84b2a]/5 text-xs font-bold tracking-wider text-[#e84b2a] uppercase">
            AI-Powered Career Platform
          </div>

          {/* Headline Word Stagger with Clash font and highlighted keywords */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] tracking-tight text-white max-w-2xl"
          >
            {words.map((word, idx) => {
              const cleanWord = word.replace(/[^a-zA-Z-]/g, '').toLowerCase();
              const isKeyword = cleanWord.includes('ai-powered') || cleanWord.includes('guidance');
              return (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className={`inline-block mr-3 ${isKeyword ? 'text-[#e84b2a]' : 'text-white'}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          <p className="text-sm font-light text-white/50 leading-relaxed max-w-lg">
            Upload your resume, discover skill gaps, get a personalized roadmap, and ace your next interview — all powered by AI.
          </p>

          {/* CTA Button Row using pill-shaped orange buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center pt-2">
            <Link href="/auth/register">
              <motion.span
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(232,75,42,0.5)' }}
                whileTap={{ scale: 0.97 }}
                style={{ boxShadow: '0 8px 32px rgba(232,75,42,0.3)' }}
                className="inline-flex items-center gap-4 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white pl-8 pr-2.5 py-3.5 rounded-full font-bold text-base transition-all duration-200 cursor-pointer shadow-lg shadow-[#e84b2a]/20"
              >
                <span>Analyze My Resume</span>
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0e0e18]">
                  <ArrowRight className="w-4 h-4 text-[#e84b2a] stroke-[3px]" />
                </span>
              </motion.span>
            </Link>
          </div>
        </div>

        {/* Right Column: Floating ATS Score card overlay */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-[280px]"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="bg-[#131129] border border-[#262445] rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center"
            >
              <div className="text-white/30 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                ATS Score
              </div>

              <ScoreRing score={87} size={120} dark={true} variant="landing" />
              
              <div className="mt-6 space-y-3 w-full text-left">
                {[
                  "Strong keywords",
                  "Good formatting",
                  "Relevant experience"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-white/80 font-medium">
                    <div className="w-4.5 h-4.5 rounded-full bg-[#0a231c] flex items-center justify-center text-[#10b981] flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3px]" />
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
