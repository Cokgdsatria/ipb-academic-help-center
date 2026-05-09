import { FileText, Clock, XCircle, FileCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';

const StatCard = ({ icon: Icon, iconBg, iconColor, label, count, change, changeColor }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon size={24} className={iconColor} />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-4xl font-bold text-gray-900 mt-0.5">{count}</p>
      </div>
    </div>
    <div className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}>
      <span>{count > 0 ? '↑ Aktif' : '-'}</span>
    </div>
  </div>
);

export default function BerandaDosen() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    total_tickets: 0,
    pending_tickets: 0,
    completed_tickets: 0,
    rejected_tickets: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Gunakan endpoint stats yang tersedia di service
        const data = await ticketService.getStats();
        setStats(data);
      } catch (error) {
        console.error("Gagal mengambil statistik dosen:", error);
      }
    };
    fetchStats();
  }, []);

  const statItems = [
    {
      icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
      label: 'Total Masuk', count: stats.total_tickets,
      changeColor: 'text-blue-600',
    },
    {
      icon: Clock, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600',
      label: 'Menunggu', count: stats.pending_tickets,
      changeColor: 'text-yellow-600',
    },
    {
      icon: FileCheck, iconBg: 'bg-green-50', iconColor: 'text-green-600',
      label: 'Selesai', count: stats.completed_tickets,
      changeColor: 'text-green-600',
    },
    {
      icon: XCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500',
      label: 'Ditolak', count: stats.rejected_tickets,
      changeColor: 'text-red-500',
    },
  ];

  // const stats = [
  //   {
  //     icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
  //     label: 'Total', count: statsData.total,
  //     change: '30% dari minggu lalu', changeColor: 'text-green-600',
  //   },
  //   {
  //     icon: Clock, iconBg: 'bg-yellow-50', iconColor: 'text-yellow-500',
  //     label: 'Menunggu', count: statsData.menunggu,
  //     change: '75% dari minggu lalu', changeColor: 'text-green-600',
  //   },
  //   {
  //     icon: CheckCircle, iconBg: 'bg-green-50', iconColor: 'text-green-600',
  //     label: 'Disetujui', count: statsData.disetujui,
  //     change: '42% dari minggu lalu', changeColor: 'text-green-600',
  //   },
  //   {
  //     icon: XCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500',
  //     label: 'Ditolak', count: statsData.ditolak,
  //     change: '24% dari minggu lalu', changeColor: 'text-red-500',
  //   },
  //   {
  //     icon: FileCheck, iconBg: 'bg-purple-50', iconColor: 'text-purple-600',
  //     label: 'Selesai', count: statsData.selesai,
  //     change: '30% dari minggu lalu', changeColor: 'text-green-600',
  //   },
  // ];


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="dosen" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat datang di IPB Academic Help Center
          </h1>
          <p className="text-xl font-semibold text-gray-700 mt-1">Halo, {user?.nama} 👋</p>
          <p className="text-base font-bold text-gray-800 mt-4">Dashboard Dosen</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-5 mb-5">
          {statItems.slice(0, 3).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 max-w-2xl">
          {statItems.slice(3).map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}
