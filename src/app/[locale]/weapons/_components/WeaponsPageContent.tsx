'use client';

import { PageTitle } from '@/components/ui/PageTitle';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import type { Weapon } from '@/types/weapons';
import { CONFIG } from '@/config';
import { Filter } from '@/components/ui/Filter';
import { ResetButton } from '@/components/ui/ResetButton';
import { WeaponCard } from './WeaponCard';
import type { EnumRarity, EnumWPType } from '@/types/enums';

type WeaponsPageContentProps = {
  rarities: EnumRarity[];
  weaponTypes: EnumWPType[];
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

export const WeaponsPageContent = ({
  rarities,
  weaponTypes,
  weapons,
}: WeaponsPageContentProps) => {
  const t = useTranslations('WeaponsPage');

  const [filters, setFilters] = useState({
    search: '',
    rarities: [] as string[],
    weaponTypes: [] as string[],
  });

  const weaponTypesMap = useMemo(
    () =>
      Object.fromEntries(
        weaponTypes.map((weaponType) => [weaponType.id, weaponType])
      ),
    [weaponTypes]
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

  const handleChangeWeaponTypes = useCallback(
    (values: string[]) => changeFilter('weaponTypes', values),
    [changeFilter]
  );

  const handleReset = useCallback(() => {
    setFilters({
      search: '',
      rarities: [],
      weaponTypes: [],
    });
  }, []);

  const filterFns = useMemo(
    () => [
      (weapon: Weapon) => isIncluded(filters.rarities, weapon.rarityId),
      (weapon: Weapon) =>
        isIncluded(filters.weaponTypes, weapon.HeadhuntTypeId),
    ],
    [filters]
  );

  const filteredWeapons = useMemo(() => {
    return searchByName<Weapon>(weapons, filters.search)
      .filter((weapon) => filterFns.every((filter) => filter(weapon)))
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
    filters.weaponTypes.length === 0;

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
            data={weaponTypes.map((weaponType) => ({
              id: weaponType.id,
              name: weaponType.name,
              icon: weaponType.id,
              color: CONFIG.enumColors.wpTypes[weaponType.id],
            }))}
            value={filters.weaponTypes}
            onChange={handleChangeWeaponTypes}
          />
          <ResetButton onClick={handleReset} disabled={isResetDisabled} />
        </div>
      }
      {filteredWeapons.length === 0 ? (
        <div className="my-40 text-center">{t('notfound')}</div>
      ) : (
        <div className="grid-weapons">
          {filteredWeapons.map((weapon) => {
            return (
              <WeaponCard
                key={weapon.id}
                name={weapon.name}
                avatar={weapon.icon}
                rarity={{
                  id: weapon.rarityId,
                  color:
                    CONFIG.enumColors.rarities[
                      weapon.rarityId as EnumRarity['id']
                    ],
                }}
                type={{
                  id: weapon.HeadhuntTypeId,
                  name: weaponTypesMap[weapon.HeadhuntTypeId].name,
                }}
                skillLabels={weapon.skillLabels}
                detail={weapon.detail}
                label={weapon.labelType}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
