'use client';

import { Loading } from '@/components/Loading';
import { PageTitle } from '@/components/PageTitle';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useHash } from '@/hooks/useHash';
import { FaFileImport, FaGear } from 'react-icons/fa6';
import { FaSyncAlt } from 'react-icons/fa';
import { Banners } from '@/types/banner';
import { Button } from '@/components/Button';
import { useStorageStore } from '@/store/useStorageStore';
import { useImportStore } from '@/store/useImportStore';
import { TypeCard } from './components/TypeCard';
import { ImportRecords } from './components/ImportRecords';
import { HeadhuntRecords } from './components/HeadhuntRecords';
import { RecentHeadhunts } from './components/RecentHeadhunts';
import { RecentBanners } from './components/RecentBanners';
import { DetailRecords } from './components/DetailRecords';
import { Catalogs } from '@/types/catalog';
import { Enums } from '@/types/enums';
import { RecordItem } from '@/types/profile';
import { SettingsMenu } from './components/SettingsMenu';

type PageContentProps = {
  types: Types;
  banners: Banners;
  catalogs: Catalogs;
  rarities: Enums['rarities'];
};

type Types = {
  opTypes: TypeItem[];
  wpTypes: TypeItem[];
};

type TypeItem = {
  id: string;
  name: string;
  icons: IconItem[];
  r5PityLimit: number;
  r6PityLimit: number;
  guaranteeAt?: number;
};

type IconItem = {
  name: string;
  url: string;
};

