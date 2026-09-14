'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import { useNotificationStore } from '@/store/useNotificationStore';

export const NotificationStatus = () => {
  const notification = useNotificationStore((state) => state.notification);
  const clear = useNotificationStore((state) => state.clear);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!notification) return;

    const showTimer = setTimeout(() => setShow(true), 0);
    const hideTimer = setTimeout(() => setShow(false), 3000);
    const clearTimer = setTimeout(() => clear(notification.id), 3300);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(clearTimer);
    };
  }, [clear, notification]);

  return (
    <div
      role="status"
      className={clsx(
        'fixed top-2 left-1/2 z-60 flex -translate-x-1/2 items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold transition-all duration-300 ease-out',
        notification?.type === 'error'
          ? 'bg-red-500 text-white/80'
          : 'bg-green-500 text-white/80',
        show && notification
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-full opacity-0'
      )}
    >
      {notification?.type === 'error' ? <FaX /> : <FaCheck />}
      {notification?.message}
    </div>
  );
};
