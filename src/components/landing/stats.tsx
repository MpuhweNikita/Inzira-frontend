'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Award, FileText, CheckCircle2, Cpu } from 'lucide-react';

interface StatItemProps {
  targetValue: number;
  suffix?: string;
  label: string;
  icon: React.ComponentType<any>;
}

function StatItem({ targetValue, suffix = '', label, icon: Icon }: StatItemProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const startTime = performance.now();
      let animationFrameId: number;

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setCount(Math.floor(eased * targetValue));
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(tick);
        }
      };

      animationFrameId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [isInView, targetValue]);

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center p-4 w-full relative z-20">
      <div className="text-[#e84b2a]/60 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-4xl font-extrabold text-white tracking-tight">
        {count.toLocaleString()}
        <span className="text-[#e84b2a] ml-0.5">{suffix}</span>
      </h3>
      <p className="text-xs text-white/50 uppercase tracking-wider mt-1.5 font-light">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  const statsData = [
    { targetValue: 1000, suffix: "+", label: "Resumes Analyzed", icon: FileText },
    { targetValue: 94, suffix: "%", label: "Interview Success", icon: CheckCircle2 },
    { targetValue: 500, suffix: "+", label: "Career Paths", icon: Award },
    { targetValue: 100, suffix: "%", label: "Real-Time AI", icon: Cpu },
  ];

  return (
    <section className="bg-[#0e0e18] pt-6 pb-20 relative z-10 border-t border-white/5">
      {/* Decorative Ornaments (Consistent across dark sections) */}
      {/* ✕ Marks Stack */}
      <div className="absolute left-8 top-12 flex flex-col gap-2 opacity-80 text-sm font-bold font-mono select-none pointer-events-none">
        <span className="text-white">✕</span>
        <span className="text-[#e84b2a]">✕</span>
        <span className="text-white">✕</span>
      </div>

      {/* Triangles Cluster */}
      <div className="absolute right-8 top-12 flex flex-col gap-2 opacity-25 text-[#e84b2a] text-xs font-bold select-none pointer-events-none">
        <span>▲</span>
        <span>▲</span>
        <span>▲</span>
      </div>

      {/* Dot Grid */}
      <div className="absolute bottom-16 left-12 w-12 h-12 bg-[radial-gradient(#e84b2a_2px,transparent_2px)] [background-size:12px_12px] opacity-20 select-none pointer-events-none" />

      {/* Thin Horizontal Line Accent */}
      <div className="absolute right-12 bottom-16 w-24 h-0.5 bg-[#e84b2a] opacity-35 select-none pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-6 relative z-20">
        {statsData.map((stat, idx) => (
          <React.Fragment key={idx}>
            <div className="w-[45%] md:w-full flex justify-center">
              <StatItem
                targetValue={stat.targetValue}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
            </div>
            {idx < statsData.length - 1 && (
              <div className="hidden md:block w-px h-12 bg-white/10 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom Wave Divider: Sweeping asymmetric S-curve curve transitioning Dark -> Light #f5f5f5 */}
      <div className="absolute left-0 right-0 bottom-0 overflow-hidden w-full leading-[0] pointer-events-none z-10">
        <svg viewBox="0 0 1440 160" className="relative block w-full h-[40px] md:h-[60px] lg:h-[80px]" preserveAspectRatio="none">
          <path 
            d="M0,140 C150,140 280,80 432,80 L1080,80 C1180,80 1320,40 1440,40 L1440,160 L0,160 Z" 
            fill="#f5f5f5" 
          />
        </svg>
      </div>
    </section>
  );
}
