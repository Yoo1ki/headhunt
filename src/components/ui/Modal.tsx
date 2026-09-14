'use client';

import type { ReactNode } from 'react';
import { useCallback, useEffect, useId, useRef } from 'react';
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
  const onCloseRef = useRef(onClose);
  const disableCloseRef = useRef(disableClose);

  onCloseRef.current = onClose;
  disableCloseRef.current = disableClose;

  const requestClose = useCallback(() => {
    if (disableCloseRef.current) return;

    if (window.history.state?.headhuntModal === titleId) {
      window.history.back();
    } else {
      onCloseRef.current();
    }
  }, [titleId]);

  useEffect(() => {
    if (!isOpen) return;

    let closedByHistory = false;

    const currentHistoryState = window.history.state;
    window.history.pushState(
      {
        ...(typeof currentHistoryState === 'object' && currentHistoryState
          ? currentHistoryState
          : {}),
        headhuntModal: titleId,
      },
      '',
      window.location.href
    );

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };

    const handlePopState = () => {
      if (disableCloseRef.current) {
        window.history.pushState(
          { ...window.history.state, headhuntModal: titleId },
          '',
          window.location.href
        );
        return;
      }

      closedByHistory = true;
      onCloseRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('popstate', handlePopState);

      if (!closedByHistory && window.history.state?.headhuntModal === titleId) {
        window.history.back();
      }
    };
  }, [isOpen, requestClose, titleId]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-xs sm:p-6"
      onClick={requestClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-panel flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-hidden rounded-xl bg-neutral-900 sm:max-h-[calc(100dvh-3rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 bg-neutral-800/70 px-4 py-2 sm:px-5">
          <h2
            id={titleId}
            className="min-w-0 text-lg leading-snug font-semibold wrap-break-word text-white sm:text-xl"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label="Close dialog"
            disabled={disableClose}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-lg text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-yellow-400 active:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={requestClose}
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
