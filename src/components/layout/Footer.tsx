import { CONFIG } from '@/config';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('App');

  return (
    <footer className="w-full bg-neutral-800/80 p-4 lg:rounded-xl">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-white/80 lg:flex-row">
          <div className="text-center lg:text-left">
            <p>{`${CONFIG.appName} ${t('disclaimerP1')}`}</p>
            <p>{t('disclaimerP2')}</p>
          </div>
          <div className="text-center lg:text-right">
            <div className="flex justify-center gap-2 lg:justify-end">
              <Link
                href="/changelog"
                className="flex items-center gap-1.5 duration-300 hover:text-yellow-500"
              >
                {t('changelog')}
                <span className="rounded-full bg-yellow-400 px-1.5 py-0.5 text-[9px] leading-none font-bold text-neutral-950">
                  {t('new')}
                </span>
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/privacy-policy"
                className="duration-300 hover:text-yellow-500"
              >
                {t('privacyPolicy')}
              </Link>
              <span aria-hidden="true">•</span>
              <Link
                href="/terms-of-service"
                className="duration-300 hover:text-yellow-500"
              >
                {t('termsOfService')}
              </Link>
              {/* •
              <Link
                href={CONFIG.discordUrl}
                target="_blank"
                className="hover:text-yellow-500 duration-300"
              >
                Discord
              </Link> */}
            </div>
            <p className="font-semibold">Build ID: {CONFIG.buildId}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
