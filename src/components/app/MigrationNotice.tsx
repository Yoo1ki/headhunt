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
      <div className="flex flex-col gap-5 pt-4">
        <div className="flex items-center gap-3 rounded-xl bg-green-400/10 p-3">
          <FaCircleCheck className="shrink-0 text-2xl text-green-300" />
          <p className="text-sm leading-relaxed font-semibold text-green-50">
            {t('fixedLabel')}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-white/70">
          {t('description')}
        </p>
        <div className="flex justify-end pt-4">
          <Button onClick={dismissMigrationNotice} size="sm">
            <FaCircleCheck />
            {t('dismiss')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
