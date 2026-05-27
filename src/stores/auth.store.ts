'use client';

import { create } from 'zustand';
import { User } from '@/types';
import { getProfile } from '@/lib/api/auth.api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  loadFromStorage: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user: User) => set({ user }),
  login: (user: User, token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('inzira_token', token);
      document.cookie = `inzira_token=${token}; path=/; max-age=86400; SameSite=Lax; Secure`;
    }
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('inzira_token');
      document.cookie = 'inzira_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure';
      set({ user: null, token: null, isAuthenticated: false });
      window.location.href = '/auth/login';
    } else {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
  loadFromStorage: async () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('inzira_token');
      if (token) {
        set({ token, isAuthenticated: true });
        try {
          const response = await getProfile();
          if (response.success && response.data) {
            set({ user: response.data });
          }
        } catch (err) {
          console.error('Failed to populate profile from stored token', err);
          get().logout();
        }
      }
    }
  },
}));
