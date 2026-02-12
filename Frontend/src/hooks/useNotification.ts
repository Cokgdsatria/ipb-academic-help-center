// ============================================================
// 🪝 useNotification HOOK - Notification Management Hook
// ============================================================

import { useState, useCallback, useEffect } from "react";
import type { Notification } from "../types";
import notificationService from "../services/notificationService";

interface UseNotificationReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  fetchNotifications: (userId: string, unreadOnly?: boolean) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<boolean>;
  markAllAsRead: (userId: string) => Promise<boolean>;
  getUnreadCount: (userId: string) => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<boolean>;

  clearError: () => void;
}

export const useNotification = (): UseNotificationReturn => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(
    async (userId: string, unreadOnly: boolean = false) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await notificationService.getNotifications(
          userId,
          unreadOnly,
        );

        if (!response.success) {
          setError(response.message || "Gagal mengambil notifikasi");
          return;
        }

        setNotifications(response.data || []);

        // Update unread count
        const unread = (response.data || []).filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getUnreadCount = useCallback(async (userId: string) => {
    try {
      const response = await notificationService.getUnreadCount(userId);

      if (response.success) {
        setUnreadCount(response.data || 0);
      }
    } catch (err) {
      console.error("Error getting unread count:", err);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    setError(null);

    try {
      const response = await notificationService.markAsRead(notificationId);

      if (!response.success) {
        setError(response.message || "Gagal menandai notifikasi");
        return false;
      }

      // Update notifications list
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
      );

      // Decrease unread count
      setUnreadCount((prev) => Math.max(0, prev - 1));

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      return false;
    }
  }, []);

  const markAllAsRead = useCallback(async (userId: string) => {
    setError(null);

    try {
      const response = await notificationService.markAllAsRead(userId);

      if (!response.success) {
        setError(response.message || "Gagal menandai notifikasi");
        return false;
      }

      // Update all notifications
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

      // Reset unread count
      setUnreadCount(0);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
      return false;
    }
  }, []);

  const deleteNotification = useCallback(
    async (notificationId: string) => {
      setError(null);

      try {
        const response =
          await notificationService.deleteNotification(notificationId);

        if (!response.success) {
          setError(response.message || "Gagal menghapus notifikasi");
          return false;
        }

        // Remove from list
        const deletedNotif = notifications.find((n) => n.id === notificationId);
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

        // Decrease unread count if was unread
        if (deletedNotif && !deletedNotif.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }

        return true;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Terjadi kesalahan";
        setError(errorMessage);
        return false;
      }
    },
    [notifications],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    getUnreadCount,
    deleteNotification,
    clearError,
  };
};

export default useNotification;
