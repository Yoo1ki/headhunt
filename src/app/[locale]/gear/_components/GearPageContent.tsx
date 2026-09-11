'use client';

import { PageTitle } from '@/components/ui/PageTitle';
import { FilterList } from '@/components/ui/FilterList';
import { ResetButton } from '@/components/ui/ResetButton';
import type { Gear, GearFilters } from '@/types/gear';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { GearCard } from './GearCard';

const isIncluded = (selected: string[], value: string) =>
  selected.length === 0 || selected.includes(value);

export const GearPageContent = ({
  gear,
  filters,
}: {
  gear: Gear[];
  filters: GearFilters;
}) => {
  const t = useTranslations('GearPage');
  const [state, setState] = useState({
    search: '',
    rarities: [] as string[],
    types: [] as string[],
    levels: [] as string[],
    properties: [] as string[],
    suits: [] as string[],
    flags: [] as string[],
  });
  const [openFilter, setOpenFilter] = useState<keyof GearFilters | null>(null);
  const filterAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterAreaRef.current &&
        !filterAreaRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () =>
      document.removeEventListener('pointerdown', handleOutsideClick);
  }, []);

  const filteredGear = useMemo(() => {
    const keyword = state.search.trim().toLocaleLowerCase();
    return gear.filter((item) => {
      const searchable = [item.name, item.suit?.name]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase();
      return (
        searchable.includes(keyword) &&
        isIncluded(state.rarities, item.rarityId) &&
        isIncluded(state.types, item.typeId) &&
        isIncluded(state.levels, item.levelId) &&
        state.properties.every((property) =>
          item.propertyIds.includes(property)
        ) &&
        isIncluded(state.suits, item.suit?.id ?? '') &&
        (!state.flags.includes('accessory') || item.isAccessory) &&
        (!state.flags.includes('enhanceable') || item.canEnhance)
      );
    });
  }, [gear, state]);

  const reset = () =>
    setState({
      search: '',
      rarities: [],
      types: [],
      levels: [],
      properties: [],
      suits: [],
      flags: [],
    });

  const hasFilters = Object.values(state).some((value) =>
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  const renderFilter = (key: keyof GearFilters, label: string) => (
    <FilterList
      label={label}
      items={filters[key].filter((item) => item.id && item.name.trim())}
      value={state[key]}
      isOpen={openFilter === key}
      onToggle={() =>
        setOpenFilter((previous) => (previous === key ? null : key))
      }
      onChange={(value) =>
        setState((previous) => ({ ...previous, [key]: value }))
      }
    />
  );

  return (
    <>
      <PageTitle
        title={t('pageTitle')}
        search={{
          value: state.search,
          onChange: (search) =>
            setState((previous) => ({ ...previous, search })),
          placeholder: `${t('searchLabel')}...`,
          ariaLabel: t('searchLabel'),
        }}
      />
      <div
        ref={filterAreaRef}
        className="mb-4 rounded-xl bg-neutral-800/40 p-3 sm:p-4"
      >
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
          {renderFilter('rarities', t('filters.rarity'))}
          {renderFilter('types', t('filters.type'))}
          {renderFilter('levels', t('filters.level'))}
          {renderFilter('properties', t('filters.property'))}
          {renderFilter('suits', t('filters.suit'))}
          {renderFilter('flags', t('filters.options'))}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p role="status" className="text-xs text-white/55">
            {t('count', { count: filteredGear.length })}
          </p>
          <div className="flex shrink-0">
            <ResetButton
              onClick={() => {
                reset();
                setOpenFilter(null);
              }}
              disabled={!hasFilters}
            />
          </div>
        </div>
      </div>
      {filteredGear.length === 0 ? (
        <div className="my-24 rounded-xl bg-neutral-800/80 p-8 text-center text-white/60">
          {t('notFound')}
        </div>
      ) : (
        <div className="grid items-start gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {filteredGear.map((item) => (
            <GearCard
              key={item.id}
              gear={item}
              typeName={
                filters.types.find((type) => type.id === item.typeId)?.name ??
                t('type')
              }
            />
          ))}
        </div>
      )}
    </>
  );
};
