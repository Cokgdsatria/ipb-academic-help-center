import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export interface JenisPengajuan {
    id: number;
    nama_jenis: string;
}

export interface Dosen {
    id_user: string;
    nama: string;
}

export interface TicketRequest {
  judul: string;
  deskripsi: string;
  id_jenis_pengajuan: number;
  id_dosen: number;
  tanggal_bimbingan?: string | null;
}

export interface TicketResponse {
    id: number;
    topik?: string;
    subjek: string;
    status: 'PENDING' | 'RESOLVED' | 'REJECTED';
    deskripsi?: string;
    dosen_id?: number;
    tanggal_bimbingan?: string;
    komentar_dosen?: string;
    created_at: string;
}

export interface DashboardStats {
  total_tickets: number;
  pending_tickets: number;
  completed_tickets: number;
  rejected_tickets: number;
}

const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Ambil token dari login
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const ticketService = {
  // 1. Ambil Kategori Pengajuan 
  getTicketTypes: async (): Promise<JenisPengajuan[]> => {
    const response = await axios.get(`${API_URL}/tickets/types`, getAuthHeader());
    return response.data;
  },

  // 2. Ambil Daftar Dosen 
  getLecturers: async (): Promise<Dosen[]> => {
    const response = await axios.get(`${API_URL}/tickets/lecturers`, getAuthHeader());
    return response.data;
  },

  // 3. Kirim Pengajuan Baru 
  createTicket: async (data: TicketRequest): Promise<TicketResponse> => {
    const response = await axios.post(`${API_URL}/tickets/`, data, getAuthHeader());
    return response.data;
  },

  // 4. Ambil Statistik Dashboard 
  getStats: async (): Promise<DashboardStats> => {
    const response = await axios.get(`${API_URL}/tickets/stats`, getAuthHeader());
    return response.data;
  },

  // 5. Ambil Daftar Riwayat Tiket Saya
  getMyTickets: async (): Promise<TicketResponse[]> => {
    const response = await axios.get(`${API_URL}/tickets/my-tickets`, getAuthHeader());
    return response.data;
  }
};
