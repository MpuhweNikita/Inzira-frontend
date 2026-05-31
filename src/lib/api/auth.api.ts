import { api } from '../api';
import { ApiResponse, User } from '@/types';

interface AuthData {
  user: User;
  accessToken: string;
}

export async function registerUser(payload: any): Promise<ApiResponse<AuthData>> {
  return api.post<ApiResponse<AuthData>>('/auth/register', payload);
}

export async function loginUser(payload: any): Promise<ApiResponse<AuthData>> {
  return api.post<ApiResponse<AuthData>>('/auth/login', payload);
}

export async function getProfile(): Promise<ApiResponse<User>> {
  return api.get<ApiResponse<User>>('/users/profile');
}
