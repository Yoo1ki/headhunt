'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useStorageStore } from '@/store/useStorageStore';
import { useTranslations } from 'next-intl';
import { FaCircleCheck } from 'react-icons/fa6';

export const MigrationNotice = () => {
  const t = useTranslations('TrackerPage.migrationNotice');
  const migrationNotice = useStorageStore((state) => state.migrationNotice);
  const dismissMigrationNotice = useStorageStore(
    (state) => state.dismissMigrationNotice
  );

  return (
    <Modal
      title={t('title')}
      isOpen={migrationNotice}
      onClose={dismissMigrationNotice}
    >
      <div className="flex flex-col items-center px-1 py-2 text-center sm:px-4 sm:py-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-2xl text-emerald-300 shadow-lg shadow-emerald-950/20">
          <FaCircleCheck aria-hidden="true" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-white sm:text-lg">
          {t('fixedLabel')}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
          {t('description')}
        </p>

        <Button
          className="mt-6 w-full sm:w-auto sm:min-w-32"
          onClick={dismissMigrationNotice}
        >
          <FaCircleCheck aria-hidden="true" />
          {t('dismiss')}
        </Button>
      </div>
    </Modal>
  );
};
