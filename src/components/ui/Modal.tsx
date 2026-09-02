'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

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
      if (e.key === 'Escape' && !disableClose) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, disableClose, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px]"
      onClick={() => {
        if (!disableClose) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center-safe overflow-y-auto p-2 lg:p-4">
        <div className="flex w-full max-w-xl flex-col">
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/98 p-4 shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close dialog"
              className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-white active:bg-white/15 active:text-white/70"
              onClick={() => {
                if (!disableClose) onClose();
              }}
            >
              ✕
            </button>
            <div className="flex flex-col gap-2">
              <h2 className="mr-8 text-xl font-bold">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
