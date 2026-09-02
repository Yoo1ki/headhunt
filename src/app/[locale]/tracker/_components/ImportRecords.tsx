import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { importUrlSchema } from '@/lib/validators/import-url';
import { useImportStore } from '@/store/useImportStore';
import { useStorageStore } from '@/store/useStorageStore';
import { useTranslations } from 'next-intl';
import { useEffect, useState, type ReactNode } from 'react';
import {
  FaCheck,
  FaClipboard,
  FaCircleInfo,
  FaClock,
  FaFileImport,
  FaLink,
  FaPaste,
  FaTerminal,
  FaUser,
} from 'react-icons/fa6';
import { MdError } from 'react-icons/md';

type ImportRecordsProps = {
  isOpen: boolean;
  onClose: () => void;
};

type StepProps = {
  number: number;
  title: string;
  children: ReactNode;
};

const Step = ({ number, title, children }: StepProps) => (
  <div className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-yellow-400/15 text-sm font-bold text-yellow-300">
      {number}
    </span>
    <div className="min-w-0 flex-1">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <div className="mt-1 text-sm leading-relaxed text-white/60">
        {children}
      </div>
    </div>
  </div>
);

export const ImportRecords = ({ isOpen, onClose }: ImportRecordsProps) => {
  const t = useTranslations('TrackerPage.ImportRecords');
  const trackerT = useTranslations('TrackerPage');
  const importRecords = useImportStore((state) => state.importRecords);
  const isImporting = useImportStore((state) => state.isImporting);
  const profiles = useStorageStore((state) => state.profiles);
  const currentProfileId = useStorageStore((state) => state.currentProfileId);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [targetProfileId, setTargetProfileId] = useState(currentProfileId);

  const profileEntries = Object.entries(profiles);
  const targetProfile = profiles[targetProfileId];

  const command =
    'iwr "https://raw.githubusercontent.com/Yoo1ki/headhunt/refs/heads/main/get-record-url.ps1" -UseB | iex';

  useEffect(() => {
    if (isOpen) {
      setTargetProfileId(currentProfileId);
      return;
    }

    if (!isOpen) {
      setError('');
      setCopied(false);
    }
  }, [currentProfileId, isOpen]);

  const validateUrl = (value: string) => {
    const normalizedValue = value.trim();
    setUrl(normalizedValue);
    if (!normalizedValue) {
      setError('');
      return;
    }
    setError(
      importUrlSchema.safeParse(normalizedValue).success ? '' : t('invalidUrl')
    );
  };

  const handleImport = () => {
    if (isImporting || !url || error || !targetProfile) return;
    importRecords(url, 'import', targetProfileId);
    onClose();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const comingSoon = (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/3 px-4 py-10 text-center">
      <FaClock className="text-2xl text-white/35" />
      <h3 className="mt-3 font-semibold text-white">{t('comingSoonTitle')}</h3>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-white/50">
        {t('comingSoonDescription')}
      </p>
    </div>
  );

  return (
    <Modal title={t('title')} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
        <Tabs tabs={['Windows', 'Android', 'iOS']}>
          <div className="flex flex-col gap-3">
            <Step number={1} title={t('WindowsSteps.openHeadHuntingTitle')}>
              {t.rich('WindowsSteps.openHeadHuntingDesc', {
                game: (chunks) => (
                  <strong className="text-white/85">{chunks}</strong>
                ),
                menu: (chunks) => (
                  <strong className="text-white/85">{chunks}</strong>
                ),
              })}
            </Step>
            <Step number={2} title={t('WindowsSteps.openPowerShellTitle')}>
              {t.rich('WindowsSteps.openPowerShellDesc', {
                app: (chunks) => (
                  <strong className="text-white/85">{chunks}</strong>
                ),
                key: (chunks) => (
                  <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-medium text-white/85">
                    {chunks}
                  </kbd>
                ),
              })}
            </Step>
            <Step number={3} title={t('WindowsSteps.runCommandTitle')}>
              <p>
                {t.rich('WindowsSteps.runCommandDesc', {
                  app: (chunks) => (
                    <strong className="text-white/85">{chunks}</strong>
                  ),
                  key: (chunks) => (
                    <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-medium text-white/85">
                      {chunks}
                    </kbd>
                  ),
                })}
              </p>
              <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-neutral-950/70">
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs text-white/45">
                  <span className="flex items-center gap-1.5">
                    <FaTerminal />
                    PowerShell
                  </span>
                  <button
                    type="button"
                    onClick={() => void handleCopy()}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {copied ? (
                      <FaCheck className="text-green-300" />
                    ) : (
                      <FaClipboard />
                    )}
                    {t(copied ? 'copied' : 'copy')}
                  </button>
                </div>
                <code className="block p-3 text-xs leading-relaxed break-all whitespace-pre-wrap text-white/70">
                  {command}
                </code>
              </div>
            </Step>
          </div>
          {comingSoon}
          {comingSoon}
        </Tabs>

        <div className="flex items-start gap-3 rounded-xl border border-yellow-400/20 bg-yellow-500/10 p-3 text-yellow-100">
          <FaCircleInfo className="mt-0.5 shrink-0 text-yellow-300" />
          <p className="text-sm leading-relaxed text-white/70 italic">
            {trackerT.rich('importInstruction', {
              bold: (chunks) => (
                <strong className="font-semibold text-white/85">
                  {chunks}
                </strong>
              ),
            })}
          </p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleImport();
          }}
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="mb-4">
            <label
              htmlFor={profileEntries.length > 1 ? 'import-profile' : undefined}
              className="font-semibold text-white"
            >
              {t('targetProfile')}
            </label>
            <p className="mt-1 text-sm leading-relaxed text-white/50">
              {t(
                profileEntries.length > 1
                  ? 'targetProfileDescription'
                  : 'singleTargetProfileDescription'
              )}
            </p>

            {profileEntries.length > 1 ? (
              <div className="relative mt-3">
                <FaUser className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/35" />
                <select
                  id="import-profile"
                  value={targetProfileId}
                  onChange={(event) => setTargetProfileId(event.target.value)}
                  disabled={isImporting}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-neutral-950/60 py-2.5 pr-10 pl-10 text-sm text-white transition-colors outline-none focus:border-yellow-400/60 disabled:opacity-50"
                >
                  {profileEntries.map(([id, profile]) => (
                    <option key={id} value={id}>
                      {profile.name ?? t('unnamedProfile')}
                      {id === currentProfileId
                        ? ` — ${t('activeProfile')}`
                        : ''}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-white/35">
                  ▼
                </span>
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-yellow-400/20 bg-yellow-500/10 p-3">
                <span className="rounded-lg bg-yellow-400/15 p-2 text-yellow-300">
                  <FaUser />
                </span>
                <span className="min-w-0 text-sm font-medium text-white/85">
                  {targetProfile?.name ?? t('unnamedProfile')}
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <label htmlFor="import-url" className="font-semibold text-white">
              {t('urlLabel')}
            </label>
            <p className="mt-1 text-sm leading-relaxed text-white/50">
              {t('urlDescription')}
            </p>
            <div className="relative mt-3">
              <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-white/35" />
              <input
                id="import-url"
                type="url"
                value={url}
                onChange={(event) => validateUrl(event.target.value)}
                placeholder="https://ef-webview.gryphline.com/page/gacha_char?..."
                className={`w-full rounded-xl border bg-neutral-950/60 py-2.5 pr-3 pl-10 text-sm text-white transition-colors outline-none placeholder:text-white/25 ${error ? 'border-red-400/60 focus:border-red-400' : 'border-white/10 focus:border-yellow-400/60'}`}
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <div className="mt-2 min-h-5">
              {error && (
                <p
                  className="flex items-center gap-1.5 text-sm text-red-300"
                  role="alert"
                >
                  <MdError />
                  <span>{error}</span>
                </p>
              )}
            </div>
            <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  try {
                    validateUrl(await navigator.clipboard.readText());
                  } catch {
                    setError(t('clipboardError'));
                  }
                }}
              >
                <FaPaste />
                {t('paste')}
              </Button>
              <Button
                type="submit"
                disabled={isImporting || !url || !!error || !targetProfile}
              >
                <FaFileImport />
                {isImporting
                  ? trackerT('importing')
                  : t('importToProfile', {
                      name: targetProfile?.name ?? t('unnamedProfile'),
                    })}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
