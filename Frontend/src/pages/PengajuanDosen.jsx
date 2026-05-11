import { useEffect, useMemo, useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import Badge from '../components/Badge';
import ModalUpdateStatus from '../components/ModalUpdateStatus';
import ModalDetailPengajuan from '../components/ModalDetailPengajuan';
import { ticketService } from '../services/ticketService';

const statusTabs = ['Semua', 'Menunggu', 'Ditolak', 'Selesai'];

const iconColors = {
  Selesai: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  Menunggu: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  Ditolak: { bg: 'bg-red-50', icon: 'text-red-600' },
  Diproses: { bg: 'bg-blue-50', icon: 'text-blue-600' },
};

export default function PengajuanDosen() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    total_tickets: 0,
    pending_tickets: 0,
    completed_tickets: 0,
    rejected_tickets: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalUpdate, setModalUpdate] = useState(null);
  const [modalDetail, setModalDetail] = useState(null);

  const topikMap = {
    '1': 'Pengajuan Surat',
    '2': 'Pengajuan Bimbingan',
    '3': 'Pengajuan Akademik',
  };

  const statusMapToUi = {
    PENDING: 'Menunggu',
    RESOLVED: 'Selesai',
    REJECTED: 'Ditolak',
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '-';
    try {
      return new Date(isoString).toLocaleString('id-ID', {
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

  const loadDosenTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const [ticketData, statsData] = await Promise.all([
        ticketService.getMyTickets(),
        ticketService.getStats(),
      ]);
      setTickets(ticketData);
      setStats(statsData);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Gagal memuat daftar pengajuan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDosenTickets();
  }, []);

  const statusCounts = {
    Semua: stats.total_tickets,
    Menunggu: stats.pending_tickets,
    Ditolak: stats.rejected_tickets,
    Selesai: stats.completed_tickets,
  };

  const normalizedTickets = useMemo(() => {
    return tickets.map((ticket) => ({
      ...ticket,
      subject: ticket.subjek,
      mahasiswa: ticket.mahasiswa_nama || `Mahasiswa #${ticket.mahasiswa_id || ''}`,
      tanggal: formatDateTime(ticket.created_at),
      statusLabel: statusMapToUi[ticket.status] || ticket.status,
      komentar: ticket.komentar_dosen
        ? [{
            nama: 'Dosen',
            tanggal: formatDateTime(ticket.created_at),
            isi: ticket.komentar_dosen,
          }]
        : [],
      topikLabel: topikMap[String(ticket.topik)] || ticket.topik || '-',
    }));
  }, [tickets]);

  const filtered = activeTab === 'Semua'
    ? normalizedTickets
    : normalizedTickets.filter((t) => t.statusLabel === activeTab);

  const handleSaveStatus = async (ticket, { status, komentar }) => {
    try {
      await ticketService.updateTicketStatus(ticket.id, {
        status,
        komentar_dosen: komentar || null,
      });
      await loadDosenTickets();
    } catch (err) {
      alert(err?.response?.data?.detail || 'Gagal memperbarui status pengajuan.');
    }
  };

  const handleOpenDetail = async (ticket) => {
    try {
      const detail = await ticketService.getTicketById(ticket.id);
      setModalDetail(detail);
    } catch (err) {
      alert(err?.response?.data?.detail || 'Gagal memuat detail pengajuan.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pengajuan</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola semua pengajuan</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                activeTab === tab
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab} ({statusCounts[tab]})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {loading && (
            <div className="text-center py-8 text-sm text-gray-500">
              Memuat pengajuan...
            </div>
          )}
          {!loading && filtered.map((ticket) => {
            const colors = iconColors[ticket.statusLabel] || iconColors.Selesai;
            return (
              <div key={ticket.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <FileText size={22} className={colors.icon} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{ticket.subject}</h3>
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700">
                          {ticket.topikLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>Diajukan oleh</span>
                        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${colors.bg} ${colors.icon}`}>
                          {ticket.mahasiswa}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar size={13} />
                        <span>{ticket.tanggal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 pl-0 sm:pl-0">
                    <Badge status={ticket.statusLabel} />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDetail(ticket)}
                        className="px-3 sm:px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => setModalUpdate(ticket)}
                        className="px-3 sm:px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              Tidak ada pengajuan dengan status ini.
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modalUpdate && (
        <ModalUpdateStatus
          ticket={modalUpdate}
          onClose={() => setModalUpdate(null)}
          onSave={(data) => handleSaveStatus(modalUpdate, data)}
        />
      )}
      {modalDetail && (
        <ModalDetailPengajuan
          ticket={modalDetail}
          onClose={() => setModalDetail(null)}
          onUpdateStatus={() => {
            setModalUpdate(modalDetail);
            setModalDetail(null);
          }}
        />
      )}
    </div>
  );
}
