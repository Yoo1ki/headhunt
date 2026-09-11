'use client';

import { CloudflareImage } from '@/components/shared/CloudflareImage';
import { CONFIG } from '@/config';
import type { WeaponDetail } from '@/types/weapons';
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
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl bg-neutral-800/80">
      <div className="flex items-start gap-3 bg-neutral-950/30 p-3 sm:gap-4 sm:p-4">
        <div
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-b-4 bg-neutral-900/60"
          style={{ borderColor: rarity.color }}
        >
          <div className="pointer-events-none absolute inset-1 rounded-xl border border-white/10" />
          <CloudflareImage
            src={avatar}
            alt={name}
            width={128}
            height={128}
            draggable={false}
            className="h-full w-full object-contain transition duration-300 motion-safe:group-hover:scale-105"
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
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="text-base leading-snug font-semibold break-words text-white">
            {name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              style={{ color: rarity.color }}
              className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-semibold"
            >
              {rarity.id.replace('rarity_', '')}★
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <CloudflareImage
                alt={type.name}
                width={24}
                height={24}
                src={type.id}
                className="h-3.5 w-fit object-contain"
                isIcon={true}
              />{' '}
              <span>{type.name}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-white/55">
              {t('baseATK')}:{' '}
              <span
                className="ml-1 text-sm font-semibold tabular-nums"
                style={{ color: CONFIG.contentColors.light_function_blueness }}
              >
                {detail?.baseATK ?? '-'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-3 text-xs sm:p-4">
        {skillLabels.map((e, i) => {
          const skills = detail?.skills[i];
          return (
            <section
              key={`${e}-${i}`}
              className="min-w-0 rounded-lg bg-neutral-900/50 p-3"
            >
              <div>
                <h3 className="text-sm leading-snug font-semibold text-white/85">
                  {e}
                </h3>
                {skills && (
                  <div className="mt-2 leading-relaxed break-words text-white/65">
                    <span className="mr-1 inline-block rounded bg-white/5 px-1.5 py-0.5 font-medium text-white/80">
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
            </section>
          );
        })}
      </div>
    </article>
  );
};
