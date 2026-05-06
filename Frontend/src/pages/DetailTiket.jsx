import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, User } from 'lucide-react';
import Navbar from '../components/Navbar';
import { dummyTickets } from '../data/dummy';

export default function DetailTiket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticket = dummyTickets.find((t) => t.id === `#${id}`);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar role="mahasiswa" />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-gray-500">Tiket tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="mahasiswa" />
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
        <p className="text-blue-600 font-bold text-lg mb-4">{ticket.id}</p>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5 pb-5 border-b border-gray-100">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText size={26} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{ticket.subject}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Dibuat pada: {ticket.tanggal}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-sm text-gray-700 leading-relaxed">{ticket.deskripsi}</p>
          </div>
        </div>

        {/* Comments */}
        {ticket.komentar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 mb-4">Komentar</h2>
            <div className="space-y-4">
              {ticket.komentar.map((k, i) => (
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
