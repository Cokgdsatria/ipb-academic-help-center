// ============================================================
// 🔐 AUTH SERVICE - Authentication Mock Service
// ============================================================

import type { User, ApiResponse } from "../types";
import { MOCK_USERS } from "../utils/constants";
import { sleep } from "../utils/helpers";

class AuthService {
  /**
   * Login user dengan email, password, dan role
   * @simulation Simulates API call dengan delay
   */
  async login(
    email: string,
    password: string,
    role: "mahasiswa" | "admin" | "dosen",
  ): Promise<ApiResponse<User>> {
    await sleep(1000); // Simulate network delay

    const user = MOCK_USERS[role];

    if (user.email !== email || user.password !== password) {
      return {
        success: false,
        message: "Email atau password salah",
        errors: ["Invalid credentials"],
      };
    }

    // Success login
    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      nim: user.nim,
      departemen: user.departemen,
    };

    // Simpan ke localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("authToken", `token_${user.id}_${Date.now()}`);

    return {
      success: true,
      data: userData,
      message: "Login berhasil",
    };
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  /**
   * Register new user (mock)
   */
  async register(
    name: string,
    email: string,
    password: string,
    role: "mahasiswa" | "admin" | "dosen",
  ): Promise<ApiResponse<User>> {
    await sleep(1000);

    // Validasi email belum terdaftar
    const userExists = Object.values(MOCK_USERS).some((u) => u.email === email);
    if (userExists) {
      return {
        success: false,
        message: "Email sudah terdaftar",
        errors: ["Email already exists"],
      };
    }

    const newUser: User = {
      id: `${role}-${Date.now()}`,
      email,
      name,
      role,
    };

    return {
      success: true,
      data: newUser,
      message: "Registrasi berhasil",
    };
  }

  /**
   * Verify token
   */
  async verifyToken(token: string): Promise<ApiResponse<boolean>> {
    await sleep(500);

    const isValid = token.startsWith("token_");
    return {
      success: isValid,
      data: isValid,
      message: isValid ? "Token valid" : "Token invalid",
    };
  }

  /**
   * Refresh token
   */
  async refreshToken(): Promise<ApiResponse<string>> {
    await sleep(500);

    const user = this.getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: "User tidak ditemukan",
        errors: ["No authenticated user"],
      };
    }

    const newToken = `token_${user.id}_${Date.now()}`;
    localStorage.setItem("authToken", newToken);

    return {
      success: true,
      data: newToken,
      message: "Token refreshed",
    };
  }
}

export default new AuthService();
