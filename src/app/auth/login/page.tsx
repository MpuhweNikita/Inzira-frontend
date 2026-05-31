'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { loginUser } from '@/lib/api/auth.api';
import { useAuthStore } from '@/stores/auth.store';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      if (response.success && response.data) {
        login(response.data.user, response.data.accessToken);
        addToast('Welcome back to Inzira!', 'success');
        router.push('/dashboard');
      } else {
        addToast(response.message || 'Login failed', 'error');
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Invalid credentials. Please try again.';
      addToast(errMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F4F3FF]">
      {/* Left half - Branding info */}
      <div className="md:w-1/2 bg-[#0D0C1D] text-white p-10 md:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-[#3C3489] opacity-35 blur-[100px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2 z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-[#3C3489] flex-shrink-0" />
          <span className="font-extrabold text-xl tracking-tight text-white">Inzira</span>
        </Link>

        <div className="my-auto space-y-8 z-10 relative py-12 md:py-0">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Join 10,000+ developers
          </h2>
          <p className="text-sm text-[#6B6A8A] max-w-sm">
            Access advanced career intelligence tools and land your dream role.
          </p>

          <div className="space-y-4 pt-4">
            {[
              'AI Resume Analysis',
              'Personalized Roadmaps',
              'Mock Interviews'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#1D9E75]/20 flex items-center justify-center text-[#1D9E75]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-[#6B6A8A] z-10">
          &copy; 2024 Inzira. All rights reserved.
        </div>
      </div>

      {/* Right half - Login form */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 sm:p-12 md:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-[#1A1832]">Log In</h1>
            <p className="text-xs text-[#6B6A8A]">
              Enter your credentials to access your career dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              disabled={isLoading}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                error={errors.password?.message}
                disabled={isLoading}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-[38px] text-[#6B6A8A] hover:text-[#1A1832] transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full bg-[#3C3489] hover:bg-[#534AB7] text-white py-3 rounded-xl font-semibold shadow-md shadow-[#3C3489]/10"
              isLoading={isLoading}
            >
              Log In
            </Button>
          </form>

          <div className="text-center text-xs text-[#6B6A8A]">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[#3C3489] font-bold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
