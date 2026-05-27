import axiosInstance from '../axios';
import { ApiResponse, AnalysisResult, SkillGap, CareerRoadmap } from '@/types';

export async function analyzeResume(resumeId: string): Promise<ApiResponse<AnalysisResult>> {
  const { data } = await axiosInstance.post<ApiResponse<AnalysisResult>>('/ai/analyze', { resumeId });
  return data;
}

export async function detectSkillGap(targetRole: string): Promise<ApiResponse<SkillGap>> {
  const { data } = await axiosInstance.post<ApiResponse<SkillGap>>('/ai/skill-gap', { targetRole });
  return data;
}

export async function generateRoadmap(targetRole: string, missingSkills: string[]): Promise<ApiResponse<CareerRoadmap>> {
  const { data } = await axiosInstance.post<ApiResponse<CareerRoadmap>>('/ai/roadmap', { targetRole, missingSkills });
  return data;
}
