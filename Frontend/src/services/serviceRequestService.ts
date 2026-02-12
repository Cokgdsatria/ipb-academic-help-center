// ============================================================
// 📝 SERVICE REQUEST SERVICE - CRUD Operations
// ============================================================

import type { ServiceRequest, ApiResponse, PaginatedResponse } from "../types";
import { sleep, generateId } from "../utils/helpers";

// Simulated database
let mockRequests: ServiceRequest[] = [
  {
    id: "REQ-001",
    userId: "mhs-001",
    serviceId: "1",
    serviceName: "Surat Aktif Kuliah",
    title: "Permohonan Surat Aktif Kuliah",
    description: "Saya membutuhkan surat aktif untuk keperluan administrasi",
    category: "surat-aktif",
    status: "completed",
    priority: "high",
    createdAt: new Date("2025-02-01"),
    updatedAt: new Date("2025-02-02"),
    completedAt: new Date("2025-02-02"),
    approvedBy: "admin-001",
  },
  {
    id: "REQ-002",
    userId: "mhs-001",
    serviceId: "2",
    serviceName: "Surat Cuti Akademik",
    title: "Permohonan Cuti Akademik",
    description: "Sedang sakit, perlu istirahat 1 semester",
    category: "cuti",
    status: "processing",
    priority: "medium",
    createdAt: new Date("2025-02-05"),
    updatedAt: new Date("2025-02-08"),
  },
  {
    id: "REQ-003",
    userId: "mhs-001",
    serviceId: "3",
    serviceName: "Transkrip Akademik",
    title: "Permohonan Transkrip Akademik",
    description: "Untuk keperluan lamaran beasiswa luar negeri",
    category: "transkrip",
    status: "pending",
    priority: "high",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
];

class ServiceRequestService {
  /**
   * CREATE - Buat pengajuan layanan baru
   */
  async createRequest(
    request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt">,
  ) {
    await sleep(800);

    const newRequest: ServiceRequest = {
      ...request,
      id: `REQ-${String(mockRequests.length + 1).padStart(3, "0")}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockRequests.push(newRequest);

    return {
      success: true,
      data: newRequest,
      message: "Pengajuan berhasil dibuat",
    } as ApiResponse<ServiceRequest>;
  }

  /**
   * READ - Dapatkan semua pengajuan user
   */
  async getRequestsByUser(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<PaginatedResponse<ServiceRequest>>> {
    await sleep(500);

    const userRequests = mockRequests.filter((r) => r.userId === userId);
    const total = userRequests.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = userRequests.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        data: paginatedData,
        total,
        page,
        limit,
        totalPages,
      },
      message: `${total} pengajuan ditemukan`,
    };
  }

  /**
   * READ - Dapatkan semua pengajuan (untuk admin)
   */
  async getAllRequests(
    page: number = 1,
    limit: number = 10,
    status?: string,
  ): Promise<ApiResponse<PaginatedResponse<ServiceRequest>>> {
    await sleep(500);

    let filteredRequests = mockRequests;

    if (status) {
      filteredRequests = mockRequests.filter((r) => r.status === status);
    }

    const total = filteredRequests.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = filteredRequests.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        data: paginatedData,
        total,
        page,
        limit,
        totalPages,
      },
      message: `${total} pengajuan ditemukan`,
    };
  }

  /**
   * READ - Dapatkan detail satu pengajuan
   */
  async getRequestById(
    requestId: string,
  ): Promise<ApiResponse<ServiceRequest>> {
    await sleep(300);

    const request = mockRequests.find((r) => r.id === requestId);

    if (!request) {
      return {
        success: false,
        message: "Pengajuan tidak ditemukan",
        errors: ["Request not found"],
      };
    }

    return {
      success: true,
      data: request,
      message: "Pengajuan ditemukan",
    };
  }

  /**
   * UPDATE - Perbarui status pengajuan (admin only)
   */
  async updateRequestStatus(
    requestId: string,
    status: string,
    notes?: string,
    approvedBy?: string,
  ): Promise<ApiResponse<ServiceRequest>> {
    await sleep(600);

    const requestIndex = mockRequests.findIndex((r) => r.id === requestId);

    if (requestIndex === -1) {
      return {
        success: false,
        message: "Pengajuan tidak ditemukan",
        errors: ["Request not found"],
      };
    }

    const updatedRequest = {
      ...mockRequests[requestIndex],
      status,
      notes: notes || mockRequests[requestIndex].notes,
      approvedBy: approvedBy || mockRequests[requestIndex].approvedBy,
      updatedAt: new Date(),
      completedAt: status === "completed" ? new Date() : undefined,
    };

    mockRequests[requestIndex] = updatedRequest;

    return {
      success: true,
      data: updatedRequest,
      message: `Status pengajuan diperbarui menjadi ${status}`,
    };
  }

  /**
   * UPDATE - Edit pengajuan (user only, sebelum diproses)
   */
  async updateRequest(
    requestId: string,
    updates: Partial<ServiceRequest>,
  ): Promise<ApiResponse<ServiceRequest>> {
    await sleep(600);

    const requestIndex = mockRequests.findIndex((r) => r.id === requestId);

    if (requestIndex === -1) {
      return {
        success: false,
        message: "Pengajuan tidak ditemukan",
        errors: ["Request not found"],
      };
    }

    const currentRequest = mockRequests[requestIndex];

    // Hanya bisa edit jika status pending
    if (currentRequest.status !== "pending") {
      return {
        success: false,
        message: "Hanya pengajuan dengan status pending yang bisa diedit",
        errors: ["Cannot edit non-pending request"],
      };
    }

    const updatedRequest = {
      ...currentRequest,
      ...updates,
      id: currentRequest.id, // Jangan ubah ID
      createdAt: currentRequest.createdAt,
      updatedAt: new Date(),
    };

    mockRequests[requestIndex] = updatedRequest;

    return {
      success: true,
      data: updatedRequest,
      message: "Pengajuan berhasil diperbarui",
    };
  }

  /**
   * DELETE - Hapus pengajuan (user only, status pending)
   */
  async deleteRequest(requestId: string): Promise<ApiResponse<null>> {
    await sleep(600);

    const requestIndex = mockRequests.findIndex((r) => r.id === requestId);

    if (requestIndex === -1) {
      return {
        success: false,
        message: "Pengajuan tidak ditemukan",
        errors: ["Request not found"],
      };
    }

    const requestToDelete = mockRequests[requestIndex];

    if (requestToDelete.status !== "pending") {
      return {
        success: false,
        message: "Hanya pengajuan dengan status pending yang bisa dihapus",
        errors: ["Cannot delete non-pending request"],
      };
    }

    mockRequests.splice(requestIndex, 1);

    return {
      success: true,
      message: "Pengajuan berhasil dihapus",
    };
  }

  /**
   * Get statistics
   */
  async getStatistics(userId?: string): Promise<
    ApiResponse<{
      total: number;
      pending: number;
      processing: number;
      approved: number;
      rejected: number;
      completed: number;
    }>
  > {
    await sleep(500);

    const requests = userId
      ? mockRequests.filter((r) => r.userId === userId)
      : mockRequests;

    const stats = {
      total: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      processing: requests.filter((r) => r.status === "processing").length,
      approved: requests.filter((r) => r.status === "approved").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
      completed: requests.filter((r) => r.status === "completed").length,
    };

    return {
      success: true,
      data: stats,
      message: "Statistik berhasil diambil",
    };
  }
}

export default new ServiceRequestService();
