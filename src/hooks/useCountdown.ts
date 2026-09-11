import { getRemainingTime } from '@/lib/time';
import { useEffect, useState } from 'react';

export function useCountdown(
  endTime?: number | string | Date,
  initialNow?: number
) {
  const [time, setTime] = useState(() =>
    endTime !== undefined ? getRemainingTime(endTime, initialNow) : null
  );

  useEffect(() => {
    if (endTime === undefined) {
      setTime(null);
      return;
    }

    setTime(getRemainingTime(endTime));

    const interval = setInterval(() => {
      setTime(getRemainingTime(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return time;
}
