'use client';

import { CFImage } from '@/components/CFImage';
import { CONFIG } from '@/config';
import { WeaponDetail } from '@/types/weapons';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type WeaponCardProps = {
  name: string;
  avatar: string;
  rarity: rarityItem;
  type: typeItem;
  skillLabels: string[];
  detail: WeaponDetail | undefined;
  label?: string;
};

type typeItem = {
  id: string;
  name: string;
};

type rarityItem = {
  id: string;
  color: string;
};

export const WeaponCard = ({
  name,
  avatar,
  rarity,
  type,
  skillLabels,
  detail,
  label,
}: WeaponCardProps) => {
  const t = useTranslations('WeaponsPage');

  return (
    <div className="group relative flex flex-col gap-2 overflow-hidden rounded-xl bg-neutral-800 px-2 py-1">
      <div className="pointer-events-none absolute inset-0 transition duration-300 group-hover:bg-white/5" />
      <div className="flex gap-2">
        <div
          className={`relative aspect-square h-24 shrink-0 overflow-hidden rounded-xl border-b-4`}
          style={{ borderColor: rarity.color }}
        >
          <div
            className={`absolute inset-1 rounded-xl border border-white/10`}
          />

          <CFImage
            src={avatar}
            alt={name}
            width={128}
            height={128}
            draggable={false}
            className="absolute inset-0 transition duration-300 group-hover:scale-110 group-hover:transform"
          />

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
        <div className="flex flex-col justify-between gap-1">
          <p className="font-bold">{name}</p>
          <div>
            <div className="flex h-3.5 gap-1">
              {Array.from({ length: Number(rarity.id.split('_').pop()) }).map(
                (_, i) => (
                  <CFImage
                    key={i}
                    alt="★"
                    width={35}
                    height={37}
                    src={'rarity'}
                    className="w-fit object-contain"
                    isIcon={true}
                  />
                )
              )}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <CFImage
                alt={type.name}
                width={24}
                height={24}
                src={type.id}
                className="h-3.5 w-fit object-contain"
                isIcon={true}
              />{' '}
              <span className="font-semibold">{type.name}</span>
            </div>
          </div>
          <div>
            <p className="text-sm">
              {t('baseATK')}:{' '}
              <span
                className="font-semibold"
                style={{ color: CONFIG.contentColors.light_function_blueness }}
              >
                {detail?.baseATK || '-'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-xs">
        {skillLabels.map((e, i) => {
          const skills = detail?.skills[i];
          return (
            <div key={e} className="flex gap-1">
              <div>•</div>
              <div>
                <div className="font-semibold">{e}</div>
                {skills && (
                  <div className="my-1">
                    <span className="h-fit w-fit rounded-sm bg-neutral-900 px-1 py-0.5 font-semibold">
                      {skills.label}
                    </span>{' '}
                    {skills.content.map((skill, i) => {
                      const Wrapper = i >= 1 ? 'div' : 'span';
                      return (
                        <Wrapper
                          key={i}
                          className={i >= 1 ? 'mt-2' : undefined}
                        >
                          {skill.map((content, j) => (
                            <span
                              key={j}
                              className={clsx(
                                content.bold && 'font-semibold',
                                content.underline && 'underline'
                              )}
                              style={{
                                color:
                                  CONFIG.contentColors[
                                    content.color as keyof typeof CONFIG.contentColors
                                  ],
                              }}
                            >
                              {content.text.text}
                            </span>
                          ))}
                        </Wrapper>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
