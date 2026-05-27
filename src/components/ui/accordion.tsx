'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AccordionItemProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

export function AccordionItem({ title, className, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('border border-text-secondary/10 bg-white rounded-xl overflow-hidden', className)}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between p-4 font-bold text-text-primary text-sm hover:bg-bg-light/40 transition-colors text-left"
      >
        <span>{title}</span>
        <ChevronDown
          className={cn('w-4 h-4 text-text-secondary transition-transform duration-250', {
            'transform rotate-180': isOpen,
          })}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="p-4 pt-0 border-t border-text-secondary/5 text-sm text-text-secondary leading-relaxed bg-bg-light/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
