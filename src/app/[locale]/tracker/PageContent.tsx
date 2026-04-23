"use client";

import { Loading } from "@/components/ui/Loading";
import { PageTitle } from "@/components/ui/PageTitle";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useHash } from "@/hooks/useHash";
import { FaFileImport } from "react-icons/fa6";
import { FaSyncAlt } from "react-icons/fa";
import { Banners } from "@/types/banner";
import { Button } from "@/components/ui/Button";
import { useStorageStore } from "@/store/useStorageStore";
import { useImportStore } from "@/store/useImportStore";
import { TypeCard } from "./components/TypeCard";
import { ImportRecords } from "./components/ImportRecords";
import { PullHistory } from "./components/PullHistory";
import { RecentPulls } from "./components/RecentPulls";
import { RecentBanners } from "./components/RecentBanners";
import { DetailRecords } from "./components/DetailRecords";
import { Catalogs } from "@/types/catalog";
import { Enums } from "@/types/enums";
import { RecordItem } from "@/types/profile";

type PageContentProps = {
  types: Types;
  banners: Banners;
  catalogs: Catalogs;
  rarities: Enums["rarities"];
};

type Types = {
  bannerTypes: TypeItem[];
  weaponTypes: TypeItem[];
};

type TypeItem = {
  id: string;
  name: string;
  icon: string;
  subIcons?: string[];
  r5PityLimit: number;
  r6PityLimit: number;
  guaranteeAt?: number;
};

