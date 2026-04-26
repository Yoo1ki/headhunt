"use client";

import { Tooltip } from "./Tooltip";
import { FaCheck } from "react-icons/fa6";
import clsx from "clsx";
import { CFImage } from "./CFImage";

type FilterItem = {
  id: string;
  name: string;
  icon: string;
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
  onChange: (val: string[]) => void,
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
  id.replace(/^rarity_|^weapon_type_/, "");

export const Filter = ({ data, value, onChange }: FilterProps) => {
  return (
    <div className="rounded-xl grow">
      <div className="flex flex-wrap gap-1 justify-evenly items-center">
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
  const isRarity = item.id.includes("rarity_");
  const isWpnType = item.id.includes("weapon_type_");

  return (
    <Tooltip title={item.name} className="grow rounded-xl" position="top">
      <button
        type="button"
        onClick={() => onClick(item.id)}
        className={clsx(
          "border-2 p-1 w-full rounded-xl flex justify-center items-center cursor-pointer h-10 select-none relative overflow-hidden",
          selected ? "border-white" : "border-transparent",
          "hover:border-white/60",
        )}
        style={{ backgroundColor: item.color }}
      >
        {isRarity && (
          <span className="font-bold">{getDisplayValue(item.id)}</span>
        )}

        <CFImage
          alt={item.name}
          src={item.icon}
          width={isRarity || isWpnType ? 24 : 32}
          height={isRarity || isWpnType ? 24 : 32}
          draggable={false}
          isIcon={true}
          className="aspect-square"
        />

        {selected && (
          <div
            className="absolute top-0 right-0 bg-white rounded-bl-xl p-1"
            style={{ color: item.color }}
          >
            <FaCheck size={12} />
          </div>
        )}
      </button>
    </Tooltip>
  );
};
