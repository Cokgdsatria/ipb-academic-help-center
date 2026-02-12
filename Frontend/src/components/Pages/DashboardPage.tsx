// ============================================================
// 📊 DASHBOARD PAGE - Main Dashboard for All Roles
// ============================================================

import React, { useEffect, useState } from "react";
import useServiceRequest from "../../hooks/useServiceRequest";
import LoadingSpinner from "../Common/LoadingSpinner";
import { STATUS_CONFIG } from "../../utils/constants";
import { formatDate } from "../../utils/helpers";
import type { User } from "../../types";

interface DashboardPageProps {
  user: User | null;
}

interface StatCard {
  label: string;
  value: number;
  color: string;
  icon: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const { getStatistics, isLoading, error } = useServiceRequest();
  const [stats, setStats] = useState<any>(null);
  const [statCards, setStatCards] = useState<StatCard[]>([]);

  useEffect(() => {
    const loadStatistics = async () => {
      // Jika mahasiswa, ambil statistik user sendiri
      // Jika admin/dosen, ambil statistik semua
      const response = await getStatistics(
        user?.role === "mahasiswa" ? user?.id : undefined,
      );

      if (response) {
        setStats(response);

        // Build stat cards
        const cards: StatCard[] = [
          {
            label: "Total",
            value: response.total,
            color: "from-blue-500 to-blue-600",
            icon: "📋",
          },
          {
            label: "Menunggu",
            value: response.pending,
            color: "from-yellow-500 to-yellow-600",
            icon: "⏳",
          },
          {
            label: "Diproses",
            value: response.processing,
            color: "from-purple-500 to-purple-600",
            icon: "⚙️",
          },
          {
            label: "Disetujui",
            value: response.approved,
            color: "from-green-500 to-green-600",
            icon: "✓",
          },
          {
            label: "Ditolak",
            value: response.rejected,
            color: "from-red-500 to-red-600",
            icon: "✕",
          },
          {
            label: "Selesai",
            value: response.completed,
            color: "from-emerald-500 to-emerald-600",
            icon: "🎉",
          },
        ];

        setStatCards(cards);
      }
    };

    if (user?.id) {
      loadStatistics();
    }
  }, [user]);

  // Role-specific dashboard content
  const getMahasiswaSummary = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/requests/new"
            className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition border border-blue-200 cursor-pointer"
          >
            <span className="text-2xl">➕</span>
            <div>
              <p className="font-semibold text-blue-900">Ajukan Layanan</p>
              <p className="text-sm text-blue-700">Buat pengajuan baru</p>
            </div>
          </a>

          <a
            href="/services"
            className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition border border-green-200 cursor-pointer"
          >
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-semibold text-green-900">Lihat Layanan</p>
              <p className="text-sm text-green-700">Daftar layanan tersedia</p>
            </div>
          </a>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          📌 <strong>Tata Cara:</strong> Tekan "Ajukan Layanan" untuk membuat
          pengajuan baru. Anda dapat melacak status pengajuan di halaman
          "Pengajuan Saya".
        </p>
      </div>
    </div>
  );

  const getAdminSummary = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Manajemen</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="/requests"
            className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition border border-blue-200 cursor-pointer"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-semibold text-blue-900">Pengajuan</p>
              <p className="text-sm text-blue-700">Kelola pengajuan</p>
            </div>
          </a>

          <a
            href="/services"
            className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition border border-purple-200 cursor-pointer"
          >
            <span className="text-2xl">⚙️</span>
            <div>
              <p className="font-semibold text-purple-900">Layanan</p>
              <p className="text-sm text-purple-700">Kelola layanan</p>
            </div>
          </a>

          <a
            href="/users"
            className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition border border-green-200 cursor-pointer"
          >
            <span className="text-2xl">👥</span>
            <div>
              <p className="font-semibold text-green-900">Pengguna</p>
              <p className="text-sm text-green-700">Kelola pengguna</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const getDosenSummary = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="/requests"
            className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition border border-blue-200 cursor-pointer"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-semibold text-blue-900">Pengajuan</p>
              <p className="text-sm text-blue-700">Lihat semua pengajuan</p>
            </div>
          </a>

          <a
            href="/services"
            className="flex items-center gap-3 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition border border-green-200 cursor-pointer"
          >
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-semibold text-green-900">Layanan</p>
              <p className="text-sm text-green-700">Daftar layanan</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LoadingSpinner text="Memuat dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Selamat datang, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 capitalize">
          Dashboard{" "}
          {user?.role === "mahasiswa"
            ? "Mahasiswa"
            : user?.role === "admin"
              ? "Administrator"
              : "Dosen"}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.color} rounded-lg shadow p-6 text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">{card.label}</p>
                <p className="text-4xl font-bold">{card.value}</p>
              </div>
              <span className="text-5xl opacity-20">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Role-Specific Content */}
      <div>
        {user?.role === "mahasiswa" && getMahasiswaSummary()}
        {user?.role === "admin" && getAdminSummary()}
        {user?.role === "dosen" && getDosenSummary()}
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">ℹ️ Informasi</h2>
        <div className="space-y-3">
          <p className="text-gray-700">
            IPB Academic Help Center adalah menyediakan sarana bagi mahasiswa
            untuk mengajukan layanan akademik secara daring. Sistem ini
            memudahkan mahasiswa melacak status pengajuan dan menerima
            notifikasi perubahan status.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
            💡 <strong>Tip:</strong> Navigasi menggunakan menu di atas untuk
            mengakses fitur-fitur lainnya.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
