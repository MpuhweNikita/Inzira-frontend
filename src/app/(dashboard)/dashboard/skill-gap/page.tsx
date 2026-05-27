'use client';

import React, { useState } from 'react';
import { Target, BookOpen, Award, Code, AlertCircle } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { detectSkillGap } from '@/lib/api/ai.api';
import { useToast } from '@/components/ui/Toast';
import { SkillGap } from '@/types';
import { motion } from 'framer-motion';

export default function SkillGapPage() {
  const { addToast } = useToast();
  const [targetRole, setTargetRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SkillGap | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) return;

    setIsLoading(true);
    try {
      const response = await detectSkillGap(targetRole);
      if (response.success && response.data) {
        setResults(response.data);
        addToast('Gaps scan completed successfully!', 'success');
      } else {
        addToast(response.message || 'Failed to detect gaps', 'error');
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Failed to run gap analysis. Ensure you have uploaded a resume first.';
      addToast(errMsg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'technical':
        return 'bg-[#3C3489]/20 text-[#3C3489]';
      case 'soft':
        return 'bg-teal-100 text-teal-700';
      case 'tool':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getImportanceStyles = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-[#D85A30] text-white';
      case 'medium':
        return 'bg-[#EF9F27] text-white';
      case 'low':
        return 'bg-gray-200 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'certification':
        return Award;
      case 'project':
        return Code;
      default:
        return BookOpen;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <PageHeader
        title="Skill Gap Analyzer"
        subtitle="Cross-check your credentials against any industry role parameters."
      />

      {/* Target input card */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Input
                label="Enter your target role"
                placeholder="e.g. Senior React Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="bg-[#D85A30] hover:bg-[#D85A30]/90 text-white font-bold"
              isLoading={isLoading}
            >
              Analyze Skill Gaps
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading overlay */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 rounded-2xl h-[350px]">
          <LoadingSpinner size="lg" className="mb-4" />
          <h3 className="font-bold text-[#1A1832] text-base">AI is scanning your profile…</h3>
          <p className="text-xs text-[#6B6A8A] mt-1">Cross-referencing resume terms with requirements.</p>
        </div>
      )}

      {/* Results grid */}
      {!isLoading && results && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
          {/* Identified Gaps (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-[#1A1832] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#3C3489]" /> Identified Gaps
            </h3>
            
            <div className="space-y-3">
              {results.identifiedGaps.map((item, idx) => (
                <div key={idx} className="p-4 bg-white border border-[#3C3489]/10 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-[#1A1832]">{item.skill}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${getCategoryStyles(item.category)}`}>
                        {item.category}
                      </span>
                      <span className="text-[10px] text-[#6B6A8A]">
                        Level: <strong className="text-[#1A1832]">{item.currentLevel}</strong>
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${getImportanceStyles(item.importance)}`}>
                    {item.importance} Importance
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-[#1A1832] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D85A30]" /> Recommendations
            </h3>

            <div className="space-y-3">
              {results.recommendations.map((item, idx) => {
                const Icon = getResourceIcon(item.resourceType);
                return (
                  <div key={idx} className="p-4 bg-white border border-gray-100 rounded-xl flex gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-2 bg-[#3C3489]/5 rounded-lg text-[#3C3489] h-fit">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-[#1A1832]">{item.title}</h4>
                      <p className="text-[10px] text-[#6B6A8A] leading-relaxed">{item.providerOrDescription}</p>
                      <span className="inline-block text-[9px] font-extrabold text-[#D85A30] uppercase tracking-widest mt-1">
                        {item.resourceType}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !results && (
        <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed border-gray-100 rounded-2xl h-[350px] text-center">
          <div className="p-4 bg-[#3C3489]/5 rounded-full mb-4">
            <Target className="w-8 h-8 text-[#3C3489]" />
          </div>
          <h3 className="font-bold text-[#1A1832] text-base mb-1">Analyze your skill gaps</h3>
          <p className="text-xs text-[#6B6A8A] max-w-xs leading-relaxed">
            Enter a target role above to get started
          </p>
        </div>
      )}
    </motion.div>
  );
}
