'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Target,
  Map,
  Mic,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Resumes', path: '/dashboard/resumes', icon: FileText },
  { label: 'Skill Gap', path: '/dashboard/skill-gap', icon: Target },
  { label: 'Career Roadmap', path: '/dashboard/roadmap', icon: Map },
  { label: 'Mock Interviews', path: '/dashboard/interviews', icon: Mic },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
];

const MotionLink = motion.create ? motion.create(Link) : motion(Link);

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, initializeAuth } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const getInitials = () => {
    if (!user) return 'U';
    const first = user.firstName?.[0] || '';
    const last = user.lastName?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#07060F] border-b border-white/5 px-6 flex items-center justify-between z-30">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#534AB7] to-[#D85A30]" />
          <span className="font-black text-white text-base tracking-tight">Inzira</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-white hover:text-[#7F77DD] transition-colors p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex flex-col h-screen bg-[#07060F] text-white border-r border-white/5 fixed left-0 top-0 w-60 z-20"
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center gap-2 border-b border-white/5 h-16">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#534AB7] to-[#D85A30]" />
          <span className="font-black text-white text-xl tracking-tight">Inzira</span>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <MotionLink
                key={item.label}
                href={item.path}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C3489] to-[#534AB7] text-white shadow-lg shadow-[#3C3489]/30'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-white/40'}`} />
                <span>{item.label}</span>
              </MotionLink>
            );
          })}
        </nav>

        {/* Bottom Profile Details */}
        <div className="border-t border-white/10 pt-4 pb-6 mx-3 space-y-4">
          {user && (
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#534AB7] to-[#3C3489] flex items-center justify-center font-bold text-sm text-white select-none shadow">
                {getInitials()}
              </div>
              <div className="overflow-hidden flex-1">
                <h4 className="font-medium text-sm text-white truncate">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-xs text-white/40 truncate mt-0.5">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className="w-full text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg px-3 py-2 flex items-center gap-2 text-sm transition-all font-medium"
          >
            <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-40">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-[#0D0C1D]/60 backdrop-blur-sm"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-[#07060F] text-white p-6 flex flex-col justify-between border-r border-white/5 z-10"
            >
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#534AB7] to-[#D85A30]" />
                    <span className="font-black text-white text-lg tracking-tight">Inzira</span>
                  </div>
                  <button onClick={() => setIsMobileOpen(false)} className="text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Nav links */}
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;
                    return (
                      <MotionLink
                        key={item.label}
                        href={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium cursor-pointer transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-[#3C3489] to-[#534AB7] text-white shadow-lg shadow-[#3C3489]/30'
                            : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-white/40'}`} />
                        <span>{item.label}</span>
                      </MotionLink>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Profile Details */}
              <div className="border-t border-white/10 pt-4 space-y-4">
                {user && (
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#534AB7] to-[#3C3489] flex items-center justify-center font-bold text-sm text-white select-none shadow">
                      {getInitials()}
                    </div>
                    <div className="overflow-hidden flex-1">
                      <h4 className="font-medium text-sm text-white truncate">
                        {user.firstName} {user.lastName}
                      </h4>
                      <p className="text-xs text-white/40 truncate mt-0.5">{user.email}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    logout();
                  }}
                  className="w-full text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg px-3 py-2 flex items-center gap-2 text-sm transition-all font-medium"
                >
                  <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
