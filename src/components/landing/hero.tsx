'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
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
      className="relative flex items-center justify-center pt-28 pb-16 overflow-hidden text-white w-full"
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
      <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-25 text-[#e84b2a] text-sm font-bold font-mono select-none pointer-events-none">
        <span>✕</span>
        <span>✕</span>
        <span>✕</span>
      </div>

      {/* 5. Triangle arrow clusters (▲▲▲) on the right side */}
      <div className="absolute right-8 top-[25%] flex flex-col gap-2 opacity-25 text-[#e84b2a] text-xs font-bold select-none pointer-events-none">
        <span>▲</span>
        <span>▲</span>
        <span>▲</span>
      </div>

      {/* 6. Thin horizontal orange line accent near bottom-right */}
      <div className="absolute right-12 bottom-12 w-28 h-0.5 bg-[#e84b2a] opacity-35 select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        {/* Left column (60%) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
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

        {/* Right column (40%) - Curved oval mockup layout */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[450px] lg:h-[480px]">
          {/* Double Oval Frames with White Borders */}
          <div className="relative w-full max-w-[360px] h-[340px] flex items-center justify-start">
            
            {/* Oval 1 - Vertical layout */}
            <div className="w-[170px] h-[250px] rounded-[90px] border-4 border-white/20 overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/team_working.png" 
                alt="Team working illustration" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Oval 2 - Slightly tilted/offset layout */}
            <div className="w-[150px] h-[230px] rounded-[80px] border-4 border-white/20 overflow-hidden shadow-2xl absolute left-36 top-12 rotate-6 z-0">
              <img 
                src="/career_growth.png" 
                alt="Career path growth illustration" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>

            {/* Abstract Organic Paint Splash Blob */}
            <div 
              className="absolute bottom-4 left-[140px] w-14 h-12 bg-gradient-to-br from-[#e84b2a] to-[#ff6b4a] opacity-90 blur-[1px] shadow-lg z-20"
              style={{ borderRadius: '35% 65% 60% 40% / 50% 50% 50% 50%' }}
            />

            {/* Dotted Grid Overlay */}
            <div className="absolute -right-4 top-8 w-20 h-20 bg-[radial-gradient(circle,_#e84b2a_1.5px,_transparent_1.5px)] [background-size:10px_10px] opacity-25 z-0" />
            
            {/* Circle Outline Accent */}
            <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full border border-white/10 z-0" />
          </div>

          {/* Floating ATS Score card overlay */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-0 left-4 z-30 w-full max-w-[250px]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="bg-gradient-to-b from-[#1A1259]/90 to-[#0e0e18]/90 border border-[#e84b2a]/20 backdrop-blur-[20px] rounded-[24px] p-5 shadow-[0_0_60px_rgba(232,75,42,0.15),0_25px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center"
            >
              <ScoreRing score={87} size={110} dark={true} />
              
              <div className="mt-4 space-y-2 w-full">
                {[
                  "Strong keywords",
                  "Good formatting"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                    <div className="w-4 h-4 rounded-full bg-[#1D9E75]/20 flex items-center justify-center text-[#1D9E75]">
                      <CheckCircle className="w-3 h-3" />
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
