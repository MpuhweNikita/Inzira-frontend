import axiosInstance from '../axios';
import { ApiResponse, User } from '@/types';

interface AuthData {
  user: User;
  accessToken: string;
}

export async function registerUser(payload: any): Promise<ApiResponse<AuthData>> {
  const { data } = await axiosInstance.post<ApiResponse<AuthData>>('/auth/register', payload);
  return data;
}

export async function loginUser(payload: any): Promise<ApiResponse<AuthData>> {
  const { data } = await axiosInstance.post<ApiResponse<AuthData>>('/auth/login', payload);
  return data;
}

export async function getProfile(): Promise<ApiResponse<User>> {
  const { data } = await axiosInstance.get<ApiResponse<User>>('/users/profile');
  return data;
}