export const PageContent = ({
  types,
  banners,
  catalogs,
  rarities,
}: PageContentProps) => {
  const t = useTranslations("TrackerPage");

  const hasHydrated = useStorageStore((s) => s.hasHydrated);
  const profile = useStorageStore((s) => s.getCurrentProfile());
  const importRecords = useImportStore((s) => s.importRecords);
  const isImporting = useImportStore((s) => s.isImporting);
  const processType = useImportStore((s) => s.processType);

  const [selectedBannerId, setSelectedBannerId] = useState<string | null>(null);

  const [isOpenImport, setIsOpenImport] = useState(false);

  const combinedHeadhuntTypes = useMemo(
    () => [...types.bannerTypes, ...types.weaponTypes],
    [types],
  );

  const hashList = useMemo(
    () => combinedHeadhuntTypes.map((e) => e.id),
    [combinedHeadhuntTypes],
  );

  const hash = useHash(hasHydrated ? types.bannerTypes[0]?.id : "", hashList);

  const isBannerType = useMemo(
    () => types.bannerTypes.some((t) => t.id === hash),
    [types.bannerTypes, hash],
  );

  const { records, bannerIds } = useMemo(() => {
    if (!hasHydrated) {
      return { records: [], bannerIds: new Set<string>() };
    }

    const allRecords = profile?.stores?.headhunt?.records;
    const bannerIds = new Set<string>();

    const isMainType = types.bannerTypes.slice(0, 2).some((t) => t.id === hash);

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
      const baseKey = hash.split("_")[0];
      const source = allRecords?.[baseKey] ?? [];

      result = source.filter((r) => r.bannerId === hash);
    }

    return { records: result, bannerIds };
  }, [
    hasHydrated,
    profile?.stores?.headhunt?.records,
    types.bannerTypes,
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
    importRecords(profile?.stores?.headhunt?.url, "sync");
  };

  const resetKey = `${hash}-${selectedBannerId ?? "all"}`;

  return (
    <>
      <PageTitle title={t("pageTitle")}>
        <div className="flex gap-2">
          <Button
            onClick={handleSync}
            variant="secondary"
            disabled={
              !hasHydrated || !profile?.stores?.headhunt?.url || isImporting
            }
          >
            {isImporting && processType === "sync" ? (
              <>
                <FaSyncAlt className="animate-spin" />
                <span>{t("syncing")}</span>
              </>
            ) : (
              <>
                <FaSyncAlt />
                <span>{t("sync")}</span>
              </>
            )}
          </Button>
          <Button
            onClick={() => setIsOpenImport(true)}
            disabled={!hasHydrated || (isImporting && processType === "sync")}
          >
            <FaFileImport />
            {isImporting && processType === "import" ? (
              <span>{t("importing")}</span>
            ) : (
              <span>{t("import")}</span>
            )}
          </Button>
        </div>
      </PageTitle>

      <div className="flex flex-col flex-1 gap-2 xl:gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2">
          {types.bannerTypes.map((type) => {
            const types = hasHydrated
              ? profile?.stores?.headhunt?.types[type.id]
              : undefined;

            return (
              <TypeCard
                key={type.id}
                hash={type.id}
                name={type.name}
                icon={type.icon}
                subIcons={type.subIcons}
                pity5={types?.r5Pity ?? 0}
                pity6={types?.r6Pity ?? 0}
                pity5Limit={type.r5PityLimit}
                pity6Limit={type.r6PityLimit}
                isSelected={type.id === hash}
              />
            );
          })}
        </div>

        {!hasHydrated ? (
          <div className="flex flex-1 justify-center items-center my-40">
            <Loading label={t("loading")} />
          </div>
        ) : profile?.stores?.headhunt?.records ? (
          <div className="flex flex-col xl:flex-row gap-4 w-full">
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex flex-col gap-2">
                {types.weaponTypes.map((type) => {
                  const banners = profile.stores?.headhunt?.banners[type.id];

                  return (
                    <TypeCard
                      key={type.id}
                      hash={type.id}
                      name={type.name}
                      icon={type.icon}
                      pity5={banners?.r5Pity ?? 0}
                      pity6={banners?.r6Pity ?? 0}
                      pity5Limit={type.r5PityLimit}
                      pity6Limit={type.r6PityLimit}
                      isSelected={type.id === hash}
                    />
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 top-4 xl:sticky xl:z-50">
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
                    label={banners[selectedBannerId]?.name ?? selectedBannerId}
                    stats={profile.stores?.headhunt?.banners[selectedBannerId]}
                    hash={hash}
                  />
                ) : (
                  <DetailRecords
                    label={headhuntTypesMap.get(hash)?.name}
                    stats={
                      isBannerType
                        ? profile.stores?.headhunt?.types[hash]
                        : profile.stores?.headhunt?.banners[hash]
                    }
                    hash={hash}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-2">
              <RecentPulls
                key={`recent-${resetKey}`}
                hash={hash}
                records={records}
                catalogs={catalogs}
                rarities={rarities}
                guaranteedLimit={guaranteeLimit}
              />
              <PullHistory
                key={`record-${resetKey}`}
                hash={hash}
                records={records}
                catalogs={catalogs}
                banners={banners}
                rarities={rarities}
                disabled={!profile?.stores?.headhunt?.url || isImporting}
                isSyncing={isImporting && processType === "sync"}
                onSync={handleSync}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1 justify-center items-center bg-neutral-800/80 rounded-xl gap-2 px-3 py-2">
            <div>
              {profile?.stores?.headhunt?.records
                ? t("noGachaRecords")
                : t("noRecordImported")}
            </div>
            {profile?.stores?.headhunt ? (
              <Button
                onClick={handleSync}
                variant="secondary"
                disabled={!profile.stores.headhunt?.url || isImporting}
              >
                {isImporting && processType === "sync" ? (
                  <>
                    <FaSyncAlt className="animate-spin" />
                    <span>{t("syncing")}</span>
                  </>
                ) : (
                  <>
                    <FaSyncAlt />
                    <span>{t("sync")}</span>
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setIsOpenImport(true)}
                disabled={isImporting && processType === "sync"}
              >
                <FaFileImport />
                {isImporting && processType === "import" ? (
                  <span>{t("importing")}</span>
                ) : (
                  <span>{t("import")}</span>
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      <ImportRecords
        isOpen={isOpenImport}
        onClose={() => setIsOpenImport(false)}
      />
    </>
  );
};
