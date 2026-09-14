import type { ReactNode } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

type EmptyFilterStateProps = {
  title: string;
  children?: ReactNode;
  compact?: boolean;
};

export const EmptyFilterState = ({
  title,
  children,
  compact = false,
}: EmptyFilterStateProps) => (
  <div
    role="status"
    className={`flex flex-col items-center justify-center rounded-xl bg-neutral-800/80 px-5 text-center ${compact ? 'min-h-48 py-8' : 'min-h-72 py-10'}`}
  >
    <div className="grid size-12 place-items-center text-2xl text-yellow-300">
      <FaMagnifyingGlass aria-hidden="true" />
    </div>
    <h2 className="mt-4 text-base font-semibold text-white/85 sm:text-lg">
      {title}
    </h2>
    {children && (
      <div className="mt-4 flex flex-wrap justify-center gap-2">{children}</div>
    )}
  </div>
);
