// ============================================================
// 📝 REQUEST FORM PAGE - Create/Edit Service Request
// ============================================================

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useServiceRequest from "../../hooks/useServiceRequest";
import { MOCK_SERVICES } from "../../utils/constants";
import LoadingSpinner from "../Common/LoadingSpinner";
import Alert from "../Common/Alert";
import type { User, ServiceRequest } from "../../types";

interface RequestFormPageProps {
  user: User | null;
}

const RequestFormPage: React.FC<RequestFormPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const { createRequest, updateRequest, fetchRequestById, isLoading, error } =
    useServiceRequest();

  const [isEditing, setIsEditing] = useState(!!requestId);
  const [formData, setFormData] = useState({
    serviceId: "",
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    attachments: [] as string[],
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");

  // Load existing request if editing
  useEffect(() => {
    if (requestId) {
      const loadRequest = async () => {
        const request = await fetchRequestById(requestId);
        if (request) {
          setFormData({
            serviceId: request.serviceId,
            title: request.title,
            description: request.description,
            priority: request.priority,
            attachments: request.attachments || [],
          });
        }
      };
      loadRequest();
    }
  }, [requestId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const validateForm = (): boolean => {
    if (!formData.serviceId) {
      setFormError("Pilih layanan terlebih dahulu");
      return false;
    }

    if (!formData.title.trim()) {
      setFormError("Judul tidak boleh kosong");
      return false;
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      setFormError("Deskripsi minimal 10 karakter");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user) {
      setFormError("User tidak ditemukan");
      return;
    }

    try {
      const service = MOCK_SERVICES.find((s) => s.id === formData.serviceId);

      if (!service) {
        setFormError("Layanan tidak ditemukan");
        return;
      }

      if (isEditing && requestId) {
        // Update
        const success = await updateRequest(requestId, {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
        } as Partial<ServiceRequest>);

        if (success) {
          setSuccessMessage("Pengajuan berhasil diperbarui!");
          setTimeout(() => {
            navigate(`/requests/${requestId}`);
          }, 2000);
        }
      } else {
        // Create
        const success = await createRequest({
          userId: user.id,
          serviceId: formData.serviceId,
          serviceName: service.name,
          title: formData.title,
          description: formData.description,
          category: service.category,
          status: "pending",
          priority: formData.priority,
          attachments: formData.attachments,
        });

        if (success) {
          setSuccessMessage(
            "Pengajuan berhasil dibuat! Anda akan diarahkan ke halaman pengajuan.",
          );
          setTimeout(() => {
            navigate("/requests");
          }, 2000);
        }
      }
    } catch (err) {
      setFormError("Terjadi kesalahan saat menyimpan pengajuan");
    }
  };

  if (!user || user.role !== "mahasiswa") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Alert
          type="error"
          message="Hanya mahasiswa yang dapat membuat atau mengedit pengajuan"
          autoClose={false}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <LoadingSpinner text="Memuat..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {isEditing ? "✏️ Edit Pengajuan" : "➕ Buat Pengajuan Baru"}
      </h1>

      {/* Messages */}
      <div className="space-y-4 mb-6">
        {successMessage && (
          <Alert type="success" message={successMessage} autoClose={false} />
        )}
        {error && <Alert type="error" message={error} autoClose={false} />}
        {formError && (
          <Alert type="error" message={formError} autoClose={false} />
        )}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Layanan Akademik <span className="text-red-500">*</span>
            </label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleInputChange}
              disabled={isEditing}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">-- Pilih Layanan --</option>
              {MOCK_SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Info */}
          {formData.serviceId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              {(() => {
                const service = MOCK_SERVICES.find(
                  (s) => s.id === formData.serviceId,
                );
                return (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Deskripsi:</strong> {service?.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Waktu Pemrosesan:</strong>{" "}
                      {service?.processingTime}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Dokumen Diperlukan:</strong>{" "}
                      {service?.requiredDocuments.join(", ")}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Judul <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukkan judul pengajuan"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Jelaskan alasan atau detail pengajuan Anda (minimal 10 karakter)"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length} / 500 karakter
            </p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Prioritas <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">🟢 Rendah</option>
              <option value="medium">🟡 Sedang</option>
              <option value="high">🔴 Tinggi</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>⚠️ Perhatian:</strong>{" "}
              {isEditing
                ? 'Anda hanya dapat mengedit pengajuan jika status masih "Menunggu".'
                : "Pastikan semua informasi sudah benar sebelum mengirimkan."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              {isEditing ? "Simpan Perubahan" : "Ajukan Pengajuan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestFormPage;
