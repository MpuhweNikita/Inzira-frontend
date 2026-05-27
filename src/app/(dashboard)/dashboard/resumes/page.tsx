'use client';

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, FileText, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { uploadResume, getResume } from '@/lib/api/resume.api';
import { getProfile } from '@/lib/api/auth.api';
import { useToast } from '@/components/ui/Toast';
import { Resume, AnalysisResult } from '@/types';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ScoreRing = dynamic(() => import('@/components/ui/ScoreRing').then(mod => mod.ScoreRing), {
  ssr: false,
});

export default function ResumePage() {
  const { addToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState<Resume | null>(null);
  const [latestAnalysis, setLatestAnalysis] = useState<AnalysisResult | null>(null);
  const [historyResumes, setHistoryResumes] = useState<Resume[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // Fetch Profile to load resume history relation
  async function loadHistory() {
    setIsLoadingHistory(true);
    try {
      const response = await getProfile();
      if (response.success && response.data) {
        const typedUser = response.data as any;
        if (typedUser.resumes && typedUser.resumes.length > 0) {
          const sorted = [...typedUser.resumes].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setHistoryResumes(sorted);
          // Set default view to the latest upload
          setUploadedResume(sorted[0]);
          if (sorted[0].analysisResults && sorted[0].analysisResults.length > 0) {
            setLatestAnalysis(sorted[0].analysisResults[0]);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingHistory(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  // Dropzone Setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        addToast(`Selected file: ${acceptedFiles[0].name}`, 'info');
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB limit
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await uploadResume(formData);
      if (response.success && response.data) {
        const resumeData = response.data;
        setUploadedResume(resumeData);
        if (resumeData.analysisResults && resumeData.analysisResults.length > 0) {
          setLatestAnalysis(resumeData.analysisResults[0]);
        }
        addToast('Resume uploaded and ATS analysis generated!', 'success');
        setSelectedFile(null);
        loadHistory(); // Reload history
      } else {
        addToast(response.message || 'Failed to upload resume', 'error');
      }
    } catch (err: any) {
      console.error(err);
      const errMsg = err.response?.data?.message || 'Error uploading file. Make sure format is correct.';
      addToast(errMsg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewHistoryItem = async (resume: Resume) => {
    try {
      const res = await getResume(resume.id);
      if (res.success && res.data) {
        setUploadedResume(res.data);
        if (res.data.analysisResults && res.data.analysisResults.length > 0) {
          setLatestAnalysis(res.data.analysisResults[0]);
        }
        addToast(`Loaded analysis for ${resume.fileName}`, 'info');
      }
    } catch (err) {
      addToast('Could not fetch analysis details.', 'error');
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
        title="My Resumes"
        subtitle="Upload and manage your CVs to track ATS compatibility scores."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="hover:shadow-md transition-shadow duration-250">
            <CardHeader>
              <CardTitle>Upload Resume</CardTitle>
              <CardDescription>Supported formats: PDF, DOCX (Max 10MB)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              {/* Dropzone container */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-[#3C3489] bg-[#F4F3FF]'
                    : 'border-[#3C3489]/40 hover:border-[#3C3489] hover:bg-[#F4F3FF]/40'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-10 h-10 text-[#3C3489] mb-4" />
                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="font-bold text-sm text-[#1A1832] truncate max-w-[200px] mx-auto">
                      {selectedFile.name}
                    </p>
                    <p className="text-[10px] text-[#6B6A8A]">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-[#1A1832]">
                      Drop your PDF or DOCX here
                    </p>
                    <p className="text-xs text-[#6B6A8A]">
                      or click to browse local files
                    </p>
                  </div>
                )}
              </div>

              {selectedFile && (
                <Button
                  onClick={handleUpload}
                  className="w-full bg-[#D85A30] hover:bg-[#D85A30]/90 text-white font-bold"
                  isLoading={isUploading}
                >
                  Upload & Analyze
                </Button>
              )}
            </CardContent>
          </Card>

          {/* History card list */}
          <Card>
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>Select previously analyzed resumes</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 max-h-[300px] overflow-y-auto pr-1 space-y-3">
              {isLoadingHistory ? (
                <LoadingSpinner size="sm" />
              ) : historyResumes.length > 0 ? (
                historyResumes.map((item) => {
                  const score = item.analysisResults?.[0]?.score;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleViewHistoryItem(item)}
                      className="p-4 border border-[#3C3489]/10 rounded-xl hover:bg-[#F4F3FF]/50 cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#3C3489]/5 rounded-lg text-[#3C3489]">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden max-w-[150px]">
                          <h4 className="font-bold text-xs text-[#1A1832] truncate">
                            {item.fileName}
                          </h4>
                          <p className="text-[9px] text-[#6B6A8A] mt-0.5">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {score !== undefined && (
                          <Badge variant={score >= 80 ? 'success' : score >= 60 ? 'warning' : 'error'}>
                            {score}
                          </Badge>
                        )}
                        <button className="text-xs font-semibold text-[#3C3489] hover:underline flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-xs text-[#6B6A8A] py-4">No uploads recorded yet.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results Details Column (7 cols) */}
        <div className="lg:col-span-7">
          {isUploading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white border border-gray-100 rounded-2xl h-[400px]">
              <LoadingSpinner size="lg" className="mb-4" />
              <h3 className="font-bold text-[#1A1832] text-base">Running AI Analysis...</h3>
              <p className="text-xs text-[#6B6A8A] mt-1">This may take up to 10 seconds.</p>
            </div>
          ) : latestAnalysis ? (
            <Card className="animate-fadeIn">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[#3C3489]/5">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D85A30]" /> Analysis Result
                  </CardTitle>
                  <CardDescription className="text-xs">ATS alignment scores and recommendations</CardDescription>
                </div>
                {uploadedResume && (
                  <span className="text-[10px] font-semibold text-[#6B6A8A] max-w-[150px] truncate text-right">
                    {uploadedResume.fileName}
                  </span>
                )}
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                {/* Radial score centered */}
                <div className="flex flex-col items-center justify-center py-6 bg-[#F4F3FF]/20 rounded-2xl border border-[#3C3489]/5">
                  <ScoreRing score={latestAnalysis.score} size={160} />
                  <p className="text-6xl font-bold text-[#3C3489] mt-4">
                    {latestAnalysis.score}
                  </p>
                  <p className="text-[10px] font-bold text-[#6B6A8A] uppercase tracking-widest mt-1">
                    Overall ATS Rating
                  </p>
                </div>

                {/* Accordion details */}
                <Accordion>
                  <AccordionItem title="Strengths">
                    <ul className="space-y-2">
                      {latestAnalysis.strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#1A1832]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="Weaknesses">
                    <ul className="space-y-2">
                      {latestAnalysis.weaknesses.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#1A1832]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D85A30] mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>

                  <AccordionItem title="Missing Skills">
                    <div className="flex flex-wrap gap-2">
                      {latestAnalysis.missingSkills.map((item, idx) => (
                        <Badge key={idx} className="bg-[#EF9F27] text-white">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </AccordionItem>

                  <AccordionItem title="Recommendations">
                    <ul className="space-y-2.5">
                      {latestAnalysis.recommendations.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#1A1832]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3C3489] mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed border-gray-100 rounded-2xl h-[400px] text-center">
              <div className="p-4 bg-[#3C3489]/5 rounded-full mb-4">
                <FileText className="w-8 h-8 text-[#3C3489]" />
              </div>
              <h3 className="font-bold text-[#1A1832] text-base mb-1">No active analysis</h3>
              <p className="text-xs text-[#6B6A8A] max-w-xs leading-relaxed">
                Upload a CV on the left panel to scan your credentials against the ATS algorithm.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
