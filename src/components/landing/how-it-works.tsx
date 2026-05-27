'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Map } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Upload Your Resume',
    description: 'Upload your document in PDF or DOCX format. We securely extract qualifications.',
  },
  {
    number: '2',
    icon: Cpu,
    title: 'AI Analyzes & Scores',
    description: 'Our system analyzes ATS compatibility and checks gaps against target roles.',
  },
  {
    number: '3',
    icon: Map,
    title: 'Get Your Roadmap',
    description: 'Follow customized roadmap checkpoints and practice mock interviews.',
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#F4F3FF] text-[#1A1832] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-bold text-[#534AB7] tracking-[0.2em] uppercase">
            HOW IT WORKS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1A1832] tracking-tight">
            From Resume to Dream Role in 3 Steps
          </h2>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          {/* Connecting line (Desktop) */}
          <div 
            className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] pointer-events-none z-0" 
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, #3C3489 0, #3C3489 8px, transparent 8px, transparent 16px)'
            }}
          />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col items-center text-center relative z-10 group"
              >
                {/* Number Circle Badge & Icon Container */}
                <div 
                  className="w-24 h-24 rounded-full border-2 border-[#3C3489]/30 flex items-center justify-center relative bg-white transition-all duration-300 hover:shadow-[0_0_0_8px_rgba(60,52,137,0.15)] mb-8 cursor-pointer"
                >
                  <div className="w-[72px] h-[72px] bg-gradient-to-br from-[#3C3489] to-[#534AB7] rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Step Number Badge */}
                  <span className="absolute top-0 right-0 bg-[#D85A30] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#1A1832] mb-3">{step.title}</h3>
                <p className="text-sm text-[#6B6A8A] leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
