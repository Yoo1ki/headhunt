import { getRemainingTime } from '@/lib/time';
import { useEffect, useState } from 'react';

export function useCountdown(endTime?: number | string | Date) {
  const [time, setTime] = useState(() =>
    endTime ? getRemainingTime(endTime) : null
  );

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      setTime(getRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return time;
}
