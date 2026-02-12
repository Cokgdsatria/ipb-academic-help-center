// ============================================================
// 📋 REQUEST LIST PAGE - View, Filter, and Manage Requests
// ============================================================

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useServiceRequest from "../../hooks/useServiceRequest";
import LoadingSpinner from "../Common/LoadingSpinner";
import Alert from "../Common/Alert";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "../../utils/constants";
import { formatDate } from "../../utils/helpers";
import type { User, RequestStatus } from "../../types";

interface RequestListPageProps {
  user: User | null;
}

const RequestListPage: React.FC<RequestListPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const {
    requests,
    isLoading,
    error,
    fetchUserRequests,
    fetchAllRequests,
    deleteRequest,
    updateRequestStatus,
    clearError,
  } = useServiceRequest();

  const [statusFilter, setStatusFilter] = useState<RequestStatus | "all">(
    "all",
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<RequestStatus>("pending");
  const [updateNotes, setUpdateNotes] = useState("");

  // Load requests on component mount
  useEffect(() => {
    if (!user?.id) return;

    if (user.role === "mahasiswa") {
      fetchUserRequests(user.id);
    } else {
      fetchAllRequests(1, statusFilter === "all" ? undefined : statusFilter);
    }
  }, [user, statusFilter]);

  // Filter requests
  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((r) => r.status === statusFilter);

  const handleDelete = async (requestId: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Apakah Anda yakin ingin menghapus pengajuan ini?")) return;

    const success = await deleteRequest(requestId);
    if (success) {
      setSuccessMessage("Pengajuan berhasil dihapus");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedRequest) return;

    const success = await updateRequestStatus(
      selectedRequest,
      updateStatus,
      updateNotes,
      user?.id,
    );

    if (success) {
      setSuccessMessage("Status pengajuan berhasil diperbarui");
      setShowUpdateModal(false);
      setSelectedRequest(null);
      setUpdateNotes("");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <Alert type="error" message="User tidak ditemukan" autoClose={false} />
      </div>
    );
  }

  if (isLoading && requests.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <LoadingSpinner text="Memuat pengajuan..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📋 Pengajuan</h1>
          <p className="text-gray-600 mt-1">
            {user.role === "mahasiswa"
              ? "Kelola pengajuan Anda"
              : "Kelola semua pengajuan"}
          </p>
        </div>

        {user.role === "mahasiswa" && (
          <Link
            to="/requests/new"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            ➕ Ajukan Baru
          </Link>
        )}
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="mb-4">
          <Alert type="success" message={successMessage} autoClose={false} />
        </div>
      )}
      {error && (
        <div className="mb-4">
          <Alert type="error" message={error} autoClose={false} />
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setStatusFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
            statusFilter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Semua ({requests.length})
        </button>

        {Object.entries(STATUS_CONFIG).map(([status, config]) => {
          const count = requests.filter((r) => r.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status as RequestStatus)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                statusFilter === status
                  ? config.color
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {config.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Requests Table/List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">📭 Belum ada pengajuan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
            >
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/requests/${request.id}`}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-700 break-words"
                    >
                      {request.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.serviceName}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[request.status].color} whitespace-nowrap`}
                  >
                    {STATUS_CONFIG[request.status].label}
                  </span>
                </div>

                {/* Description Preview */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {request.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500 mb-4">
                  <span>🆔 {request.id}</span>
                  <span>📅 {formatDate(request.createdAt)}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${PRIORITY_CONFIG[request.priority].color}`}
                  >
                    {PRIORITY_CONFIG[request.priority].label}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Link
                    to={`/requests/${request.id}`}
                    className="px-3 py-1 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                  >
                    👁️ Lihat Detail
                  </Link>

                  {user.role === "mahasiswa" &&
                    request.status === "pending" && (
                      <>
                        <Link
                          to={`/requests/${request.id}/edit`}
                          className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                        >
                          🗑️ Hapus
                        </button>
                      </>
                    )}

                  {(user.role === "admin" || user.role === "dosen") && (
                    <button
                      onClick={() => {
                        setSelectedRequest(request.id);
                        setUpdateStatus(request.status);
                        setShowUpdateModal(true);
                      }}
                      className="px-3 py-1 text-sm rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
                    >
                      🔄 Update Status
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Status Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              🔄 Update Status Pengajuan
            </h2>

            <div className="space-y-4">
              {/* Status Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status
                </label>
                <select
                  value={updateStatus}
                  onChange={(e) =>
                    setUpdateStatus(e.target.value as RequestStatus)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <option key={status} value={status}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Catatan
                </label>
                <textarea
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Tambahkan catatan (opsional)"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestListPage;
