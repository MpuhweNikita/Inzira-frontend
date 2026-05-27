'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Settings, Save } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';
import { motion } from 'framer-motion';

const settingsSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional().refine((val) => !val || val.length >= 8, {
    message: 'New password must be at least 8 characters long',
  }),
  confirmNewPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
    return false;
  }
  return true;
}, {
  message: 'Passwords must match',
  path: ['confirmNewPassword'],
});

type SettingsSchemaType = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { user, setUser } = useAuth();
  const { addToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
  });

  // Pre-populate user details
  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: SettingsSchemaType) => {
    setIsSaving(true);
    try {
      // Simulate profile update API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (user) {
        const updatedUser = {
          ...user,
          firstName: data.firstName,
          lastName: data.lastName,
        };
        setUser(updatedUser);
      }

      addToast('Profile updated!', 'success');
    } catch (err) {
      addToast('Could not update profile details.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 animate-fadeIn"
    >
      <PageHeader
        title="Settings"
        subtitle="Manage your profile settings and secure your credentials."
      />

      <div className="max-w-2xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 border-b border-[#3C3489]/5">
            <div className="p-2.5 bg-[#3C3489]/5 rounded-xl text-[#3C3489]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <CardTitle>Profile Configuration</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  placeholder="John"
                  error={errors.firstName?.message}
                  disabled={isSaving}
                  {...register('firstName')}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  error={errors.lastName?.message}
                  disabled={isSaving}
                  {...register('lastName')}
                />
              </div>

              <Input
                label="Email Address"
                readOnly
                placeholder="you@example.com"
                className="bg-gray-50 border-gray-200 cursor-not-allowed text-gray-500"
                error={errors.email?.message}
                {...register('email')}
              />

              <div className="border-t border-[#3C3489]/5 pt-6 space-y-4">
                <h4 className="font-bold text-sm text-[#1A1832]">Change Password</h4>
                
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.currentPassword?.message}
                  disabled={isSaving}
                  {...register('currentPassword')}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.newPassword?.message}
                    disabled={isSaving}
                    {...register('newPassword')}
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    placeholder="••••••••"
                    error={errors.confirmNewPassword?.message}
                    disabled={isSaving}
                    {...register('confirmNewPassword')}
                  />
                </div>
              </div>

              <div className="border-t border-[#3C3489]/5 pt-6 flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#3C3489] hover:bg-[#534AB7] text-white font-bold inline-flex items-center gap-2"
                  isLoading={isSaving}
                >
                  <Save className="w-4 h-4" /> Save Settings
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
