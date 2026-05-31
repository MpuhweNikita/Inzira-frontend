import { api } from '../api';
import { ApiResponse, Resume } from '@/types';

export async function uploadResume(formData: FormData): Promise<ApiResponse<Resume>> {
  return api.post<ApiResponse<Resume>>('/resume/upload', formData);
}

export async function getResume(id: string): Promise<ApiResponse<Resume>> {
  return api.get<ApiResponse<Resume>>(`/resume/${id}`);
}
