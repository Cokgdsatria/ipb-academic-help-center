// ============================================================
// 📋 TYPE DEFINITIONS - IPB Academic Help Center
// ============================================================

// User Types
export type UserRole = 'mahasiswa' | 'admin' | 'dosen';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  nim?: string; // Nomor Induk Mahasiswa
  departemen?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Service Types
export type ServiceCategory = 'surat-aktif' | 'cuti' | 'transkrip' | 'alih-daya' | 'lainnya';
export type RequestStatus = 'pending' | 'processing' | 'approved' | 'rejected' | 'completed';

export interface AcademicService {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  processingTime: string; // e.g., "3-5 hari kerja"
  requiredDocuments: string[];
  icon?: string;
  isAvailable: boolean;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  title: string;
  description: string;
  category: ServiceCategory;
  status: RequestStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  notes?: string;
  approvedBy?: string;
  attachments?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  relatedRequestId?: string;
  isRead: boolean;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
