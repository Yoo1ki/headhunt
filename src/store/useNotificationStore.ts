'use client';

import { create } from 'zustand';

type NotificationType = 'success' | 'error';

type NotificationItem = {
  id: number;
  title?: string;
  message: string;
  type: NotificationType;
  duration: number;
};

type NotificationOptions = {
  title?: string;
  duration?: number;
};

type NotificationState = {
  notification: NotificationItem | null;
  notify: (
    message: string,
    type?: NotificationType,
    options?: NotificationOptions
  ) => void;
  clear: (id: number) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notification: null,
  notify: (message, type = 'success', options = {}) =>
    set({
      notification: {
        id: Date.now(),
        title: options.title,
        message,
        type,
        duration: options.duration ?? 3000,
      },
    }),
  clear: (id) =>
    set((state) =>
      state.notification?.id === id ? { notification: null } : state
    ),
}));
