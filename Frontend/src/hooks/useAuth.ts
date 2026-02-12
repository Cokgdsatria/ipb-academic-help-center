// ============================================================
// 🪝 useAuth HOOK - Authentication Hook
// ============================================================

import { useState, useCallback, useEffect } from "react";
import type { User } from "../types";
import authService from "../services/authService";

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string,
    role: "mahasiswa" | "admin" | "dosen",
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize user from localStorage
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = useCallback(
    async (
      email: string,
      password: string,
      role: "mahasiswa" | "admin" | "dosen",
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authService.login(email, password, role);

        if (!response.success) {
          setError(response.message || "Login gagal");
          return false;
        }

        setUser(response.data || null);
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

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };
};

export default useAuth;
