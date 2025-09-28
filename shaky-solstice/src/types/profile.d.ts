// src/types/profile.ts

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  created_at: string;
  role: string;
  permissions: string[];
  logs: ActivityLog[];
  transactions: any[];
}

export interface ActivityLog {
  id: number;
  action: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

export interface MetaData {
  timestamp: string;
  version: string;
  environment: string;
  request_id: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: ProfileData;
  meta: MetaData;
}
