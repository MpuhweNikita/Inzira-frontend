'use client';

import React, { useEffect, useState } from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
  dark?: boolean;
  variant?: 'default' | 'landing';
}

export function ScoreRing({ score, size = 200, dark = false, variant = 'default' }: ScoreRingProps) {
  const radius = size * 0.38;
  const circumference = 2 * Math.PI * radius;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    
    let animationFrameId: number;
    
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplayed(Math.round(eased * score));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };
    
    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [score]);

  const strokeDashoffset = circumference - (displayed / 100) * circumference;
  const color = score >= 80 ? '#1D9E75' : score >= 60 ? '#EF9F27' : '#E24B4A';

  if (variant === 'landing') {
    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(83, 74, 183, 0.25)"
            strokeWidth={size * 0.08}
            fill="transparent"
          />
          {/* Animated value circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            style={{
              stroke: '#ffffff',
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.1s ease-out',
            }}
            strokeWidth={size * 0.08}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        
        {/* Centered labels */}
        <div className="absolute flex flex-col items-center justify-center text-center select-none pointer-events-none mt-1">
          <span className="font-black text-[#0f0e1f] text-4xl leading-none tracking-tight">
            {displayed}
          </span>
          <span className="uppercase tracking-widest font-extrabold mt-1 text-[#4b4870] text-[9px]">
            ATS Match
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={dark ? 'rgba(255, 255, 255, 0.08)' : '#F4F3FF'}
          strokeWidth={size * 0.08}
          fill="transparent"
        />
        {/* Animated value circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{
            stroke: dark ? 'url(#scoreGradient)' : color,
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.1s ease-out',
            filter: dark ? 'drop-shadow(0 0 12px rgba(127, 119, 221, 0.8))' : undefined,
          }}
          strokeWidth={size * 0.08}
          strokeLinecap="round"
          fill="transparent"
        />
        {dark && (
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#534AB7" />
              <stop offset="100%" stopColor="#7F77DD" />
            </linearGradient>
          </defs>
        )}
      </svg>
      
      {/* Centered labels */}
      <div className="absolute flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <div className="flex items-baseline">
          <span className={`font-black tracking-tight leading-none ${
            dark ? 'text-white text-4xl' : 'text-[#1A1832] text-3xl'
          }`}>
            {displayed}
          </span>
          <span className={`font-semibold ml-0.5 ${
            dark ? 'text-white/50 text-xl' : 'text-[#6B6A8A] text-xs'
          }`}>
            /100
          </span>
        </div>
        <span className={`uppercase tracking-widest font-bold mt-1 ${
          dark ? 'text-[#7F77DD] text-xs' : 'text-[#3C3489] text-[9px]'
        }`}>
          ATS Score
        </span>
      </div>
    </div>
  );
}
