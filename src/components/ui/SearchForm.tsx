"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

type SearchFormProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const SearchForm = ({
  placeholder = "Cari Karakter...",
  value,
  onChange,
}: SearchFormProps) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <div className="relative group lg:w-fit w-full">
      <input
        type="text"
        className="rounded-xl py-2 px-10 w-full bg-white/10 hover:bg-white/15 focus:ring-yellow-400 focus:ring-2 focus:bg-white/15 outline-none placeholder-white/60"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />

      {value && (
        <button
          type="button"
          className="absolute top-0 right-0 mt-2 mr-2 p-1"
          onClick={() => onChange("")}
        >
          <FaTimes className="text-white/60" />
        </button>
      )}

      <div className="absolute top-0 left-0 mt-3 ml-3">
        <FaSearch className="text-white/60 group-focus-within:text-white/80" />
      </div>
    </div>
  );
};
