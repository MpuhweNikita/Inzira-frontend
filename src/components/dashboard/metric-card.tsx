'use client';

import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
}

export function MetricCard({ title, value, icon: Icon, subtext }: MetricCardProps) {
  // Extract number from value to run the count-up animation
  const numMatch = typeof value === 'string' ? value.match(/\d+/) : null;
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : typeof value === 'number' ? value : null;
  
  const [displayedValue, setDisplayedValue] = useState<string | number>(value);

  useEffect(() => {
    if (targetNum === null || isNaN(targetNum)) {
      setDisplayedValue(value);
      return;
    }
    
    let animationFrameId: number;
    const duration = 1200; // 1.2s count up
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * targetNum);
      
      if (typeof value === 'string') {
        setDisplayedValue(value.replace(/\d+/, String(current)));
      } else {
        setDisplayedValue(current);
      }
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, targetNum]);

  // Color configuration based on metric title
  let colorStyles = {
    bg: 'bg-[#3C3489]/10',
    text: 'text-[#3C3489]',
    trend: 'text-[#1D9E75] bg-[#1D9E75]/10',
    trendText: '↑ 8% from last month'
  };

  const titleLower = title.toLowerCase();
  if (titleLower.includes('score') || titleLower.includes('ats')) {
    colorStyles = { 
      bg: 'bg-[#3C3489]/10', 
      text: 'text-[#534AB7]',
      trend: 'text-[#1D9E75] bg-[#1D9E75]/10',
      trendText: '↑ 12% from last month'
    };
  } else if (titleLower.includes('progress') || titleLower.includes('roadmap')) {
    colorStyles = { 
      bg: 'bg-[#D85A30]/10', 
      text: 'text-[#D85A30]',
      trend: 'text-[#1D9E75] bg-[#1D9E75]/10',
      trendText: '↑ 5% this week'
    };
  } else if (titleLower.includes('interview') || titleLower.includes('total')) {
    colorStyles = { 
      bg: 'bg-[#1D9E75]/10', 
      text: 'text-[#1D9E75]',
      trend: 'text-[#1D9E75] bg-[#1D9E75]/10',
      trendText: '↑ 2 new sessions'
    };
  } else if (titleLower.includes('skill') || titleLower.includes('gap')) {
    colorStyles = { 
      bg: 'bg-[#EF9F27]/10', 
      text: 'text-[#EF9F27]',
      trend: 'text-[#1D9E75] bg-[#1D9E75]/10',
      trendText: '↓ 4 gaps closed'
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
    >
      <div className="space-y-4">
        {/* Top: Icon in colored container */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorStyles.bg} ${colorStyles.text}`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Middle: Number and label */}
        <div>
          <h3 className="text-4xl font-black text-[#1A1832] tracking-tight">{displayedValue}</h3>
          <p className="text-sm text-[#6B6A8A] font-medium mt-1">{title}</p>
        </div>
      </div>

      {/* Bottom: Trend indicator and subtext */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-100 mt-4 text-xs">
        <span className="text-[#6B6A8A] font-medium truncate max-w-[130px]">
          {subtext || 'No updates'}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${colorStyles.trend}`}>
          {colorStyles.trendText}
        </span>
      </div>
    </motion.div>
  );
}
