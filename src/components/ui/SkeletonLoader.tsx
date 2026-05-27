import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SkeletonLoader({ className, ...props }: SkeletonLoaderProps) {
  return (
    <div
      className={cn('bg-gray-200 animate-pulse rounded-xl', className)}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
      {/* Title skeleton line */}
      <SkeletonLoader className="h-4 w-2/5" />
      {/* Subtitle skeleton line */}
      <SkeletonLoader className="h-3 w-4/5" />
      {/* Content skeleton line */}
      <SkeletonLoader className="h-3 w-3/5" />
    </div>
  );
}
