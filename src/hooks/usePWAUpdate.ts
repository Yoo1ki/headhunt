import { useEffect, useState } from 'react';

export function usePWAUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg);

      // sudah ada update
      if (reg.waiting) {
        setUpdateAvailable(true);
      }

      // detect update baru
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;

        newWorker?.addEventListener('statechange', () => {
          if (
            newWorker.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            setUpdateAvailable(true);
          }
        });
      });
    });
  }, []);

  const updateApp = () => {
    registration?.waiting?.postMessage({ type: 'SKIP_WAITING' });
  };

  return { updateAvailable, updateApp };
}
