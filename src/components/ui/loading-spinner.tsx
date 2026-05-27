import React from 'react';
import { cn } from '@/utils/cn';

interface LoadingSpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ className, size = 'md' }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'animate-spin rounded-full border-t-2 border-primary border-r-transparent',
          {
            'w-4 h-4 border-2': size === 'sm',
            'w-8 h-8 border-2': size === 'md',
            'w-12 h-12 border-3': size === 'lg',
          },
          className
        )}
      />
    </div>
  );
}
