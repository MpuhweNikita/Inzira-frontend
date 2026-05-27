import axiosInstance from '../axios';
import { ApiResponse, InterviewSession } from '@/types';

export async function startInterview(role: string, topic: string): Promise<ApiResponse<InterviewSession>> {
  const { data } = await axiosInstance.post<ApiResponse<InterviewSession>>('/interview/start', { role, topic });
  return data;
}

export async function getMySessions(): Promise<ApiResponse<InterviewSession[]>> {
  const { data } = await axiosInstance.get<ApiResponse<InterviewSession[]>>('/interview/my-sessions');
  return data;
}

export async function getSession(id: string): Promise<ApiResponse<InterviewSession>> {
  const { data } = await axiosInstance.get<ApiResponse<InterviewSession>>(`/interview/${id}`);
  return data;
}

export async function submitAnswers(
  id: string,
  responses: Array<{ questionId: string; answerText: string }>
): Promise<ApiResponse<InterviewSession>> {
  const { data } = await axiosInstance.post<ApiResponse<InterviewSession>>(`/interview/${id}/submit`, { responses });
  return data;
}
