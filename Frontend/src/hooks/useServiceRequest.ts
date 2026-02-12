// ============================================================
// 🪝 useServiceRequest HOOK - Service Request Management Hook
// ============================================================

import { useState, useCallback } from "react";
import type { ServiceRequest, PaginatedResponse } from "../types";
import serviceRequestService from "../services/serviceRequestService";

interface UseServiceRequestReturn {
  requests: ServiceRequest[];
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;

  // Actions
  fetchUserRequests: (userId: string, page?: number) => Promise<void>;
  fetchAllRequests: (page?: number, status?: string) => Promise<void>;
  fetchRequestById: (requestId: string) => Promise<ServiceRequest | null>;
  createRequest: (
    request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt">,
  ) => Promise<boolean>;
  updateRequest: (
    requestId: string,
    updates: Partial<ServiceRequest>,
  ) => Promise<boolean>;
  updateRequestStatus: (
    requestId: string,
    status: string,
    notes?: string,
    approvedBy?: string,
  ) => Promise<boolean>;
  deleteRequest: (requestId: string) => Promise<boolean>;
  getStatistics: (userId?: string) => Promise<any>;

  clearError: () => void;
}

export const useServiceRequest = (): UseServiceRequestReturn => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserRequests = useCallback(
    async (userId: string, page: number = 1) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRequestService.getRequestsByUser(
          userId,
          page,
        );

        if (!response.success) {
          setError(response.message || "Gagal mengambil data");
          return;
        }

        setRequests(response.data?.data || []);
        setTotalPages(response.data?.totalPages || 0);
        setCurrentPage(page);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchAllRequests = useCallback(
    async (page: number = 1, status?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRequestService.getAllRequests(
          page,
          10,
          status,
        );

        if (!response.success) {
          setError(response.message || "Gagal mengambil data");
          return;
        }

        setRequests(response.data?.data || []);
        setTotalPages(response.data?.totalPages || 0);
        setCurrentPage(page);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const fetchRequestById = useCallback(
    async (requestId: string): Promise<ServiceRequest | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRequestService.getRequestById(requestId);

        if (!response.success) {
          setError(response.message || "Pengajuan tidak ditemukan");
          return null;
        }

        return response.data || null;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const createRequest = useCallback(
    async (request: Omit<ServiceRequest, "id" | "createdAt" | "updatedAt">) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRequestService.createRequest(request);

        if (!response.success) {
          setError(response.message || "Gagal membuat pengajuan");
          return false;
        }

        if (response.data) {
          setRequests((prev) => [response.data!, ...prev]);
        }
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateRequest = useCallback(
    async (requestId: string, updates: Partial<ServiceRequest>) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRequestService.updateRequest(
          requestId,
          updates,
        );

        if (!response.success) {
          setError(response.message || "Gagal mengupdate pengajuan");
          return false;
        }

        if (response.data) {
          setRequests((prev) =>
            prev.map((r) => (r.id === requestId ? response.data! : r)),
          );
        }
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const updateRequestStatus = useCallback(
    async (
      requestId: string,
      status: string,
      notes?: string,
      approvedBy?: string,
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await serviceRequestService.updateRequestStatus(
          requestId,
          status,
          notes,
          approvedBy,
        );

        if (!response.success) {
          setError(response.message || "Gagal mengupdate status");
          return false;
        }

        if (response.data) {
          setRequests((prev) =>
            prev.map((r) => (r.id === requestId ? response.data! : r)),
          );
        }
        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteRequest = useCallback(async (requestId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await serviceRequestService.deleteRequest(requestId);

      if (!response.success) {
        setError(response.message || "Gagal menghapus pengajuan");
        return false;
      }

      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStatistics = useCallback(async (userId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await serviceRequestService.getStatistics(userId);

      if (!response.success) {
        setError(response.message || "Gagal mengambil statistik");
        return null;
      }

      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    requests,
    isLoading,
    error,
    totalPages,
    currentPage,
    fetchUserRequests,
    fetchAllRequests,
    fetchRequestById,
    createRequest,
    updateRequest,
    updateRequestStatus,
    deleteRequest,
    getStatistics,
    clearError,
  };
};

export default useServiceRequest;
