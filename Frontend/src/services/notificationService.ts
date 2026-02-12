// ============================================================
// 🔔 NOTIFICATION SERVICE - Notification Management
// ============================================================

import type { Notification, ApiResponse } from "../types";

// Simulated notifications database
let mockNotifications: Notification[] = [
  {
    id: "notif-001",
    userId: "mhs-001",
    title: "Pengajuan Diterima",
    message:
      "Pengajuan Surat Aktif Kuliah Anda telah diterima dan sedang diproses",
    type: "success",
    relatedRequestId: "REQ-001",
    isRead: true,
    createdAt: new Date("2025-02-02"),
  },
  {
    id: "notif-002",
    userId: "mhs-001",
    title: "Update Status Pengajuan",
    message: 'Status pengajuan Cuti Akademik Anda berubah menjadi "Diproses"',
    type: "info",
    relatedRequestId: "REQ-002",
    isRead: false,
    createdAt: new Date("2025-02-08"),
  },
];

class NotificationService {
  /**
   * Get all notifications for user
   */
  async getNotifications(
    userId: string,
    unreadOnly: boolean = false,
  ): Promise<ApiResponse<Notification[]>> {
    const notifications = mockNotifications.filter((n) => n.userId === userId);

    const filtered = unreadOnly
      ? notifications.filter((n) => !n.isRead)
      : notifications;

    // Sort by date, newest first
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return {
      success: true,
      data: filtered,
      message: `${filtered.length} notifikasi ditemukan`,
    };
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<ApiResponse<Notification>> {
    const notifIndex = mockNotifications.findIndex(
      (n) => n.id === notificationId,
    );

    if (notifIndex === -1) {
      return {
        success: false,
        message: "Notifikasi tidak ditemukan",
        errors: ["Notification not found"],
      };
    }

    mockNotifications[notifIndex].isRead = true;

    return {
      success: true,
      data: mockNotifications[notifIndex],
      message: "Notifikasi ditandai sebagai dibaca",
    };
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(userId: string): Promise<ApiResponse<number>> {
    let count = 0;

    mockNotifications = mockNotifications.map((n) => {
      if (n.userId === userId && !n.isRead) {
        count++;
        return { ...n, isRead: true };
      }
      return n;
    });

    return {
      success: true,
      data: count,
      message: `${count} notifikasi ditandai sebagai dibaca`,
    };
  }

  /**
   * Create new notification
   */
  async createNotification(
    notification: Omit<Notification, "id" | "createdAt">,
  ): Promise<ApiResponse<Notification>> {
    const newNotif: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date(),
    };

    mockNotifications.push(newNotif);

    return {
      success: true,
      data: newNotif,
      message: "Notifikasi berhasil dibuat",
    };
  }

  /**
   * Delete notification
   */
  async deleteNotification(notificationId: string): Promise<ApiResponse<null>> {
    const index = mockNotifications.findIndex((n) => n.id === notificationId);

    if (index === -1) {
      return {
        success: false,
        message: "Notifikasi tidak ditemukan",
        errors: ["Notification not found"],
      };
    }

    mockNotifications.splice(index, 1);

    return {
      success: true,
      message: "Notifikasi berhasil dihapus",
    };
  }

  /**
   * Get unread count
   */
  async getUnreadCount(userId: string): Promise<ApiResponse<number>> {
    const count = mockNotifications.filter(
      (n) => n.userId === userId && !n.isRead,
    ).length;

    return {
      success: true,
      data: count,
      message: "Unread count retrieved",
    };
  }
}

export default new NotificationService();
