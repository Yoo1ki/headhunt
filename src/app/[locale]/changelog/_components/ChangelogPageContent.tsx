'use client';

import { PageTitle } from '@/components/ui/PageTitle';
import { useLocale, useTranslations } from 'next-intl';
import {
  FaArrowRightArrowLeft,
  FaChartSimple,
  FaCloudArrowUp,
  FaFileArrowDown,
  FaPalette,
  FaUserGroup,
} from 'react-icons/fa6';

const changes = [
  { key: 'cloudBackup', icon: FaCloudArrowUp },
  { key: 'localBackup', icon: FaFileArrowDown },
  { key: 'profiles', icon: FaUserGroup },
  { key: 'importV2', icon: FaArrowRightArrowLeft },
  { key: 'statistics', icon: FaChartSimple },
  { key: 'interface', icon: FaPalette },
] as const;

export const ChangelogPageContent = () => {
  const t = useTranslations('ChangelogPage');
  const locale = useLocale();
  const releaseDate = new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeZone: 'Asia/Jakarta',
  }).format(new Date('2026-09-03T00:00:00+07:00'));

  return (
    <>
      <PageTitle title={t('title')} desc={t('description')} />

      <div className="flex flex-1 flex-col gap-4">
        <article className="overflow-hidden rounded-2xl bg-linear-to-br from-yellow-500/10 via-neutral-800/90 to-neutral-900/90 shadow-xl shadow-black/10">
          <header className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {t('releaseTitle')}
                </h2>
                <span className="rounded-full bg-yellow-400/15 px-2.5 py-1 text-xs font-bold tracking-wide text-yellow-200 uppercase">
                  {t('latest')}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/50">{releaseDate}</p>
            </div>
            <span className="w-fit rounded-lg bg-white/5 px-3 py-1.5 font-mono text-sm font-semibold text-white/65">
              2026.09.03
            </span>
          </header>

          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
            {changes.map(({ key, icon: Icon }) => (
              <section
                key={key}
                className="group rounded-xl bg-neutral-950/35 p-4 transition-colors hover:bg-neutral-950/50"
              >
                <div className="flex items-start gap-3">
                  <span className="rounded-xl bg-yellow-400/12 p-2.5 text-yellow-300 transition-colors group-hover:bg-yellow-400/18">
                    <Icon className="text-lg" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-white">
                      {t(`changes.${key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {t(`changes.${key}.description`)}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </>
  );
};
