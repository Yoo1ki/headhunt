'use client';

import { create } from 'zustand';

type NotificationType = 'success' | 'error';

type NotificationItem = {
  id: number;
  message: string;
  type: NotificationType;
};

type NotificationState = {
  notification: NotificationItem | null;
  notify: (message: string, type?: NotificationType) => void;
  clear: (id: number) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  notify: (message, type = 'success') =>
    set({ notification: { id: Date.now(), message, type } }),
  clear: (id) =>
    set((state) =>
      state.notification?.id === id ? { notification: null } : state
    ),
}));
