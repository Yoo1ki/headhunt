import React from 'react';

type TooltipProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

export const Tooltip = ({
  title,
  children,
  className,
  position = 'right',
}: TooltipProps) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };

  const arrowClasses = {
    top: 'absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-600',
    right:
      'absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-600',
    bottom:
      'absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-neutral-600',
    left: 'absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-neutral-600',
  };

  return (
    <div
      className={`group/tooltip relative ${className}`}
      aria-describedby={`tooltip-${title}`}
    >
      {children}

      <div
        id={`tooltip-${title}`}
        role="tooltip"
        className={`pointer-events-none absolute ${positionClasses[position]} z-50 scale-95 opacity-0 transition-all duration-150 ease-out group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100`}
      >
        <div className="relative max-w-xs rounded-md bg-neutral-600 px-2 py-1 text-center text-xs wrap-break-word text-white shadow">
          {title}
          <div className={arrowClasses[position]}></div>
        </div>
      </div>
    </div>
  );
};
