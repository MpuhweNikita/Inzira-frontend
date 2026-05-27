'use client';

import React, { useState, useEffect } from 'react';
import { Compass, Check, Calendar, ArrowRight, Play, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { getMyRoadmaps, toggleStep } from '@/lib/api/roadmap.api';
import { generateRoadmap } from '@/lib/api/ai.api';
import { useToast } from '@/components/ui/Toast';
import { CareerRoadmap } from '@/types';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const { addToast } = useToast();
  const [roadmaps, setRoadmaps] = useState<CareerRoadmap[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Form states for creating new roadmap
  const [targetRole, setTargetRole] = useState('');
  const [missingSkillsText, setMissingSkillsText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Optimistic loading state for individual checkpoints
  const [togglingIdx, setTogglingIdx] = useState<number | null>(null);

  const loadRoadmaps = async (toastSuccess = false) => {
    try {
      const response = await getMyRoadmaps();
      if (response.success && response.data) {
        setRoadmaps(response.data);
        if (toastSuccess) {
          addToast('Roadmaps loaded!', 'success');
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) return;

    setIsGenerating(true);
    const skills = missingSkillsText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      const response = await generateRoadmap(targetRole, skills);
      if (response.success && response.data) {
        addToast('Personalized career roadmap generated!', 'success');
        setTargetRole('');
        setMissingSkillsText('');
        // Reload list and focus on the new roadmap (which should be at index 0 or sorted)
        await loadRoadmaps();
        setActiveIdx(0);
      } else {
        addToast(response.message || 'Failed to generate roadmap', 'error');
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error creating roadmap.';
      addToast(errMsg, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleStep = async (roadmapId: string, stepIndex: number) => {
    setTogglingIdx(stepIndex);
    
    // Optimistic UI update
    const previousRoadmaps = [...roadmaps];
    const updated = [...roadmaps];
    const currentRoadmap = { ...updated[activeIdx] };
    const currentSteps = [...currentRoadmap.steps];
    
    currentSteps[stepIndex] = {
      ...currentSteps[stepIndex],
      completed: !currentSteps[stepIndex].completed,
    };
    
    // Recalculate progress percentage
    const completedCount = currentSteps.filter((s) => s.completed).length;
    currentRoadmap.currentProgress = Math.round((completedCount / currentSteps.length) * 100);
    currentRoadmap.steps = currentSteps;
    updated[activeIdx] = currentRoadmap;
    
    setRoadmaps(updated);

    try {
      const response = await toggleStep(roadmapId, stepIndex);
      if (response.success && response.data) {
        // Sync with exact server calculations
        const serverRoadmap = response.data;
        const syncUpdated = [...updated];
        syncUpdated[activeIdx] = serverRoadmap;
        setRoadmaps(syncUpdated);
        addToast(`Milestone updated!`, 'success');
      } else {
        setRoadmaps(previousRoadmaps);
        addToast('Failed to toggle step on server', 'error');
      }
    } catch (err) {
      setRoadmaps(previousRoadmaps);
      addToast('Error syncing checkpoint toggle.', 'error');
    } finally {
      setTogglingIdx(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-[250px] bg-white rounded-2xl animate-pulse" />
      </div>
    );
  }

  const activeRoadmap = roadmaps[activeIdx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 animate-fadeIn"
    >
      <PageHeader
        title="Career Roadmap"
        subtitle="Track checklist milestones to cross skill gaps and level up."
      />

      {roadmaps.length === 0 ? (
        /* Generate form */
        <Card className="max-w-xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle>Generate Your Custom Career Roadmap</CardTitle>
            <CardDescription>
              We will structure a sequential timeline to guide you to your target role.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <form onSubmit={handleGenerate} className="space-y-5">
              <Input
                label="Target Role"
                placeholder="e.g. Senior NestJS Engineer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                disabled={isGenerating}
                required
              />
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#1A1832]">
                  Missing Skills (Comma-separated)
                </label>
                <textarea
                  className="w-full min-h-[100px] p-3 border border-gray-200 rounded-xl bg-white text-[#1A1832] text-xs focus:border-[#3C3489] focus:ring-1 focus:ring-[#3C3489] outline-none placeholder:text-gray-300 resize-none leading-relaxed"
                  placeholder="e.g. Docker, Redis, Unit Testing, AWS"
                  value={missingSkillsText}
                  onChange={(e) => setMissingSkillsText(e.target.value)}
                  disabled={isGenerating}
                />
              </div>

              <Button
                type="submit"
                variant="coral"
                className="w-full bg-[#D85A30] hover:bg-[#D85A30]/90 text-white font-bold"
                isLoading={isGenerating}
              >
                Generate Roadmap →
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        /* Roadmap steps view */
        <div className="space-y-6">
          {/* Roadmap Tabs */}
          <div className="flex gap-2 border-b border-gray-100 pb-3 overflow-x-auto scrollbar-none">
            {roadmaps.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => setActiveIdx(idx)}
                className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
                  idx === activeIdx
                    ? 'bg-[#3C3489] border-[#3C3489] text-white'
                    : 'bg-white border-gray-200 text-[#6B6A8A] hover:bg-gray-50'
                }`}
              >
                {r.targetRole}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps Timeline (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Progress bar card */}
              <Card>
                <CardContent className="p-6 flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-xs font-bold text-[#1A1832]">
                      <span>Roadmap Completion</span>
                      <span>{activeRoadmap.currentProgress}%</span>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeRoadmap.currentProgress}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-[#3C3489]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Vertical timeline stepper */}
              <div className="space-y-6 relative pl-8">
                {/* Center vertical connector line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200 pointer-events-none" />

                {activeRoadmap.steps.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 animate-fadeIn">
                    {/* Circle badge */}
                    <div
                      className={`absolute left-[-32px] w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs select-none shadow border transition-colors ${
                        step.completed
                          ? 'bg-[#3C3489] border-[#3C3489] text-white'
                          : 'bg-white border-gray-200 text-gray-500'
                      }`}
                    >
                      {step.completed ? <Check className="w-4.5 h-4.5" /> : idx + 1}
                    </div>

                    {/* Step details card */}
                    <Card className="w-full relative hover:shadow-md transition-shadow">
                      {/* Checkbox top-right */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {togglingIdx === idx ? (
                          <Loader2 className="w-4 h-4 text-[#3C3489] animate-spin" />
                        ) : (
                          <input
                            type="checkbox"
                            checked={step.completed}
                            onChange={() => handleToggleStep(activeRoadmap.id, idx)}
                            className="w-4.5 h-4.5 text-[#3C3489] border-gray-300 rounded focus:ring-[#3C3489] cursor-pointer"
                          />
                        )}
                      </div>

                      <CardContent className="p-5 pr-12 space-y-3">
                        <h4 className="font-bold text-sm text-[#1A1832]">{step.title}</h4>
                        <p className="text-xs text-[#6B6A8A] leading-relaxed">{step.description}</p>
                        
                        <div className="flex flex-wrap gap-2 pt-1 items-center">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F4F3FF] text-[#6B6A8A]">
                            <Calendar className="w-3.5 h-3.5" /> {step.estimatedDuration}
                          </span>
                          
                          {step.resources.map((res, rIdx) => (
                            <span
                              key={rIdx}
                              className="text-[9px] font-bold px-2 py-0.5 border border-[#3C3489] rounded-md text-[#3C3489] max-w-[120px] truncate"
                              title={res}
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar info (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upskilling Info</CardTitle>
                  <CardDescription>Follow the checkpoints</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-xs text-[#6B6A8A] leading-relaxed space-y-3">
                  <p>
                    Check off milestones as you learn them. Your total path progress will recalculate immediately.
                  </p>
                  <p>
                    Each step has customized project files or external links to guide you through hands-on learning.
                  </p>
                  <Button
                    onClick={() => setRoadmaps([])}
                    variant="outline"
                    className="w-full text-xs font-bold border-[#3C3489] text-[#3C3489] hover:bg-[#F4F3FF]/40 mt-4"
                  >
                    Build Another Roadmap
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
