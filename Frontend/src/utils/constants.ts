// ============================================================
// ⚙️ CONSTANTS & MOCK DATA - IPB Academic Help Center
// ============================================================

import type { AcademicService } from '../types';

// UI Constants
export const APP_NAME = 'IPB Academic Help Center';
export const APP_VERSION = '1.0.0';

// API Endpoints (untuk nanti diganti dengan real API)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Status Labels dengan Warna
export const STATUS_CONFIG = {
  pending: {
    label: 'Menunggu',
    color: 'bg-yellow-100 text-yellow-800',
    bgColor: 'bg-yellow-50',
  },
  processing: {
    label: 'Diproses',
    color: 'bg-blue-100 text-blue-800',
    bgColor: 'bg-blue-50',
  },
  approved: {
    label: 'Disetujui',
    color: 'bg-green-100 text-green-800',
    bgColor: 'bg-green-50',
  },
  rejected: {
    label: 'Ditolak',
    color: 'bg-red-100 text-red-800',
    bgColor: 'bg-red-50',
  },
  completed: {
    label: 'Selesai',
    color: 'bg-emerald-100 text-emerald-800',
    bgColor: 'bg-emerald-50',
  },
};

// Priority Levels
export const PRIORITY_CONFIG = {
  low: { label: 'Rendah', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Sedang', color: 'bg-orange-100 text-orange-800' },
  high: { label: 'Tinggi', color: 'bg-red-100 text-red-800' },
};

// Mock Academic Services
export const MOCK_SERVICES: AcademicService[] = [
  {
    id: '1',
    name: 'Surat Aktif Kuliah',
    description: 'Surat pernyataan bahwa mahasiswa sedang aktif mengikuti program studi',
    category: 'surat-aktif',
    processingTime: '1-2 hari kerja',
    requiredDocuments: ['KTM', 'Kartu Tanda Penduduk'],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Surat Cuti Akademik',
    description: 'Permohonan izin cuti dari kegiatan akademik',
    category: 'cuti',
    processingTime: '3-5 hari kerja',
    requiredDocuments: ['Justifikasi alasan', 'Surat keterangan penunjang'],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Transkrip Akademik',
    description: 'Dokumen daftar nilai hasil belajar mahasiswa',
    category: 'transkrip',
    processingTime: '2-3 hari kerja',
    requiredDocuments: ['KTM'],
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Alih Daya Program Studi',
    description: 'Permohonan alih daya/pindah program studi',
    category: 'alih-daya',
    processingTime: '5-7 hari kerja',
    requiredDocuments: ['KTM', 'Transkrip akademik', 'Surat rekomendasi dosen'],
    isAvailable: true,
  },
];

// Mock Users untuk Login
export const MOCK_USERS = {
  mahasiswa: {
    id: 'mhs-001',
    email: 'mahasiswa@ipb.ac.id',
    password: 'password123', // HANYA UNTUK MOCK!
    name: 'Ari Wijaya',
    nim: '090.112.001',
    departemen: 'Teknologi Hasil Pertanian',
    role: 'mahasiswa' as const,
  },
  admin: {
    id: 'admin-001',
    email: 'admin@ipb.ac.id',
    password: 'admin123',
    name: 'Budi Admin',
    departemen: 'Rektorat',
    role: 'admin' as const,
  },
  dosen: {
    id: 'dosen-001',
    email: 'dosen@ipb.ac.id',
    password: 'dosen123',
    name: 'Dr. Citra Wijaya, S.P., M.Sc',
    departemen: 'Teknologi Hasil Pertanian',
    role: 'dosen' as const,
  },
};

// User Role Permissions
export const ROLE_PERMISSIONS = {
  mahasiswa: ['view_services', 'create_request', 'view_own_requests', 'view_profile'],
  admin: [
    'view_services',
    'manage_services',
    'view_all_requests',
    'approve_reject_request',
    'manage_users',
  ],
  dosen: ['view_services', 'view_all_requests', 'add_comments_request'],
};

// Navigation Items per Role
export const NAV_ITEMS = {
  mahasiswa: [
    { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { label: 'Layanan', href: '/services', icon: 'services' },
    { label: 'Pengajuan Saya', href: '/requests', icon: 'requests' },
    { label: 'Profil', href: '/profile', icon: 'profile' },
  ],
  admin: [
    { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { label: 'Manajemen Layanan', href: '/services', icon: 'services' },
    { label: 'Pengajuan', href: '/requests', icon: 'requests' },
    { label: 'Pengguna', href: '/users', icon: 'users' },
    { label: 'Laporan', href: '/reports', icon: 'reports' },
  ],
  dosen: [
    { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { label: 'Layanan', href: '/services', icon: 'services' },
    { label: 'Pengajuan', href: '/requests', icon: 'requests' },
    { label: 'Profil', href: '/profile', icon: 'profile' },
  ],
};
