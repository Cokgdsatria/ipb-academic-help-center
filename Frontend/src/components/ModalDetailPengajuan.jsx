import { FileText, Calendar, User, Download, File } from 'lucide-react';

export default function ModalDetailPengajuan({ ticket, onClose, onUpdateStatus }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/30 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto my-auto">
        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Detail Pengajuan</h2>

          {/* Ticket info */}
          <div className="border border-gray-100 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{ticket.subject}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                  <span>Diajukan oleh</span>
                  <span className="text-blue-600 font-semibold text-xs">{ticket.mahasiswa}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  <span>{ticket.tanggal}</span>
                </div>
              </div>
            </div>
            <hr className="border-gray-100 mb-3" />
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-2">Isi Pengajuan</p>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{ticket.deskripsi}</p>
              </div>
            </div>

            {/* Files Section */}
            {ticket.files && ticket.files.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-800 mb-2">File yang Disertakan</p>
                <div className="space-y-2">
                  {ticket.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <File size={18} className="text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-700 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {file.size}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Simulasi membuka file
                          alert(`Membuka file: ${file.name}`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex-shrink-0 ml-2"
                      >
                        <Download size={14} />
                        <span>Buka</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto"
            >
              Tutup
            </button>
            <button
              onClick={onUpdateStatus}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-sm w-full sm:w-auto"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
