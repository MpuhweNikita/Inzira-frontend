'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, CheckCircle2, Flame, Check, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { MetricCard } from '@/components/dashboard/metric-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { Badge } from '@/components/ui/badge';
import { getProfile } from '@/lib/api/auth.api';
import { getMyRoadmaps } from '@/lib/api/roadmap.api';
import { getMySessions } from '@/lib/api/interview.api';
import { useAuth } from '@/hooks/useAuth';
import { Resume, CareerRoadmap, InterviewSession } from '@/types';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ScoreRing = dynamic(() => import('@/components/ui/ScoreRing').then(mod => mod.ScoreRing), {
  ssr: false,
});

export default function DashboardPage() {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [latestResume, setLatestResume] = useState<Resume | null>(null);
  const [latestRoadmap, setLatestRoadmap] = useState<CareerRoadmap | null>(null);
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch profile
        const profileRes = await getProfile();
        if (profileRes.success && profileRes.data) {
          setUser(profileRes.data);
          
          // Extrapolate resumes relation if nested
          const typedUser = profileRes.data as any;
          if (typedUser.resumes && typedUser.resumes.length > 0) {
            // Sort by latest
            const sortedResumes = [...typedUser.resumes].sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setLatestResume(sortedResumes[0]);
          }
        }

        // Fetch roadmaps
        const roadmapRes = await getMyRoadmaps();
        if (roadmapRes.success && roadmapRes.data && roadmapRes.data.length > 0) {
          setLatestRoadmap(roadmapRes.data[0]);
        }

        // Fetch interviews
        const interviewRes = await getMySessions();
        if (interviewRes.success && interviewRes.data) {
          setInterviews(interviewRes.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, [setUser]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonLoader className="h-28 rounded-2xl" />
          <SkeletonLoader className="h-28 rounded-2xl" />
          <SkeletonLoader className="h-28 rounded-2xl" />
          <SkeletonLoader className="h-28 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <SkeletonLoader className="lg:col-span-4 h-[300px] rounded-2xl" />
          <SkeletonLoader className="lg:col-span-8 h-[300px] rounded-2xl" />
        </div>
      </div>
    );
  }

  // Calculate statistics
  const latestAnalysis = latestResume?.analysisResults?.[0];
  const atsScore = latestAnalysis?.score || 0;
  const roadmapProgress = latestRoadmap?.currentProgress || 0;
  const completedInterviews = interviews.filter((i) => i.responses !== null).length;
  const skillsToImprove = latestAnalysis?.missingSkills?.length || 0;

  const strengths = latestAnalysis?.strengths || [
    'TypeScript base',
    'NestJS controller layout',
    'PostgreSQL query structures',
  ];
  const weaknesses = latestAnalysis?.weaknesses || [
    'No unit test coverage',
    'Missing CI/CD setup details',
    'No cache layer configurations',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <PageHeader
        title={`${getGreeting()}, ${user?.firstName || 'Developer'} 👋`}
        subtitle="Here is your intelligent career journey overview."
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Latest ATS Score"
          value={atsScore ? `${atsScore}/100` : '--'}
          icon={Award}
          subtext={atsScore ? 'ATS Match Analysis' : 'Upload a resume to score'}
        />
        <MetricCard
          title="Roadmap Progress"
          value={`${roadmapProgress}%`}
          icon={Flame}
          subtext={latestRoadmap ? `Goal: ${latestRoadmap.targetRole}` : 'No active roadmap'}
        />
        <MetricCard
          title="Total Interviews"
          value={completedInterviews}
          icon={CheckCircle2}
          subtext="Mock sessions graded"
        />
        <MetricCard
          title="Skills to Improve"
          value={skillsToImprove || '--'}
          icon={FileText}
          subtext={skillsToImprove ? 'Missing skills detected' : 'No gaps identified yet'}
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Score Ring */}
        <Card className="lg:col-span-4 flex flex-col items-center justify-center p-6 text-center hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 text-center p-0">
            <CardTitle>ATS Alignment</CardTitle>
            <CardDescription className="text-xs">Based on latest resume analysis</CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-6 flex justify-center w-full">
            <ScoreRing score={atsScore || 75} size={150} />
          </CardContent>
        </Card>

        {/* Right: Strengths & Weaknesses */}
        <Card className="lg:col-span-8 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Qualifications Overview</CardTitle>
            <CardDescription>Key items identified in your profile</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-0">
            {/* Strengths */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#1D9E75] uppercase tracking-widest flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Strengths
              </h4>
              <ul className="space-y-3">
                {strengths.map((str, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-[#1A1832] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] mt-1.5 flex-shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#E24B4A] uppercase tracking-widest flex items-center gap-1.5">
                <AlertCircle className="w-4.5 h-4.5" /> Gaps & Weaknesses
              </h4>
              <ul className="space-y-3">
                {weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex gap-2 items-start text-xs text-[#1A1832] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E24B4A] mt-1.5 flex-shrink-0" />
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interviews */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Recent Mock Interviews</CardTitle>
          <CardDescription>Review your latest attempts and scoring feedback</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 overflow-x-auto">
          {interviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {interviews.slice(0, 3).map((item) => (
                <div key={item.id} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex flex-col justify-between h-36">
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1832] truncate">{item.role}</h4>
                    <p className="text-[10px] text-[#6B6A8A] mt-1 truncate">{item.topic}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-[10px] text-[#6B6A8A]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    {item.score !== null ? (
                      <Badge variant={item.score >= 80 ? 'success' : item.score >= 60 ? 'warning' : 'error'}>
                        {item.score}%
                      </Badge>
                    ) : (
                      <Badge variant="info">In Progress</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[#6B6A8A]">
              No interview sessions completed yet.{' '}
              <Link href="/dashboard/interviews" className="text-[#3C3489] font-semibold hover:underline">
                Practice now
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
