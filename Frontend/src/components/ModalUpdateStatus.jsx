import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

export default function ModalUpdateStatus({ ticket, onClose, onSave }) {
  const [status, setStatus] = useState('Selesai');
  const [komentar, setKomentar] = useState('');

  const handleSave = () => {
    onSave({ status, komentar });
    onClose();
  };

  const statusOptions = ['Selesai', 'Disetujui', 'Ditolak'];

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto my-auto">
        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Update Status Pengajuan</h2>

          {/* Status dropdown */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Komentar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Komentar</label>
            <div className="relative">
              <textarea
                value={komentar}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setKomentar(e.target.value);
                }}
                placeholder="Tambahkan Komentar"
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <span className="absolute bottom-3 right-3 text-xs text-gray-400">
                {komentar.length}/500
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm w-full sm:w-auto"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
