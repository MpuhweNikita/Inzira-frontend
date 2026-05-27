import React from 'react';
import Link from 'next/link';

// Custom brand SVGs matching Lucide layout styling
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#07060F] border-t border-white/5 py-16 text-[#6B6A8A] text-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand column */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#534AB7] to-[#D85A30] flex-shrink-0" />
            <span className="font-extrabold text-lg text-white tracking-tight">
              Inzira
            </span>
          </div>
          <p className="text-xs leading-relaxed max-w-xs text-[#6B6A8A]">
            Your intelligent career path advisor. Build resumes, identify key gaps, map learning paths, and prepare for interviews.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-white transition-colors text-white/60">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors text-white/60">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors text-white/60">
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Link Columns */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Product</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition-colors">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider">Legal</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between text-xs">
        <p>&copy; 2024 Inzira. All rights reserved.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
