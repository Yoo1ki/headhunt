'use client';

import { PageTitle } from '@/components/ui/PageTitle';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import type { Operator } from '@/types/operator';
import { OperatorCard } from './OperatorCard';
import { CONFIG } from '@/config';
import { Filter } from '@/components/ui/Filter';
import { ResetButton } from '@/components/ui/ResetButton';
import type { EnumElement, EnumOpClass, EnumRarity } from '@/types/enums';

type OperatorsPageContentProps = {
  rarities: EnumRarity[];
  elements: EnumElement[];
  opClass: EnumOpClass[];
  operators: Operator[];
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

export const OperatorsPageContent = ({
  rarities,
  elements,
  opClass,
  operators,
}: OperatorsPageContentProps) => {
  const t = useTranslations('OperatorsPage');

  const [filters, setFilters] = useState({
    search: '',
    rarities: [] as string[],
    elements: [] as string[],
    opClass: [] as string[],
  });

  const elementsMap = useMemo(
    () => Object.fromEntries(elements.map((e) => [e.id, e])),
    [elements]
  );

  const opClassMap = useMemo(
    () => Object.fromEntries(opClass.map((o) => [o.id, o])),
    [opClass]
  );

  const changeFilter = useCallback(
    <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const handleChangeRarities = useCallback(
    (values: string[]) => changeFilter('rarities', values),
    [changeFilter]
  );

  const handleChangeElements = useCallback(
    (values: string[]) => changeFilter('elements', values),
    [changeFilter]
  );

  const handleChangeOpClass = useCallback(
    (values: string[]) => changeFilter('opClass', values),
    [changeFilter]
  );

  const handleReset = useCallback(() => {
    setFilters({
      search: '',
      rarities: [],
      elements: [],
      opClass: [],
    });
  }, []);

  const filterFns = useMemo(
    () => [
      (op: Operator) => isIncluded(filters.rarities, op.rarityId),
      (op: Operator) => isIncluded(filters.elements, op.elementId),
      (op: Operator) => isIncluded(filters.opClass, op.opClassId),
    ],
    [filters]
  );

  const filteredOperators = useMemo(() => {
    return searchByName<Operator>(operators, filters.search)
      .filter((op) => filterFns.every((fn) => fn(op)))
      .sort((a, b) => {
        const priorityDiff =
          getPriority(a.labelType) - getPriority(b.labelType);
        if (priorityDiff !== 0) return priorityDiff;
        return a.name.localeCompare(b.name);
      });
  }, [operators, filters.search, filterFns]);

  const isDisableResetButton =
    filters.search === '' &&
    filters.rarities.length === 0 &&
    filters.elements.length === 0 &&
    filters.opClass.length === 0;

  return (
    <>
      <PageTitle
        title={t('pageTitle')}
        search={{
          placeholder: `${t('searchLabel')}...`,
          onChange: handleSearch,
          value: filters.search,
        }}
        desc={t('count', { count: filteredOperators.length })}
      />
      {
        <div className="mb-4 flex flex-wrap gap-4">
          <Filter
            data={rarities
              .filter((r) =>
                ['rarity_4', 'rarity_5', 'rarity_6'].includes(r.id)
              )
              .map((e) => ({
                id: e.id,
                name: `${e.name}★`,
                icon: 'rarity',
                color: CONFIG.enumColors.rarities[e.id],
              }))}
            value={filters.rarities}
            onChange={handleChangeRarities}
          />
          <Filter
            data={elements.map((e) => ({
              id: e.id,
              name: e.name,
              icon: e.id,
              color: CONFIG.enumColors.elements[e.id],
            }))}
            value={filters.elements}
            onChange={handleChangeElements}
          />
          <Filter
            data={opClass.map((e) => ({
              id: e.id,
              name: e.name,
              icon: e.id,
              color: CONFIG.enumColors.opClass[e.id],
            }))}
            value={filters.opClass}
            onChange={handleChangeOpClass}
          />
          <ResetButton onClick={handleReset} disabled={isDisableResetButton} />
        </div>
      }
      {filteredOperators.length === 0 ? (
        <div className="my-40 text-center">{t('notfound')}</div>
      ) : (
        <div className="grid-operators">
          {filteredOperators.map((op) => {
            const element = elementsMap[op.elementId];
            const operatorClass = opClassMap[op.opClassId];

            return (
              <OperatorCard
                key={op.id}
                name={op.name}
                avatar={op.avatar}
                rarityColor={
                  CONFIG.enumColors.rarities[op.rarityId as EnumRarity['id']]
                }
                element={{
                  name: element.name,
                  icon: element.id,
                  color: CONFIG.enumColors.elements[element.id],
                }}
                opClass={{
                  name: operatorClass.name,
                  icon: operatorClass.id,
                  color: CONFIG.enumColors.opClass[operatorClass.id],
                }}
                label={op.labelType}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
