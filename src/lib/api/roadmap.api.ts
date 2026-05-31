import { api } from '../api';
import { ApiResponse, CareerRoadmap } from '@/types';

export async function getMyRoadmaps(): Promise<ApiResponse<CareerRoadmap[]>> {
  return api.get<ApiResponse<CareerRoadmap[]>>('/roadmap/my-roadmaps');
}

export async function getRoadmap(id: string): Promise<ApiResponse<CareerRoadmap>> {
  return api.get<ApiResponse<CareerRoadmap>>(`/roadmap/${id}`);
}

export async function toggleStep(roadmapId: string, stepIndex: number): Promise<ApiResponse<CareerRoadmap>> {
  return api.patch<ApiResponse<CareerRoadmap>>(`/roadmap/${roadmapId}/step/${stepIndex}`);
}
