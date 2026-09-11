'use client';

import { Tooltip } from './Tooltip';
import { FaCheck } from 'react-icons/fa6';
import clsx from 'clsx';
import { CloudflareImage } from '../shared/CloudflareImage';

type FilterItem = {
  id: string;
  name: string;
  icon?: string;
  color: string;
};

type FilterProps = {
  data: FilterItem[];
  value: string[];
  onChange: (filters: string[]) => void;
};

type FilterCardProps = {
  item: FilterItem;
  selected: boolean;
  onClick: (id: string) => void;
};

const toggleItem = (
  id: string,
  current: string[],
  onChange: (val: string[]) => void
) => {
  const newSet = new Set(current);
  if (newSet.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  onChange(Array.from(newSet));
};

const getDisplayValue = (id: string) =>
  id.replace(/^rarity_|^weapon_type_/, '');

export const Filter = ({ data, value, onChange }: FilterProps) => {
  return (
    <div className="grow rounded-xl bg-white/5 p-1">
      <div className="flex flex-wrap items-center justify-evenly gap-1">
        {data.map((item) => (
          <FilterCard
            key={item.id}
            item={item}
            selected={value.includes(item.id)}
            onClick={(id) => toggleItem(id, value, onChange)}
          />
        ))}
      </div>
    </div>
  );
};

const FilterCard = ({ item, selected, onClick }: FilterCardProps) => {
  const isRarity = item.id.includes('rarity_');
  const isWpnType = item.id.includes('weapon_type_');

  return (
    <Tooltip title={item.name} className="grow rounded-xl" position="top">
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onClick(item.id)}
        className={clsx(
          'relative flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 p-1 text-sm select-none',
          selected ? 'border-white shadow-sm' : 'border-transparent',
          'hover:border-white/60 focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900'
        )}
        style={{ backgroundColor: item.color }}
      >
        {isRarity && (
          <span className="font-bold">{getDisplayValue(item.id)}</span>
        )}

        {item.icon ? (
          <CloudflareImage
            alt={item.name}
            src={item.icon}
            width={isRarity || isWpnType ? 24 : 32}
            height={isRarity || isWpnType ? 24 : 32}
            draggable={false}
            isIcon={true}
            className="aspect-square"
          />
        ) : (
          <span className="truncate px-1 text-[11px] font-semibold capitalize">
            {item.name}
          </span>
        )}

        {selected && (
          <div
            className="absolute top-0 right-0 rounded-bl-xl bg-white p-1"
            style={{ color: item.color }}
          >
            <FaCheck size={12} />
          </div>
        )}
      </button>
    </Tooltip>
  );
};
