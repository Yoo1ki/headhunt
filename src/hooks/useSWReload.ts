import { useEffect } from 'react';

export function useSWReload() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handler = () => window.location.reload();

    navigator.serviceWorker.addEventListener('controllerchange', handler);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handler);
    };
  }, []);
}
