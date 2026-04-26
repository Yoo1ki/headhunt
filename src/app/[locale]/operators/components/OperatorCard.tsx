"use client";

import { CFImage } from "@/components/ui/CFImage";
import { Tooltip } from "@/components/ui/Tooltip";

type IconProps = {
  name: string;
  icon: string;
  color: string;
};

type OperatorCardProps = {
  name: string;
  avatar: string;
  rarityColor: string;
  element: IconProps;
  opClass: IconProps;
  label?: string;
};

export const OperatorCard = ({
  name,
  avatar,
  rarityColor,
  element,
  opClass,
  label,
}: OperatorCardProps) => {
  return (
    <div
      className={`relative group rounded-xl overflow-hidden aspect-7/10 border-b-4 bg-neutral-800/80`}
      style={{ borderColor: rarityColor }}
    >
      <div className={`absolute inset-1 border border-white/10 rounded-xl`} />
      <div className="absolute inset-0 group-hover:bg-white/5 transition duration-300" />

      <CFImage
        src={avatar}
        alt={name}
        width={256}
        height={358}
        draggable={false}
        className="absolute inset-0 group-hover:transform group-hover:scale-110 transition duration-300"
      />

      <div className="absolute bottom-0 right-0 left-0">
        <div className="relative h-8 bg-black/90 overflow-hidden">
          <div className="absolute inset-0 group-hover:bg-white/5 transition duration-300" />
          <div className="absolute inset-0 text-center font-bold text-xs leading-none text-white/80 group-hover:text-white flex justify-center items-center align-middle transition duration-300 px-2">
            {name}
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <OperatorCardIcon
          name={element.name}
          icon={element.icon}
          color={element.color}
        />
        <OperatorCardIcon
          name={opClass.name}
          icon={opClass.icon}
          color={opClass.color}
        />
      </div>

      {label && (
        <div
          className={`absolute top-1 left-1 rounded-br-xl rounded-tl-xl p-1 flex justify-center items-center text-xs text-white font-bold select-none ${
            label === "label_type_up" ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {label === "label_type_up" ? "UP" : "NEW"}
        </div>
      )}
    </div>
  );
};

const OperatorCardIcon = ({ icon, name, color }: IconProps) => (
  <Tooltip title={name} position="left">
    <CFImage
      src={icon}
      alt={name}
      width={24}
      height={24}
      draggable={false}
      isIcon={true}
      className="w-6 h-6 rounded-lg ring-1 ring-black/50"
      style={{ backgroundColor: color }}
    />
  </Tooltip>
);
