'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd'
> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition-all outline-none focus:ring-2 focus:ring-primary-accent/40 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Variants
            'bg-primary text-white hover:bg-primary-light': variant === 'primary',
            'bg-bg-light text-text-primary border border-text-secondary/10 hover:bg-text-secondary/5': variant === 'secondary',
            'bg-primary-accent text-white hover:bg-primary-light': variant === 'accent',
            'border-2 border-primary text-primary hover:bg-primary/5': variant === 'outline',
            'text-primary hover:bg-primary/5': variant === 'ghost',
            'bg-coral text-white hover:bg-coral/90 shadow-md shadow-coral/20': variant === 'coral',
            // Sizes
            'px-3 py-1.5 text-xs': size === 'sm',
            'px-5 py-2.5 text-sm': size === 'md',
            'px-7 py-3.5 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2.5 h-4.5 w-4.5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
