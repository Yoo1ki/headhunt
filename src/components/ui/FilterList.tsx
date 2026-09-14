'use client';

import { useId, useRef } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';

type FilterListItem = {
  id: string;
  name: string;
};

type FilterListProps = {
  label: string;
  items: FilterListItem[];
  value: string[];
  onChange: (value: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
};

export const FilterList = ({
  label,
  items,
  value,
  onChange,
  isOpen,
  onToggle,
}: FilterListProps) => {
  const listId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggle = (id: string) => {
    onChange(
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id]
    );
  };

  return (
    <div
      className="relative min-w-0 rounded-xl bg-white/5"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.stopPropagation();
          onToggle();
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        <span className="min-w-0 truncate">{label}</span>
        <span className="flex shrink-0 items-center gap-2 text-xs text-white/45">
          {value.length > 0 && (
            <span className="rounded-full bg-yellow-400/20 px-1.5 py-0.5 text-yellow-200">
              {value.length}
            </span>
          )}
          <TiArrowSortedDown
            aria-hidden="true"
            className={`text-base transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      {isOpen && (
        <div
          id={listId}
          className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl bg-neutral-800 shadow-lg shadow-black/30"
        >
          <div className="flex max-h-64 flex-col gap-1 overflow-y-auto overscroll-contain p-2">
            {items.map((item) => (
              <label
                key={item.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <input
                  type="checkbox"
                  checked={value.includes(item.id)}
                  onChange={() => toggle(item.id)}
                  className="h-4 w-4 accent-yellow-400"
                />
                <span className="min-w-0 wrap-break-word capitalize">
                  {item.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
