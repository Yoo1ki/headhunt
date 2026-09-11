'use client';

import type { ReactNode } from 'react';
import { useEffect, useId } from 'react';
import { FaXmark } from 'react-icons/fa6';

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
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !disableClose) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, disableClose, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      onClick={() => {
        if (!disableClose) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-panel flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-xl bg-neutral-900 sm:max-h-[calc(100dvh-3rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 bg-neutral-800/70 px-4 py-3 sm:px-5 sm:py-4">
          <h2
            id={titleId}
            className="min-w-0 text-lg leading-snug font-semibold break-words text-white sm:text-xl"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            disabled={disableClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-lg text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-yellow-400 active:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => {
              if (!disableClose) onClose();
            }}
          >
            <FaXmark />
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
};
