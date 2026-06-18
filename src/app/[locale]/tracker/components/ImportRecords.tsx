import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { Tabs } from '@/components/Tabs';
import { importUrlSchema } from '@/lib/validators/import-url';
import { useImportStore } from '@/store/useImportStore';
import { useState } from 'react';
import { FaFileImport, FaLink, FaPaste } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';
import { useTranslations } from 'next-intl';

type ImportRecordsProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ImportRecords = ({ isOpen, onClose }: ImportRecordsProps) => {
  const t = useTranslations('TrackerPage');
  const importRecords = useImportStore((s) => s.importRecords);
  const isImporting = useImportStore((s) => s.isImporting);

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (value: string) => {
    setUrl(value);
    const result = importUrlSchema.safeParse(value);
    setError(result.success ? '' : result.error.issues[0].message);
  };

  const handleImport = () => {
    if (isImporting) return;

    importRecords(url);
    onClose();
  };

  const command = `iwr "https://raw.githubusercontent.com/Yoo1ki/headhunt/refs/heads/main/get-record-url.ps1" -UseB | iex`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal title="Import Headhunting Records" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Tabs tabs={['Windows', 'Android', 'IOS']}>
          {/* <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="font-semibold">1.</div>
              <div>
                <div className="font-semibold">
                  Download & Install Requestly
                </div>
                <div className="text-sm text-white/80">
                  Visit the official website{" "}
                  <Link
                    className="text-yellow-500 font-semibold"
                    href="https://requestly.com"
                    target="_blank"
                  >
                    requestly.com
                  </Link>{" "}
                  to download and install{" "}
                  <span className="font-semibold">Requestly</span>.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">2.</div>
              <div>
                <div className="font-semibold">
                  Connect Requestly to the game
                </div>
                <div className="text-sm text-white/80">
                  Open <span className="font-semibold">Requestly</span>, click{" "}
                  <span className="font-semibold">Connect</span>, and then click{" "}
                  <span className="font-semibold">
                    Enable Requestly system-wide
                  </span>{" "}
                  at the bottom of the app to monitor network traffic.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">3.</div>
              <div>
                <div className="font-semibold">Open Headhunting Records</div>
                <div className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">4.</div>
              <div>
                <div className="font-semibold">Locate the required request</div>
                <div className="text-sm text-white/80">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="font-semibold">5.</div>
              <div>
                <div className="font-semibold">Copy the request URL</div>
                <div className="text-sm text-white/80">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex flex-col gap-2">
            {/* Step 1 */}
            <div className="flex gap-2">
              <div className="font-semibold">1.</div>
              <div>
                <div className="font-semibold">
                  {t('ImportRecords.WindowsSteps.openHeadHuntingTitle')}
                </div>
                <div className="text-sm text-white/80">
                  {t.rich('ImportRecords.WindowsSteps.openHeadHuntingDesc', {
                    game: (chunks) => <strong>{chunks}</strong>,
                    menu: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-2">
              <div className="font-semibold">2.</div>
              <div>
                <div className="font-semibold">
                  {t('ImportRecords.WindowsSteps.openPowerShellTitle')}
                </div>
                <div className="text-sm text-white/80">
                  {t.rich('ImportRecords.WindowsSteps.openPowerShellDesc', {
                    app: (chunks) => <strong>{chunks}</strong>,
                    key: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-2">
              <div className="font-semibold">3.</div>

              <div className="flex-1">
                <div className="font-semibold">
                  {t('ImportRecords.WindowsSteps.runCommandTitle')}
                </div>

                <div className="text-sm text-white/80">
                  {t.rich('ImportRecords.WindowsSteps.runCommandDesc', {
                    app: (chunks) => <strong>{chunks}</strong>,
                    key: (chunks) => <strong>{chunks}</strong>,
                  })}
                </div>
                <div className="mt-1 flex items-start justify-between rounded bg-black/30 p-2 text-sm text-white/80">
                  <code className="break-all">{command}</code>

                  <button
                    onClick={handleCopy}
                    className="ml-2 cursor-pointer rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20 active:bg-white/30"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="font-semibold">Coming soon!</div>
          <div className="font-semibold">Coming soon!</div>
        </Tabs>
        <div className="rounded-md border-l-2 border-yellow-500 bg-yellow-500/20 py-0.5 pr-0.5 pl-4 text-sm font-light italic">
          <p>
            {t.rich('importInstruction', {
              bold: (chunks) => <span className="font-semibold">{chunks}</span>,
            })}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleImport();
          }}
          className="flex flex-col gap-2"
        >
          <div className="font-semibold">{t('pasteUrl')}</div>

          <div className="relative">
            <FaLink className="absolute top-1/2 left-3 -translate-y-1/2 text-white" />
            <input
              type="text"
              value={url}
              onChange={(e) => validateUrl(e.target.value)}
              placeholder="https://ef-webview.gryphline.com/page/gacha_char?..."
              className={`w-full rounded-xl bg-neutral-900/80 py-2 pr-3 pl-10 text-white focus:outline-none ${
                error
                  ? 'ring-2 ring-red-500'
                  : 'focus:ring-2 focus:ring-yellow-500'
              }`}
              inputMode="text"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div>
              {error && (
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <MdError />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    validateUrl(text);
                  } catch {}
                }}
              >
                <FaPaste />
                <span>Paste</span>
              </Button>
              <Button type="submit" disabled={isImporting || !url || !!error}>
                <FaFileImport />
                <span>{isImporting ? t('importing') : t('import')}</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
