'use client';

import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    initials: 'JK',
    name: 'Jean Pierre K.',
    role: 'Full Stack Developer',
    quote: "Inzira's roadmap feature gave me a clear path to senior dev. I got promoted 3 months after following it.",
  },
  {
    initials: 'AN',
    name: 'Amara N.',
    role: 'Data Analyst',
    quote: "The mock interviews are scary good. The AI feedback felt like a real technical interview.",
  },
  {
    initials: 'DM',
    name: 'David M.',
    role: 'Backend Engineer',
    quote: "My resume ATS score went from 54 to 89 after following the recommendations. Got callbacks within a week.",
  },
];

export function Testimonials() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
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
    <section id="testimonials" className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl font-black text-[#1A1832] tracking-tight">
            What Developers Are Saying
          </h2>
        </div>

        {/* Grid of Testimonials */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white p-7 rounded-2xl border-l-4 border-[#3C3489] shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Decorative Quote Mark */}
              <span className="absolute -top-6 -right-2 text-[120px] text-[#3C3489]/10 font-serif leading-none select-none pointer-events-none z-0">
                &ldquo;
              </span>

              <p className="relative italic text-[#1A1832] text-sm leading-relaxed mb-8 z-10">
                &ldquo;{rev.quote}&rdquo;
              </p>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 border-t border-[#3C3489]/5 pt-4">
                  {/* Initials Avatar with Gradient */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#534AB7] to-[#3C3489] text-white flex items-center justify-center font-bold text-lg select-none shadow">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A1832] text-sm">{rev.name}</h4>
                    <p className="text-[10px] uppercase font-bold text-[#6B6A8A] tracking-wider mt-0.5">
                      {rev.role}
                    </p>
                  </div>
                </div>
                {/* 5 Yellow Stars below Avatar Row */}
                <div className="text-[#EF9F27] text-xs mt-2 ml-16 tracking-wider">
                  ★★★★★
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
