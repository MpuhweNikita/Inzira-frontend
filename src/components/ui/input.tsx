import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label ? (
          <label className="text-sm font-semibold text-text-primary">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          type={type}
          className={cn(
            'px-4 py-2.5 rounded-xl border border-text-secondary/20 bg-white text-text-primary text-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary-accent/20 outline-none placeholder:text-text-secondary/40 disabled:opacity-50 disabled:bg-bg-light',
            {
              'border-error focus:border-error focus:ring-error/20': error,
            },
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-error font-medium">{error}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
