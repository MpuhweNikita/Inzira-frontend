'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Map, Mic, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: FileText,
    category: 'Analysis',
    title: 'Resume ATS Analyzer',
    description: 'Instantly score your resume against parsing algorithms. Check formatting issues and matches.',
    image: '/team_working.png',
  },
  {
    icon: Target,
    category: 'Optimization',
    title: 'Skill Gap Detector',
    description: 'Compare your resume against any target role to identify missing libraries, languages, and methodologies.',
    image: '/career_growth.png',
  },
  {
    icon: Map,
    category: 'Planning',
    title: 'Career Roadmap Generator',
    description: 'Get custom transition roadmaps with estimated step times, course links, and certificates.',
    image: '/team_meeting.png',
  },
  {
    icon: Mic,
    category: 'Simulation',
    title: 'Mock Interview Engine',
    description: 'Interactive audio/text practice sessions tailored to your focus topics with constructive grading.',
    image: '/team_working.png',
  },
  {
    icon: TrendingUp,
    category: 'Tracking',
    title: 'Progress Tracker',
    description: 'Track roadmap completion and monitor your match score growth on interactive dashboards.',
    image: '/career_growth.png',
  },
  {
    icon: Sparkles,
    category: 'AI Guidance',
    title: 'AI Recommendations',
    description: 'Obtain granular upskilling recommendations (projects, repositories, guides) dynamically.',
    image: '/team_meeting.png',
  },
];

export function FeaturesGrid() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
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
    <section id="features" className="py-24 pb-36 bg-[#0e0e18] text-white relative overflow-hidden">
      {/* Decorative Ornaments (Consistent across all sections) */}
      {/* ✕ Marks Stack */}
      <div className="absolute left-8 top-[15%] flex flex-col gap-2 opacity-25 text-[#e84b2a] text-sm font-bold font-mono select-none pointer-events-none">
        <span>✕</span>
        <span>✕</span>
        <span>✕</span>
      </div>

      {/* Triangles Cluster */}
      <div className="absolute right-8 top-[15%] flex flex-col gap-2 opacity-25 text-[#e84b2a] text-xs font-bold select-none pointer-events-none">
        <span>▲</span>
        <span>▲</span>
        <span>▲</span>
      </div>

      {/* Dot Grid */}
      <div className="absolute bottom-20 left-12 w-14 h-14 bg-[radial-gradient(#e84b2a_2px,transparent_2px)] [background-size:10px_10px] opacity-20 select-none pointer-events-none" />

      {/* Large hollow circle outline cropped */}
      <div className="absolute -right-20 top-[40%] w-72 h-72 rounded-full border-4 border-[#e84b2a]/10 select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold text-[#e84b2a] tracking-[0.2em] uppercase">
              OUR FEATURES
            </span>
            {/* Heading with Syne Display and highlighted keywords */}
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              We Serve the Best Tools <br />
              View <span className="text-[#e84b2a]">AI Features</span>
            </h2>
          </div>
          <div>
            <Link href="/auth/register">
              <span className="inline-flex items-center gap-3 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white pl-6 pr-2 py-2.5 rounded-full font-semibold transition-all duration-200 cursor-pointer text-sm shadow-md shadow-[#e84b2a]/20">
                <span>View All Tools</span>
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#0e0e18]">
                  <ArrowRight className="w-3.5 h-3.5 text-[#e84b2a] stroke-[3px]" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feat, idx) => {
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[#13103a]/40 rounded-2xl border border-white/10 hover:border-[#e84b2a]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,75,42,0.15)] flex flex-col justify-between overflow-hidden cursor-pointer h-full"
              >
                <div>
                  {/* Card Image Top */}
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={feat.image} 
                      alt={feat.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0e0e18]/20 group-hover:bg-[#0e0e18]/0 transition-colors" />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 space-y-2">
                    <span className="text-[#e84b2a] text-xs font-bold tracking-wider uppercase block">
                      {feat.category}
                    </span>
                    <h3 className="font-extrabold text-lg text-white font-syne">{feat.title}</h3>
                    <p className="text-xs text-white/50 leading-relaxed font-light">{feat.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link href="/auth/register" className="inline-flex items-center gap-1 text-[#e84b2a] hover:text-[#e84b2a]/95 text-xs font-medium">
                    <span>Learn more</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dot Pagination below Case Studies */}
        <div className="flex justify-center gap-2.5 mt-12 z-20 relative">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e84b2a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Bottom Wave Divider: Sweeping asymmetric S-curve curve transitioning Dark -> Light #f5f5f5 */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full leading-[0] pointer-events-none z-10">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[80px] md:h-[120px] lg:h-[160px]" preserveAspectRatio="none">
          <path 
            d="M0,0 C100,0 180,140 280,140 L960,140 C1120,140 1280,0 1440,0 L1440,160 L0,160 Z" 
            fill="#f5f5f5" 
          />
        </svg>
      </div>
    </section>
  );
}
