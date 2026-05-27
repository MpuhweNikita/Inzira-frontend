import axiosInstance from '../axios';
import { ApiResponse, Resume } from '@/types';

export async function uploadResume(formData: FormData): Promise<ApiResponse<Resume>> {
  const { data } = await axiosInstance.post<ApiResponse<Resume>>('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function getResume(id: string): Promise<ApiResponse<Resume>> {
  const { data } = await axiosInstance.get<ApiResponse<Resume>>(`/resume/${id}`);
  return data;
}
