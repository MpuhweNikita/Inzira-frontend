'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex border-b border-text-secondary/10 gap-6 w-full overflow-x-auto scrollbar-none', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'pb-3 font-semibold text-sm transition-all relative outline-none select-none text-text-secondary border-b-2 border-transparent',
              {
                'text-primary border-primary font-bold': isActive,
                'hover:text-text-primary': !isActive,
              }
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
