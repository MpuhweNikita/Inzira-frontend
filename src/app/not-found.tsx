'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F3FF] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md space-y-6"
      >
        {/* Big 404 text in indigo */}
        <h1 className="text-9xl font-black text-[#3C3489] tracking-tight">
          404
        </h1>
        
        <h2 className="text-3xl font-extrabold text-[#1A1832]">
          Page Not Found
        </h2>
        
        <p className="text-sm text-[#6B6A8A] leading-relaxed max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className="pt-4">
          <Link href="/">
            <Button className="bg-[#D85A30] hover:bg-[#D85A30]/90 text-white font-bold px-8 py-3 rounded-xl inline-flex items-center gap-2">
              ← Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
