'use client';

import { FaSearch, FaTimes } from 'react-icons/fa';

type SearchFormProps = {
  placeholder?: string;
  ariaLabel?: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchForm = ({
  placeholder = 'Cari Karakter...',
  ariaLabel = 'Search',
  value,
  onChange,
}: SearchFormProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="group relative w-full sm:min-w-64 lg:w-72">
      <input
        type="text"
        aria-label={ariaLabel}
        className="w-full rounded-xl bg-white/5 px-10 py-2.5 text-sm text-white placeholder-white/40 transition-colors outline-none hover:bg-white/10 focus:bg-white/10 focus:ring-2 focus:ring-yellow-400/70"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-1.5 text-white/45 transition-colors hover:bg-white/10 hover:text-white"
          onClick={() => onChange('')}
        >
          <FaTimes className="text-white/60" />
        </button>
      )}

      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <FaSearch className="text-white/60 group-focus-within:text-white/80" />
      </div>
    </div>
  );
};
