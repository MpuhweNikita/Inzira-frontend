import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function EmptyState({ icon: Icon, title, description, ctaText, onCtaClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-text-secondary/10 rounded-2xl text-center max-w-md mx-auto my-6">
      <div className="p-3 bg-primary/5 rounded-full mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-bold text-text-primary text-base mb-1.5">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-5">{description}</p>
      {ctaText && onCtaClick && (
        <Button size="sm" onClick={onCtaClick} variant="coral">
          {ctaText}
        </Button>
      )}
    </div>
  );
}
