"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
  title: string;
  isOpen: boolean;
  disableClose?: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({
  title,
  isOpen,
  disableClose = false,
  onClose,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !disableClose) {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, disableClose, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={() => {
        if (!disableClose) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 flex flex-col justify-center-safe items-center overflow-y-auto p-2 lg:p-4">
        <div className="flex flex-col w-full max-w-xl">
          <div
            className="relative overflow-hidden bg-neutral-800/90 rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 rounded-bl-xl bg-neutral-300 hover:bg-neutral-200 active:bg-neutral-400 text-neutral-700 hover:text-red-500 active:text-red-500/60 text-sm font-semibold px-2 py-1 cursor-pointer"
              onClick={() => {
                if (!disableClose) onClose();
              }}
            >
              ✕
            </button>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold mr-8">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
