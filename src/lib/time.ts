export function getRemainingTime(
  endTime: number | string | Date,
  now = Date.now()
) {
  let end: number;

  if (typeof endTime === 'number') {
    end = endTime * 1000;
  } else {
    end = new Date(endTime).getTime();
  }

  const diff = end - now;

  if (diff <= 0) {
    return {
      expired: true,
      text: 'Ended',
      totalMs: 0,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const time = {
    days,
    hours,
    minutes,
    seconds,
  };

  return {
    expired: false,
    time,
    totalMs: diff,
  };
}
