import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'coral';
}

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold select-none border',
        {
          'bg-primary/5 text-primary border-primary/20': variant === 'primary',
          'bg-success/5 text-success border-success/20': variant === 'success',
          'bg-warning/5 text-warning border-warning/20': variant === 'warning',
          'bg-error/5 text-error border-error/20': variant === 'error',
          'bg-bg-light text-text-secondary border-text-secondary/15': variant === 'info',
          'bg-coral/5 text-coral border-coral/20': variant === 'coral',
        },
        className
      )}
      {...props}
    />
  );
}
