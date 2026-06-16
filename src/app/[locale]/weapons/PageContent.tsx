'use client';

import { PageTitle } from '@/components/ui/PageTitle';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { Weapon } from '@/types/weapons';
import { CONFIG } from '@/config';
import { Filter } from '@/components/ui/Filter';
import { ResetButton } from '@/components/ui/ResetButton';
import { WeaponCard } from './components/WeaponCard';
import { EnumRarity, EnumWPType } from '@/types/enums';

type PageContentProps = {
  rarities: EnumRarity[];
  wpTypes: EnumWPType[];
  weapons: Weapon[];
};

const searchByName = <T extends { name: string }>(
  arr: T[],
  keyword: string
): T[] => {
  const regex = new RegExp(keyword, 'i');
  return arr.filter((obj) => regex.test(obj.name));
};

const isIncluded = <T,>(filter: T[], value: T) =>
  filter.length === 0 || filter.includes(value);

const getPriority = (labelType?: string) => {
  if (labelType === 'label_type_up') return 0;
  if (labelType === 'label_type_new') return 1;
  return 2;
};

export const PageContent = ({
  rarities,
  wpTypes,
  weapons,
}: PageContentProps) => {
  const t = useTranslations('WeaponsPage');

  const [filters, setFilters] = useState({
    search: '',
    rarities: [] as string[],
    wpTypes: [] as string[],
  });

  const WpTipesMap = useMemo(
    () => Object.fromEntries(wpTypes.map((r) => [r.id, r])),
    [wpTypes]
  );

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const changeFilter = useCallback(
    <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleChangeRarities = useCallback(
    (values: string[]) => changeFilter('rarities', values),
    [changeFilter]
  );

  const handleChangeWpTypes = useCallback(
    (values: string[]) => changeFilter('wpTypes', values),
    [changeFilter]
  );

  const handleReset = useCallback(() => {
    setFilters({
      search: '',
      rarities: [],
      wpTypes: [],
    });
  }, []);

  const filterFns = useMemo(
    () => [
      (wp: Weapon) => isIncluded(filters.rarities, wp.rarityId),
      (wp: Weapon) => isIncluded(filters.wpTypes, wp.HeadhuntTypeId),
    ],
    [filters]
  );

  const filteredWeapons = useMemo(() => {
    return searchByName<Weapon>(weapons, filters.search)
      .filter((wp) => filterFns.every((fn) => fn(wp)))
      .sort((a, b) => {
        const priorityDiff =
          getPriority(a.labelType) - getPriority(b.labelType);
        if (priorityDiff !== 0) return priorityDiff;
        return a.name.localeCompare(b.name);
      });
  }, [weapons, filters.search, filterFns]);

  const isResetDisabled =
    filters.search === '' &&
    filters.rarities.length === 0 &&
    filters.wpTypes.length === 0;

  return (
    <>
      <PageTitle
        title={t('pageTitle')}
        search={{
          placeholder: `${t('searchLabel')}...`,
          onChange: handleSearch,
          value: filters.search,
        }}
        desc={t('count', { count: filteredWeapons.length })}
      />
      {
        <div className="mb-4 flex flex-wrap gap-4">
          <Filter
            data={rarities.map((e) => ({
              id: e.id,
              name: `${e.name}★`,
              icon: 'rarity',
              color: CONFIG.enumColors.rarities[e.id],
            }))}
            value={filters.rarities}
            onChange={handleChangeRarities}
          />
          <Filter
            data={wpTypes.map((e) => ({
              id: e.id,
              name: e.name,
              icon: e.id,
              color: CONFIG.enumColors.wpTypes[e.id],
            }))}
            value={filters.wpTypes}
            onChange={handleChangeWpTypes}
          />
          <ResetButton onClick={handleReset} disabled={isResetDisabled} />
        </div>
      }
      {filteredWeapons.length === 0 ? (
        <div className="my-40 text-center">{t('notfound')}</div>
      ) : (
        <div className="grid-weapons">
          {filteredWeapons.map((wp) => {
            return (
              <WeaponCard
                key={wp.id}
                name={wp.name}
                avatar={wp.icon}
                rarity={{
                  id: wp.rarityId,
                  color:
                    CONFIG.enumColors.rarities[wp.rarityId as EnumRarity['id']],
                }}
                type={{
                  id: wp.HeadhuntTypeId,
                  name: WpTipesMap[wp.HeadhuntTypeId].name,
                }}
                skillLabels={wp.skillLabels}
                detail={wp.detail}
                label={wp.labelType}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
