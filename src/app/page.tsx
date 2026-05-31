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
    <div 
      className="bg-[#f5f5f5] min-h-screen flex flex-col overflow-x-hidden selection:bg-[#e84b2a] selection:text-white"
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
        className="text-white py-24 relative overflow-hidden bg-[#0e0e18]"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(232, 75, 42, 0.1) 0%, transparent 70%), #0e0e18'
        }}
      >
        {/* Decorative Ornaments (Consistent across all sections) */}
        {/* 1. Dot Grid Pattern */}
        <div className="absolute top-12 left-12 w-16 h-16 bg-[radial-gradient(#e84b2a_2.5px,transparent_2.5px)] [background-size:12px_12px] opacity-25 select-none pointer-events-none" />

        {/* 2. Hollow Circle cropped */}
        <div className="absolute -left-24 bottom-12 w-80 h-80 rounded-full border-4 border-[#e84b2a]/10 select-none pointer-events-none" />

        {/* 3. ✕ Marks Stack */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-25 text-[#e84b2a] text-sm font-bold font-mono select-none pointer-events-none">
          <span>✕</span>
          <span>✕</span>
          <span>✕</span>
        </div>

        {/* 4. Triangles Cluster */}
        <div className="absolute right-8 top-[20%] flex flex-col gap-2 opacity-25 text-[#e84b2a] text-xs font-bold select-none pointer-events-none">
          <span>▲</span>
          <span>▲</span>
          <span>▲</span>
        </div>

        {/* 5. Thin Horizontal Line */}
        <div className="absolute right-12 bottom-12 w-28 h-0.5 bg-[#e84b2a] opacity-35 select-none pointer-events-none" />

        {/* 6. Organic Blob Shape */}
        <div 
          className="absolute right-[-40px] top-[10%] w-64 h-64 bg-gradient-to-br from-[#e84b2a]/10 to-transparent blur-xl pointer-events-none"
          style={{ borderRadius: '60% 40% 30% 70% / 60%' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          {/* Left Side: Copywriting, stats progress bars and CTA */}
          <div className="lg:col-span-7 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-xs font-bold text-[#e84b2a] tracking-[0.2em] uppercase">
              JOIN THE PLATFORM
            </span>
            {/* Heading with Clash Display and highlighted keywords */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Ready to <span className="text-[#e84b2a]">Stand Out</span> <br />
              in the Developer Market?
            </h2>
            <p className="text-sm font-light text-white/50 leading-relaxed max-w-lg">
              Join thousands of developers using Inzira to optimize their credentials, bridge their skill gaps, and practice mock technical challenges.
            </p>

            {/* Platform metrics progress bars with solid orange-red fill */}
            <div className="w-full max-w-md space-y-4 pt-2 pb-4 text-left">
              {/* Bar 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-white/80">
                  <span>ATS Score Optimization</span>
                  <span>95%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e84b2a] rounded-full" style={{ width: '95%' }} />
                </div>
              </div>

              {/* Bar 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-white/80">
                  <span>Interview Success Rate</span>
                  <span>90%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e84b2a] rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              {/* Bar 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-white/80">
                  <span>Pathway Completion Rate</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#e84b2a] rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/auth/register">
                <motion.span
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(232,75,42,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{ boxShadow: '0 8px 32px rgba(232,75,42,0.3)' }}
                  className="inline-flex items-center gap-3 bg-[#e84b2a] hover:bg-[#e84b2a]/95 text-white pl-8 pr-2.5 py-3.5 rounded-full font-bold text-base transition-all duration-200 cursor-pointer shadow-lg shadow-[#e84b2a]/20"
                >
                  <span>Get Started Free</span>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0e0e18]">
                    <ArrowRight className="w-4 h-4 text-[#e84b2a] stroke-[3px]" />
                  </span>
                </motion.span>
              </Link>
            </div>
          </div>

          {/* Right Side: Team Illustration with Blobs */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[360px] lg:h-[400px]">
            <div className="relative">
              {/* White Outline circle */}
              <div className="absolute -right-6 -bottom-6 w-56 h-56 rounded-full border border-white/5 z-0" />
              
              {/* Orange Gradient blob ornament */}
              <div 
                className="absolute -left-10 top-12 w-20 h-20 bg-gradient-to-br from-[#e84b2a] to-[#ff6b4a] opacity-80 blur-[1px] shadow-lg z-10"
                style={{ borderRadius: '50% 50% 30% 70% / 50%' }}
              />

              {/* Dotted Grid Pattern overlay */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-[radial-gradient(circle,_#e84b2a_1.5px,_transparent_1.5px)] [background-size:12px_12px] opacity-25 z-0" />

              {/* Team Meeting Container */}
              <div className="w-[280px] h-[340px] rounded-[32px] border-4 border-white/10 overflow-hidden shadow-2xl relative z-20">
                <img 
                  src="/team_meeting.png" 
                  alt="Team meeting illustration" 
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}
