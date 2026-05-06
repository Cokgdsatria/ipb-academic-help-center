import { useNavigate } from 'react-router-dom';
import { Info, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import IPBLogo from '../components/IPBLogo';

export default function BerandaMahasiswa() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const statusItems = [
    { label: 'Total Tiket', count: 3, color: 'bg-blue-100 text-blue-700' },
    { label: 'Menunggu', count: 1, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Diproses', count: 0, color: 'bg-blue-100 text-blue-600' },
    { label: 'Selesai', count: 1, color: 'bg-green-100 text-green-700' },
    { label: 'Ditolak', count: 2, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="mahasiswa" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Greeting */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat datang, {user?.nama} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">Di IPB Logicore Help Center</p>
        </div>

        {/* Main section: card + status */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Info card */}
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <IPBLogo size={56} />
              <div>
                <div className="text-xl font-bold text-gray-900">IPB Logicore</div>
                <p className="text-gray-500 text-sm mt-1">Layanan bantuan untuk Mahasiswa</p>
                <p className="text-gray-500 text-sm mt-1">Departemen Ilmu Komputer</p>
              </div>
            </div>
            <img src="/beranda gambar.png" alt="Illustration" className="w-40 h-36 object-contain" />
          </div>

          {/* Status Tiket */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-between">
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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap ml-6 shadow-sm"
          >
            <Plus size={18} />
            Buka Tiket Baru
          </button>
        </div>
      </div>
    </div>
  );
}
