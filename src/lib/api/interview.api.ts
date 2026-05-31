import { api } from '../api';
import { ApiResponse, InterviewSession } from '@/types';

export async function startInterview(role: string, topic: string): Promise<ApiResponse<InterviewSession>> {
  return api.post<ApiResponse<InterviewSession>>('/interview/start', { role, topic });
}

export async function getMySessions(): Promise<ApiResponse<InterviewSession[]>> {
  return api.get<ApiResponse<InterviewSession[]>>('/interview/my-sessions');
}

export async function getSession(id: string): Promise<ApiResponse<InterviewSession>> {
  return api.get<ApiResponse<InterviewSession>>(`/interview/${id}`);
}

export async function submitAnswers(
  id: string,
  responses: Array<{ questionId: string; answerText: string }>
): Promise<ApiResponse<InterviewSession>> {
  return api.post<ApiResponse<InterviewSession>>(`/interview/${id}/submit`, { responses });
}
