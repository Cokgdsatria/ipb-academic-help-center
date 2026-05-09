import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, RefreshCw, Plus, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import { ticketService } from '../services/ticketService';

export default function TiketPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const topikMap = {
    '1': 'Pengajuan Surat',
    '2': 'Pengajuan Bimbingan',
    '3': 'Pengajuan Akademik',
  };

  const statusMap = {
    PENDING: 'Menunggu',
    RESOLVED: 'Selesai',
    REJECTED: 'Ditolak',
  };

  const formatDateTime = (isoString) => {
    try {
      const dt = new Date(isoString);
      return dt.toLocaleString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '-';
    }
  };

  const loadTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ticketService.getMyTickets();
      setTickets(data);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Gagal memuat riwayat tiket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const filtered = useMemo(() => {
    const normalized = tickets.map((t) => {
      const topikLabel = topikMap[String(t.topik)] || t.topik || '-';
      const statusLabel = statusMap[t.status] || t.status;
      const ticketIdLabel = `#${t.id}`;
      return {
        ...t,
        idLabel: ticketIdLabel,
        topikLabel,
        statusLabel,
        tanggalLabel: formatDateTime(t.created_at),
      };
    });

    return normalized.filter((t) => {
      const matchSearch =
        t.idLabel.toLowerCase().includes(search.toLowerCase()) ||
        t.topikLabel.toLowerCase().includes(search.toLowerCase()) ||
        (t.subjek || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'Semua Status' || t.statusLabel === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [tickets, search, statusFilter]);

  const statusOptions = ['Semua Status', 'Menunggu', 'Diproses', 'Selesai', 'Ditolak'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="mahasiswa" />
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            placeholder="Cari Tiket"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-4 pr-12 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter */}
        <div className="relative mb-5">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none px-5 py-4 pr-10 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          >
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {loading ? 'Memuat...' : `Total tiket: ${tickets.length}`}
            </span>
            <button
              onClick={loadTickets}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 bg-white transition-colors"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
          <button
            onClick={() => navigate('/tiket/baru')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
          >
            <Plus size={16} />
            Buka Tiket Baru
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">No</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">ID Tiket</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Topik Bantuan</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Tanggal Dibuat</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-bold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket, index) => (
                <tr key={ticket.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/tiket/${ticket.id}`)}>
                    {ticket.idLabel}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{ticket.topikLabel}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{ticket.tanggalLabel}</td>
                  <td className="px-6 py-4">
                    <Badge status={ticket.statusLabel} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/tiket/${ticket.id}`)}
                      className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Lihat
                    </button>
                  </td>
                </tr>
              ))}
              {!loading && error && (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-sm text-red-500">
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">
                    Tidak ada tiket ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
