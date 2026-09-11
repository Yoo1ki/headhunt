'use client';

import clsx from 'clsx';
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

type TooltipProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
  position?: TooltipPosition;
};

type Coordinates = {
  left: number;
  top: number;
  position: TooltipPosition;
};

const GAP = 10;
const VIEWPORT_PADDING = 8;

export const Tooltip = ({
  title,
  children,
  className,
  position = 'top',
}: TooltipProps) => {
  const generatedId = useId();
  const tooltipId = `tooltip-${generatedId.replaceAll(':', '')}`;
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current?.getBoundingClientRect();
    const tooltip = tooltipRef.current?.getBoundingClientRect();
    if (!trigger || !tooltip) return;

    const spaces: Record<TooltipPosition, number> = {
      top: trigger.top,
      right: window.innerWidth - trigger.right,
      bottom: window.innerHeight - trigger.bottom,
      left: trigger.left,
    };
    const required: Record<TooltipPosition, number> = {
      top: tooltip.height + GAP,
      right: tooltip.width + GAP,
      bottom: tooltip.height + GAP,
      left: tooltip.width + GAP,
    };
    const fallbackOrder: TooltipPosition[] = [
      position,
      position === 'top' ? 'bottom' : 'top',
      position === 'left' ? 'right' : 'left',
      position === 'right' ? 'left' : 'right',
    ];
    const resolvedPosition =
      fallbackOrder.find((side) => spaces[side] >= required[side]) ?? position;

    let left = trigger.left + trigger.width / 2 - tooltip.width / 2;
    let top = trigger.top - tooltip.height - GAP;

    if (resolvedPosition === 'bottom') top = trigger.bottom + GAP;
    if (resolvedPosition === 'left') {
      left = trigger.left - tooltip.width - GAP;
      top = trigger.top + trigger.height / 2 - tooltip.height / 2;
    }
    if (resolvedPosition === 'right') {
      left = trigger.right + GAP;
      top = trigger.top + trigger.height / 2 - tooltip.height / 2;
    }

    left = Math.min(
      Math.max(left, VIEWPORT_PADDING),
      window.innerWidth - tooltip.width - VIEWPORT_PADDING
    );
    top = Math.min(
      Math.max(top, VIEWPORT_PADDING),
      window.innerHeight - tooltip.height - VIEWPORT_PADDING
    );
    setCoordinates({ left, top, position: resolvedPosition });
  }, [position]);

  const show = () => {
    clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => setIsOpen(true), 120);
  };

  const hide = useCallback(() => {
    clearTimeout(openTimerRef.current);
    setIsOpen(false);
    setCoordinates(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hide, isOpen, updatePosition]);

  useEffect(
    () => () => {
      clearTimeout(openTimerRef.current);
    },
    []
  );

  const accessibleChild = isValidElement(children)
    ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
        'aria-describedby': tooltipId,
      })
    : children;

  return (
    <>
      <div
        ref={triggerRef}
        className={clsx('relative', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocusCapture={show}
        onBlurCapture={hide}
      >
        {accessibleChild}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={tooltipRef}
            id={tooltipId}
            role="tooltip"
            className={clsx(
              'pointer-events-none fixed z-100 max-w-64 rounded-lg bg-neutral-950/95 px-2.5 py-1.5 text-center text-xs leading-relaxed font-medium text-white shadow-xl shadow-black/40 backdrop-blur-md transition duration-150',
              coordinates
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-1 scale-95 opacity-0'
            )}
            style={{
              left: coordinates?.left ?? 0,
              top: coordinates?.top ?? 0,
            }}
          >
            {title}
            <span
              className={clsx(
                'absolute h-2 w-2 rotate-45 bg-neutral-950',
                coordinates?.position === 'top' &&
                  '-bottom-1 left-1/2 -translate-x-1/2',
                coordinates?.position === 'bottom' &&
                  '-top-1 left-1/2 -translate-x-1/2',
                coordinates?.position === 'left' &&
                  'top-1/2 -right-1 -translate-y-1/2',
                coordinates?.position === 'right' &&
                  'top-1/2 -left-1 -translate-y-1/2'
              )}
            />
          </div>,
          document.body
        )}
    </>
  );
};
