'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    <div ref={containerRef} className="flex flex-col items-center text-center p-4 w-full">
      {/* Small indigo icon */}
      <div className="text-[#7F77DD] mb-3">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#7F77DD] to-[#534AB7] tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </h3>
      <p className="text-sm text-white/50 uppercase tracking-wider mt-1.5 font-medium">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  const statsData = [
    { targetValue: 10000, suffix: "+", label: "Resumes Analyzed", icon: FileText },
    { targetValue: 94, suffix: "%", label: "Interview Success", icon: CheckCircle2 },
    { targetValue: 500, suffix: "+", label: "Career Paths", icon: Award },
    { targetValue: 100, suffix: "%", label: "Real-Time AI", icon: Cpu },
  ];

  return (
    <section className="bg-gradient-to-r from-[#0D0C1D] via-[#120F2D] to-[#0D0C1D] py-10 relative z-10 border-y border-[#3C3489]/20">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
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
    </section>
  );
}
