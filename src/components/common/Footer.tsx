import { CONFIG } from '@/config';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const t = useTranslations('App');
  const y = new Date().getFullYear();

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
                href="/privacy-policy"
                className="duration-300 hover:text-yellow-500"
              >
                Privacy Policy
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
            <p className="font-semibold">
              &copy; {CONFIG.since}
              {y > CONFIG.since && ' - ' + y} {CONFIG.appName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
