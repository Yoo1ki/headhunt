"use client";

import { usePWAUpdate } from "@/hooks/usePWAUpdate";
import { useSWReload } from "@/hooks/useSWReload";

export default function PWAUpdateToast() {
  const { updateAvailable, updateApp } = usePWAUpdate();
  useSWReload();

  if (!updateAvailable) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        background: "#111",
        color: "#fff",
        padding: "12px 16px",
        borderRadius: 10,
        zIndex: 9999,
      }}
    >
      <p>Ada update baru 🚀</p>
      <button onClick={updateApp}>Update sekarang</button>
    </div>
  );
}
