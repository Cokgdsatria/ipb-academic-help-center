import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, User, Download } from 'lucide-react';
import { ticketService } from '../services/ticketService';
import { useAuth } from '../context/AuthContext';

export default function DetailTiket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    if (!isoString) return '-';
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

  useEffect(() => {
    const loadTicketDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const found = await ticketService.getTicketById(id);
        if (!found) {
          setTicket(null);
          setError('Tiket tidak ditemukan atau Anda tidak punya akses.');
          return;
        }
        setTicket(found);
      } catch (err) {
        setError(err?.response?.data?.detail || 'Gagal memuat detail tiket.');
      } finally {
        setLoading(false);
      }
    };

    loadTicketDetail();
  }, [id]);

  const uiTicket = useMemo(() => {
    if (!ticket) return null;
    return {
      idLabel: `#${ticket.id}`,
      topikLabel: topikMap[String(ticket.topik)] || ticket.topik || '-',
      statusLabel: statusMap[ticket.status] || ticket.status || '-',
      createdAtLabel: formatDateTime(ticket.created_at),
      komentar: ticket.komentar_dosen
        ? [{
            nama: 'Dosen',
            tanggal: formatDateTime(ticket.created_at),
            isi: ticket.komentar_dosen,
          }]
        : [],
    };
  }, [ticket]);

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-gray-500">Memuat detail tiket...</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-transparent">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-gray-500">{error || 'Tiket tidak ditemukan.'}</p>
          <button
            onClick={() => navigate('/tiket')}
            className="mt-4 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-white bg-white"
          >
            Kembali ke daftar tiket
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back + Illustration */}
        <div className="flex items-start justify-between mb-4">
          <button
            onClick={() => navigate('/tiket')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-white bg-white shadow-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Kembali ke Daftar
          </button>
          <img src="/gambar_detailtiket.png" alt="Illustration" className="w-44 h-36 object-contain" />
        </div>

        {/* Ticket ID */}
        <p className="text-blue-600 font-bold text-lg mb-4">{uiTicket.idLabel}</p>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-100">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={26} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{ticket.subjek}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Dibuat pada: {uiTicket.createdAtLabel}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {uiTicket.topikLabel}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                  {uiTicket.statusLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-700 leading-relaxed">{ticket.deskripsi || '-'}</p>
          </div>

          {/* Attachment */}
          {ticket.file_name && ticket.file_data && (
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-blue-600">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{ticket.file_name}</p>
                  <p className="text-xs text-gray-500">Lampiran Pengajuan</p>
                </div>
              </div>
              <a
                href={ticket.file_data}
                download={ticket.file_name}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
              >
                <Download size={16} />
                Unduh
              </a>
            </div>
          )}

          {ticket.tanggal_bimbingan && (
            <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-sm text-blue-800">
                Tanggal Bimbingan: <span className="font-semibold">{ticket.tanggal_bimbingan}</span>
              </p>
            </div>
          )}
        </div>

        {/* Komentar dosen (sementara 1 komentar dari field komentar_dosen) */}
        {uiTicket.komentar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Komentar</h2>
            <div className="space-y-4">
              {uiTicket.komentar.map((k, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{k.nama}</p>
                      <p className="text-xs text-gray-400">{k.tanggal}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{k.isi}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
