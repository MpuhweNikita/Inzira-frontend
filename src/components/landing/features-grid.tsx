'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Target, Map, Mic, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: FileText,
    title: 'Resume ATS Analyzer',
    description: 'Instantly score your resume against parsing algorithms. Check formatting issues and matches.',
  },
  {
    icon: Target,
    title: 'Skill Gap Detector',
    description: 'Compare your resume against any target role to identify missing libraries, languages, and methodologies.',
  },
  {
    icon: Map,
    title: 'Career Roadmap Generator',
    description: 'Get custom transition roadmaps with estimated step times, course links, and certificates.',
  },
  {
    icon: Mic,
    title: 'Mock Interview Engine',
    description: 'Interactive audio/text practice sessions tailored to your focus topics with constructive grading.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracker',
    description: 'Track roadmap completion and monitor your match score growth on interactive dashboards.',
  },
  {
    icon: Sparkles,
    title: 'AI Recommendations',
    description: 'Obtain granular upskilling recommendations (projects, repositories, guides) dynamically.',
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
    <section id="features" className="py-24 bg-[#0D0C1D] text-white relative">
      {/* Subtle glow top-right */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-[#3C3489] opacity-15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-white">
            Everything You Need to Succeed
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ 
                  y: -6,
                }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gradient-to-br from-[#13103A] to-[#0D0C1D] hover:from-[#1A1659] hover:to-[#0F0C2A] rounded-2xl p-7 border border-[#3C3489]/20 hover:border-[#534AB7]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(83,74,183,0.15)] flex flex-col items-start justify-between overflow-hidden cursor-pointer"
              >
                {/* Left accent fade gradient line */}
                <div className="absolute left-0 top-[30%] w-[3px] h-[40%] bg-gradient-to-b from-[#534AB7] to-transparent" />

                <div className="w-full flex flex-col items-start gap-4">
                  {/* Icon container */}
                  <div className="w-12 h-12 rounded-xl bg-[#3C3489]/20 flex items-center justify-center text-[#7F77DD]">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-white">{feat.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{feat.description}</p>
                  </div>
                </div>

                <Link href="/auth/register" className="inline-flex items-center gap-1 text-[#D85A30] hover:text-[#D85A30]/90 text-sm font-medium mt-6 pt-2">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
