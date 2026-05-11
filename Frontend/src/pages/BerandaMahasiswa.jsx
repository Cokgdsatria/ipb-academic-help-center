import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Info, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ticketService } from '../services/ticketService';
import Badge from '../components/Badge';
import IPBLogo from '../components/IPBLogo';

export default function BerandaMahasiswa() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // const statusItems = [
  //   { label: 'Total Tiket', count: 3, color: 'bg-blue-100 text-blue-700' },
  //   { label: 'Menunggu', count: 1, color: 'bg-yellow-100 text-yellow-700' },
  //   { label: 'Diproses', count: 0, color: 'bg-blue-100 text-blue-600' },
  //   { label: 'Selesai', count: 1, color: 'bg-green-100 text-green-700' },
  //   { label: 'Ditolak', count: 2, color: 'bg-red-100 text-red-700' },
  // ];

  const [stats, setStats] = useState({
    total_tickets: 0,
    pending_tickets: 0,
    completed_tickets: 0,
    rejected_tickets: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await ticketService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Gagal mengambil statistik:', error);
      }
    };
    fetchStats();
  }, []);

  const statusItems = [
    {label: 'Total Tiket', count: stats.total_tickets, color: 'bg-blue-100 text-blue-700'},
    {label: 'Menunggu', count: stats.pending_tickets, color: 'bg-yellow-100 text-yellow-700'},
    {label: 'Selesai', count: stats.completed_tickets, color: 'bg-green-100 text-green-700'},
    {label: 'Ditolak', count: stats.rejected_tickets, color: 'bg-red-100 text-red-700'}
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Selamat datang, {user?.nama} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Di IPB Logicore Help Center</p>
        </div>

        {/* Main section: card + status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {/* Info card */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-4 sm:gap-5">
              <IPBLogo size={48} />
              <div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">IPB Logicore</div>
                <p className="text-gray-500 text-sm mt-1">Layanan bantuan untuk Mahasiswa</p>
                <p className="text-gray-500 text-sm">Departemen Ilmu Komputer</p>
              </div>
            </div>
            <img src="/beranda gambar.png" alt="Illustration" className="hidden sm:block w-32 sm:w-40 h-28 sm:h-36 object-contain flex-shrink-0" />
          </div>

          {/* Status Tiket */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="font-bold text-gray-900 mb-4">Status Tiket Saya</h2>
            <div className="space-y-3">
              {statusItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${item.color}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Help banner */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Info size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Butuh Bantuan?</p>
              <p className="text-sm text-gray-500">Buat tiket baru untuk menyampaikan pertanyaan atau Masalah Anda.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/tiket/baru')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap shadow-sm w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            Buka Tiket Baru
          </button>
        </div>
      </div>
    </div>
  );
}
