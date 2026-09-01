'use client';

import { CloudflareImage } from '@/components/shared/CloudflareImage';
import { Tooltip } from '@/components/ui/Tooltip';

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
      className={`group relative aspect-7/10 overflow-hidden rounded-xl border-b-4 bg-neutral-800/80`}
      style={{ borderColor: rarityColor }}
    >
      <div className={`absolute inset-1 rounded-xl border border-white/10`} />
      <div className="absolute inset-0 transition duration-300 group-hover:bg-white/5" />

      <CloudflareImage
        src={avatar}
        alt={name}
        width={256}
        height={358}
        draggable={false}
        className="absolute inset-0 transition duration-300 group-hover:scale-110 group-hover:transform"
      />

      <div className="absolute right-0 bottom-0 left-0">
        <div className="relative h-8 overflow-hidden bg-black/90">
          <div className="absolute inset-0 transition duration-300 group-hover:bg-white/5" />
          <div className="absolute inset-0 flex items-center justify-center px-2 text-center align-middle text-xs leading-none font-bold text-white/80 transition duration-300 group-hover:text-white">
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
          className={`absolute top-1 left-1 flex items-center justify-center rounded-tl-xl rounded-br-xl p-1 text-xs font-bold text-white select-none ${
            label === 'label_type_up' ? 'bg-yellow-500' : 'bg-green-500'
          }`}
        >
          {label === 'label_type_up' ? 'UP' : 'NEW'}
        </div>
      )}
    </div>
  );
};

const OperatorCardIcon = ({ icon, name, color }: IconProps) => (
  <Tooltip title={name} position="left">
    <CloudflareImage
      src={icon}
      alt={name}
      width={24}
      height={24}
      draggable={false}
      isIcon={true}
      className="h-6 w-6 rounded-lg ring-1 ring-black/50"
      style={{ backgroundColor: color }}
    />
  </Tooltip>
);
