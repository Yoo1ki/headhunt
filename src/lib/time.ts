export function getRemainingTime(endTime: number | string | Date) {
  const now = Date.now();

  let end: number;

  if (typeof endTime === "number") {
    // UNIX timestamp (detik → ms)
    end = endTime * 1000;
  } else {
    end = new Date(endTime).getTime();
  }

  const diff = end - now;

  if (diff <= 0) {
    return {
      expired: true,
      text: "Ended",
      totalMs: 0,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const text = [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    `${seconds}s`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    expired: false,
    text,
    totalMs: diff,
  };
}
