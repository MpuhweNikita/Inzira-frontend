import axiosInstance from '../axios';
import { ApiResponse, CareerRoadmap } from '@/types';

export async function getMyRoadmaps(): Promise<ApiResponse<CareerRoadmap[]>> {
  const { data } = await axiosInstance.get<ApiResponse<CareerRoadmap[]>>('/roadmap/my-roadmaps');
  return data;
}

export async function getRoadmap(id: string): Promise<ApiResponse<CareerRoadmap>> {
  const { data } = await axiosInstance.get<ApiResponse<CareerRoadmap>>(`/roadmap/${id}`);
  return data;
}

export async function toggleStep(roadmapId: string, stepIndex: number): Promise<ApiResponse<CareerRoadmap>> {
  const { data } = await axiosInstance.patch<ApiResponse<CareerRoadmap>>(`/roadmap/${roadmapId}/step/${stepIndex}`);
  return data;
}
