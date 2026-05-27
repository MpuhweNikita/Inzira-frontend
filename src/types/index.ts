export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  id: string;
  userId: string;
  fileUrl: string;
  fileKey: string;
  fileName: string;
  extractedText: string | null;
  createdAt: string;
  updatedAt: string;
  analysisResults?: AnalysisResult[];
}

export interface AnalysisResult {
  id: string;
  resumeId: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SkillGap {
  id: string;
  userId: string;
  identifiedGaps: Array<{
    skill: string;
    category: 'technical' | 'soft' | 'tool';
    currentLevel: 'none' | 'beginner' | 'intermediate';
    importance: 'high' | 'medium' | 'low';
  }>;
  recommendations: Array<{
    skill: string;
    resourceType: 'course' | 'certification' | 'project';
    title: string;
    providerOrDescription: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CareerRoadmap {
  id: string;
  userId: string;
  targetRole: string;
  steps: Array<{
    title: string;
    description: string;
    estimatedDuration: string;
    resources: string[];
    completed: boolean;
  }>;
  currentProgress: number;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  id: string;
  questionText: string;
  context: string;
}

export interface GradedResponse {
  questionId: string;
  questionText: string;
  answerText: string;
  feedback: string;
  score: number;
}

export interface InterviewSession {
  id: string;
  userId: string;
  role: string;
  topic: string;
  questions: InterviewQuestion[];
  responses: GradedResponse[] | null;
  overallFeedback: string | null;
  score: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  statusCode: number;
  message: string;
  allMessages: string[];
  error: string;
  details: Record<string, any> | null;
  timestamp: string;
  path: string;
}
