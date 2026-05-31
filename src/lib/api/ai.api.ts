import { api } from '../api';
import { ApiResponse, AnalysisResult, SkillGap, CareerRoadmap } from '@/types';

export async function analyzeResume(resumeId: string): Promise<ApiResponse<AnalysisResult>> {
  return api.post<ApiResponse<AnalysisResult>>('/ai/analyze', { resumeId });
}

export async function detectSkillGap(targetRole: string): Promise<ApiResponse<SkillGap>> {
  return api.post<ApiResponse<SkillGap>>('/ai/skill-gap', { targetRole });
}

export async function generateRoadmap(targetRole: string, missingSkills: string[]): Promise<ApiResponse<CareerRoadmap>> {
  return api.post<ApiResponse<CareerRoadmap>>('/ai/roadmap', { targetRole, missingSkills });
}