export const PageContent = ({
  types,
  banners,
  catalogs,
  rarities,
}: PageContentProps) => {
  const t = useTranslations('TrackerPage');

  const hasHydrated = useStorageStore((s) => s.hasHydrated);
  const profile = useStorageStore((s) => s.getCurrentProfile());
  const importRecords = useImportStore((s) => s.importRecords);
  const isImporting = useImportStore((s) => s.isImporting);
  const processType = useImportStore((s) => s.processType);

  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);

  const [isOpenImport, setIsOpenImport] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const combinedHeadhuntTypes = useMemo(
    () => [...types.opTypes, ...types.wpTypes],
    [types]
  );

  const hashList = useMemo(
    () => combinedHeadhuntTypes.map((e) => e.id),
    [combinedHeadhuntTypes]
  );

  const hash = useHash(hasHydrated ? types.opTypes[0]?.id : '', hashList);

  const isBannerType = useMemo(
    () => types.opTypes.some((t) => t.id === hash),
    [types.opTypes, hash]
  );

  const { records, bannerIds } = useMemo(() => {
    if (!hasHydrated) {
      return { records: [], bannerIds: new Set<string>() };
    }

    const allRecords = profile?.stores?.headhunt?.records;
    const bannerIds = new Set<string>();

    const isMainType = types.opTypes.slice(0, 3).some((t) => t.id === hash);

    let result: RecordItem[] = [];

    if (isBannerType) {
      const source = allRecords?.[hash] ?? [];

      if (isMainType) {
        for (const r of source) {
          bannerIds.add(r.bannerId);
        }
      }

      result = selectedBannerId
        ? source.filter((r) => r.bannerId === selectedBannerId)
        : source;
    } else {
      const baseKey = hash.split('_')[0];
      const source = allRecords?.[baseKey] ?? [];

      result = source.filter((r) => r.bannerId === hash);
    }

    return { records: result, bannerIds };
  }, [
    hasHydrated,
    profile?.stores?.headhunt?.records,
    types.opTypes,
    isBannerType,
    hash,
    selectedBannerId,
  ]);

  const headhuntTypesMap = useMemo(() => {
    const map = new Map<string, TypeItem>();
    combinedHeadhuntTypes.forEach((type) => {
      map.set(type.id, type);
    });
    return map;
  }, [combinedHeadhuntTypes]);

  const guaranteeLimit = useMemo(() => {
    const limit =
      combinedHeadhuntTypes.find((e) => e.id === hash)?.guaranteeAt || Infinity;
    return limit;
  }, [combinedHeadhuntTypes, hash]);

  useEffect(() => {
    const timer = setTimeout(() => setSelectedBannerId(null), 0);
    return () => clearTimeout(timer);
  }, [hash]);

  const handleSelectBanner = (id: string | null) => {
    setSelectedBannerId(id);
  };

  const handleSync = async () => {
    if (!profile?.stores?.headhunt?.url || isImporting) return;
    importRecords(profile?.stores?.headhunt?.url, 'sync');
  };

  const handleOpenImport = () => {
    setIsOpenImport(true);
  };

  const handleOpenSettings = () => {
    setIsOpenSettings(true);
  };

  const resetKey = `${hash}-${selectedBannerId ?? 'all'}`;

  return (
    <>
      <PageTitle title={t('pageTitle')}>
        <div className="flex items-stretch justify-end gap-2">
          <Button
            onClick={handleSync}
            variant="secondary"
            disabled={
              !hasHydrated || !profile?.stores?.headhunt?.url || isImporting
            }
          >
            {isImporting && processType === 'sync' ? (
              <>
                <FaSyncAlt className="animate-spin" />
                <span>{t('syncing')}</span>
              </>
            ) : (
              <>
                <FaSyncAlt />
                <span>{t('sync')}</span>
              </>
            )}
          </Button>
          <Button
            onClick={handleOpenImport}
            disabled={!hasHydrated || (isImporting && processType === 'sync')}
          >
            <FaFileImport />
            {isImporting && processType === 'import' ? (
              <span>{t('importing')}</span>
            ) : (
              <span>{t('import')}</span>
            )}
          </Button>
          <Button
            onClick={handleOpenSettings}
            variant="secondary"
            isNew={true}
            disabled={
              // !hasHydrated || !profile?.stores?.headhunt?.url || isImporting
              true
            }
          >
            <FaGear />
          </Button>
        </div>
      </PageTitle>

      <div className="flex flex-1 flex-col gap-2 xl:gap-4">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {types.opTypes
            .filter((type) => type.id !== 'weponbox')
            .map((type) => {
              const types = hasHydrated
                ? profile?.stores?.headhunt?.types[type.id]
                : undefined;

              let pity5 = types?.r5Pity ?? 0;
              let pity6 = types?.r6Pity ?? 0;

              if (type.id === 'joint' && hasHydrated) {
                const banners =
                  profile?.stores?.headhunt?.banners['joint_1_2_2'];
                pity5 = banners?.r5Pity ?? 0;
                pity6 = banners?.r6Pity ?? 0;
              }

              return (
                <TypeCard
                  key={type.id}
                  hash={type.id}
                  name={type.name}
                  icons={type.icons}
                  pity5={pity5}
                  pity6={pity6}
                  pity5Limit={type.r5PityLimit}
                  pity6Limit={type.r6PityLimit}
                  isSelected={type.id === hash}
                />
              );
            })}
        </div>

        <div className="flex w-full flex-1 flex-col gap-4 xl:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-2">
              {types.opTypes
                .filter((type) => type.id === 'weponbox')
                .map((type) => {
                  return (
                    <TypeCard
                      key={type.id}
                      hash={type.id}
                      name={type.name}
                      icons={type.icons}
                      pity5={0}
                      pity6={0}
                      pity5Limit={type.r5PityLimit}
                      pity6Limit={type.r6PityLimit}
                      isSelected={type.id === hash}
                    />
                  );
                })}
              {types.wpTypes.map((type) => {
                const banners = hasHydrated
                  ? profile?.stores?.headhunt?.banners[type.id]
                  : undefined;

                const pity5 = banners?.r5Pity ?? 0;
                const pity6 = banners?.r6Pity ?? 0;

                return (
                  <TypeCard
                    key={type.id}
                    hash={type.id}
                    name={type.name}
                    icons={type.icons}
                    pity5={pity5}
                    pity6={pity6}
                    pity5Limit={type.r5PityLimit}
                    pity6Limit={type.r6PityLimit}
                    isSelected={type.id === hash}
                  />
                );
              })}
            </div>
            {/* <div className="flex flex-col gap-4 top-4 xl:sticky xl:z-50">
              ADS
            </div> */}
          </div>
          <div className="flex flex-2 flex-col gap-4">
            {!hasHydrated ? (
              <div className="flex flex-1 items-center justify-center rounded-xl bg-neutral-800/80 py-4">
                <Loading label={t('loading')} />
              </div>
            ) : profile?.stores?.headhunt?.records ? (
              <>
                {bannerIds.size > 0 && (
                  <RecentBanners
                    key={`wp-types-${hash}`}
                    banners={banners}
                    bannerIds={bannerIds}
                    selectedId={selectedBannerId}
                    onSelected={handleSelectBanner}
                  />
                )}
                {selectedBannerId ? (
                  <DetailRecords
                    label={banners[selectedBannerId].name ?? selectedBannerId}
                    stats={profile.stores.headhunt.banners[selectedBannerId]}
                    hash={hash}
                  />
                ) : (
                  <DetailRecords
                    label={headhuntTypesMap.get(hash)?.name}
                    stats={
                      isBannerType
                        ? profile.stores.headhunt.types[hash]
                        : profile.stores.headhunt.banners[hash]
                    }
                    hash={hash}
                  />
                )}
                <RecentHeadhunts
                  key={`recent-${resetKey}`}
                  hash={hash}
                  records={records}
                  catalogs={catalogs}
                  rarities={rarities}
                  guaranteedLimit={guaranteeLimit}
                />
                <HeadhuntRecords
                  key={`record-${resetKey}`}
                  hash={hash}
                  records={records}
                  catalogs={catalogs}
                  banners={banners}
                  rarities={rarities}
                  disabled={!profile.stores.headhunt.url || isImporting}
                  isSyncing={isImporting && processType === 'sync'}
                  onSync={handleSync}
                />
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-neutral-800/80 px-3 py-2">
                <div>
                  {profile?.stores?.headhunt?.records
                    ? t('noGachaRecords')
                    : t('noRecordImported')}
                </div>
                {profile?.stores?.headhunt ? (
                  <Button
                    onClick={handleSync}
                    variant="secondary"
                    disabled={!profile.stores.headhunt?.url || isImporting}
                  >
                    {isImporting && processType === 'sync' ? (
                      <>
                        <FaSyncAlt className="animate-spin" />
                        <span>{t('syncing')}</span>
                      </>
                    ) : (
                      <>
                        <FaSyncAlt />
                        <span>{t('sync')}</span>
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsOpenImport(true)}
                    disabled={isImporting && processType === 'sync'}
                  >
                    <FaFileImport />
                    {isImporting && processType === 'import' ? (
                      <span>{t('importing')}</span>
                    ) : (
                      <span>{t('import')}</span>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ImportRecords
        isOpen={isOpenImport}
        onClose={() => setIsOpenImport(false)}
      />
      <SettingsMenu
        isOpen={isOpenSettings}
        onClose={() => setIsOpenSettings(false)}
      />
    </>
  );
};
