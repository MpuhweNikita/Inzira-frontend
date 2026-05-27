'use client';

import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Stats } from '@/components/landing/stats';
import { HowItWorks } from '@/components/landing/how-it-works';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { Testimonials } from '@/components/landing/testimonials';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -15 }} 
      transition={{ duration: 0.3 }}
      className="bg-[#F4F3FF] min-h-screen flex flex-col overflow-x-hidden selection:bg-[#7F77DD] selection:text-white"
    >
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Stats Bar */}
      <Stats />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Features Grid */}
      <FeaturesGrid />

      {/* 6. Testimonials */}
      <Testimonials />

      {/* 7. CTA Banner */}
      <section 
        className="text-white py-24 relative overflow-hidden text-center"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(83, 74, 183, 0.2) 0%, transparent 70%), #0D0C1D'
        }}
      >
        {/* CSS grid dot pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7F77DD] to-[#D85A30]">Stand Out</span>?
          </h2>
          <p className="text-base text-[#6B6A8A] max-w-lg mx-auto leading-relaxed">
            Join thousands of developers who used Inzira to land their dream roles.
          </p>
          <div className="pt-2">
            <Link href="/auth/register">
              <motion.span
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(216,90,48,0.6)' }}
                whileTap={{ scale: 0.97 }}
                style={{ boxShadow: '0 8px 32px rgba(216,90,48,0.4)' }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D85A30] to-[#C94E26] px-10 py-4 rounded-2xl font-bold text-white text-lg transition-all duration-200 cursor-pointer"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <Footer />
    </motion.div>
  );
}
