// ============================================================
// 🔐 LOGIN PAGE - User Authentication Interface
// ============================================================

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { MOCK_USERS } from "../../utils/constants";
import { validateEmail, validatePassword } from "../../utils/validators";

type UserRole = "mahasiswa" | "admin" | "dosen";

interface RoleOption {
  id: UserRole;
  label: string;
  description: string;
  icon: string;
  color: string;
  credentials: { email: string; password: string };
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "mahasiswa",
    label: "Mahasiswa",
    description: "Akses sebagai mahasiswa untuk mengajukan layanan akademik",
    icon: "👨‍🎓",
    color: "from-blue-500 to-blue-600",
    credentials: {
      email: MOCK_USERS.mahasiswa.email,
      password: MOCK_USERS.mahasiswa.password,
    },
  },
  {
    id: "admin",
    label: "Admin",
    description: "Akses sebagai administrator untuk mengelola sistem",
    icon: "⚙️",
    color: "from-red-500 to-red-600",
    credentials: {
      email: MOCK_USERS.admin.email,
      password: MOCK_USERS.admin.password,
    },
  },
  {
    id: "dosen",
    label: "Dosen",
    description: "Akses sebagai dosen untuk melihat dan memberikan umpan balik",
    icon: "👨‍🏫",
    color: "from-green-500 to-green-600",
    credentials: {
      email: MOCK_USERS.dosen.email,
      password: MOCK_USERS.dosen.password,
    },
  },
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [step, setStep] = useState<"role" | "credentials">("role");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    const option = ROLE_OPTIONS.find((r) => r.id === role);
    if (option) {
      setCredentials({
        email: option.credentials.email,
        password: option.credentials.password,
      });
      setSelectedRole(role);
      setStep("credentials");
      setLoginError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setLoginError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      setLoginError("Pilih role terlebih dahulu");
      return;
    }

    // Validasi email
    if (!validateEmail(credentials.email)) {
      setLoginError("Email tidak valid");
      return;
    }

    // Validasi password
    const passwordValidation = validatePassword(credentials.password);
    if (!passwordValidation.valid) {
      setLoginError(passwordValidation.errors[0]);
      return;
    }

    try {
      const success = await login(
        credentials.email,
        credentials.password,
        selectedRole,
      );

      if (success) {
        // Redirect ke dashboard
        navigate("/dashboard");
      } else {
        setLoginError(error || "Login gagal. Silahkan coba lagi.");
      }
    } catch (err) {
      setLoginError("Terjadi kesalahan saat login");
    }
  };

  const handleBack = () => {
    setStep("role");
    setSelectedRole(null);
    setCredentials({ email: "", password: "" });
    setLoginError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 opacity-5 rounded-full blur-3xl"></div>

      {/* Container */}
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">IPB Academic</h1>
          <p className="text-gray-400">Help Center</p>
        </div>

        {/* Role Selection Step */}
        {step === "role" ? (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-white text-center mb-6">
              Pilih Peran Anda
            </h2>

            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left group
                  ${
                    selectedRole === role.id
                      ? `border-${role.color.split("-")[1]}-500 bg-white bg-opacity-10`
                      : "border-gray-600 hover:border-gray-500 bg-white bg-opacity-5"
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-2xl mb-1">{role.icon}</div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                      {role.label}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {role.description}
                    </p>
                  </div>
                  <div className="text-xl opacity-0 group-hover:opacity-100 transition">
                    →
                  </div>
                </div>
              </button>
            ))}

            {/* Info Box */}
            <div className="mt-8 p-4 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-20 rounded-lg">
              <p className="text-sm text-blue-200">
                <strong>💡 Tips:</strong> Klik pada peran untuk melanjutkan ke
                halaman login. Kredensial dummy sudah disiapkan untuk demo.
              </p>
            </div>
          </div>
        ) : (
          // Credentials Step
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-20">
            {/* Role Info */}
            <div className="mb-6 p-3 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {ROLE_OPTIONS.find((r) => r.id === selectedRole)?.icon}
                </span>
                <div>
                  <p className="text-sm text-gray-400">Masuk sebagai</p>
                  <p className="text-lg font-semibold text-white">
                    {ROLE_OPTIONS.find((r) => r.id === selectedRole)?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg">
                <p className="text-sm text-red-200">{loginError}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="nama@ipb.ac.id"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-gray-400">Ingat saya</span>
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Lupa password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sedang masuk..." : "Masuk"}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 text-gray-300 font-semibold py-2 rounded-lg transition border border-white border-opacity-10"
              >
                Kembali
              </button>
            </form>

            {/* Demo Credentials Hint */}
            <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-20 rounded-lg">
              <p className="text-xs text-yellow-200">
                <strong>Demo:</strong> Kredensial sudah diisi otomatis. Klik
                "Masuk" untuk melanjutkan.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          IPB Academic Help Center © 2025 | Sistem Informasi Layanan Akademik
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
