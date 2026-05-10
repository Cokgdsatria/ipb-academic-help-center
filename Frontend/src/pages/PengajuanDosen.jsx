import { useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Badge from '../components/Badge';
import ModalUpdateStatus from '../components/ModalUpdateStatus';
import ModalDetailPengajuan from '../components/ModalDetailPengajuan';
import { dummyTickets } from '../data/dummy';

const statusTabs = ['Semua', 'Menunggu', 'Disetujui', 'Ditolak', 'Selesai'];

const statusCounts = {
  Semua: 124,
  Menunggu: 39,
  Disetujui: 81,
  Ditolak: 52,
  Selesai: 93,
};

const iconColors = {
  Selesai: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  Disetujui: { bg: 'bg-green-50', icon: 'text-green-600' },
  Menunggu: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  Ditolak: { bg: 'bg-red-50', icon: 'text-red-600' },
  Diproses: { bg: 'bg-blue-50', icon: 'text-blue-600' },
};

export default function PengajuanDosen() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [tickets, setTickets] = useState(dummyTickets);
  const [modalUpdate, setModalUpdate] = useState(null);
  const [modalDetail, setModalDetail] = useState(null);

  const filtered = activeTab === 'Semua' ? tickets : tickets.filter((t) => t.status === activeTab);

  const handleSaveStatus = (ticket, { status, komentar }) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticket.id) return t;
        const newKomentar = komentar
          ? [
              ...t.komentar,
              {
                nama: 'Dr. Budi Santoso',
                tanggal: new Date().toLocaleDateString('id-ID', {
                  day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                }),
                isi: komentar,
              },
            ]
          : t.komentar;
        return { ...t, status, komentar: newKomentar };
      })
    );
  };

  return (
    <div className="min-h-screen bg-transparent">

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Pengajuan</h1>
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
          {filtered.map((ticket) => {
            const colors = iconColors[ticket.status] || iconColors.Selesai;
            return (
              <div key={ticket.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <FileText size={26} className={colors.icon} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-gray-900">{ticket.subject}</h3>
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
                  <div className="flex flex-col items-end gap-3">
                    <Badge status={ticket.status} />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalDetail(ticket)}
                        className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => setModalUpdate(ticket)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
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
