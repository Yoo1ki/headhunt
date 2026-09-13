import { PageTitle } from '@/components/ui/PageTitle';
import { CONFIG } from '@/config';
import { useTranslations } from 'next-intl';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-lg bg-neutral-900/45 px-4 py-4 sm:px-5">
    <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
    <div className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-white/70 sm:text-base">
      {children}
    </div>
  </section>
);

export const PrivacyPolicyPageContent = () => {
  const t = useTranslations('PrivacyPolicy');
  const app = { appName: CONFIG.appName };

  return (
    <>
      <PageTitle title={t('title')} desc={t('updated')} descPosition="right" />

      <article className="flex flex-1 flex-col gap-2 rounded-xl bg-neutral-800/80 p-3 sm:p-4">
        <Section title={t('introduction.title')}>
          <p>{t('introduction.text', app)}</p>
        </Section>

        <Section title={t('dataCollection.title')}>
          <p>{t('dataCollection.server', app)}</p>
          <p>{t('dataCollection.local')}</p>
        </Section>

        <Section title={t('localStorage.title')}>
          <p>{t('localStorage.intro')}</p>
          <ul className="list-disc space-y-1 pl-6 marker:text-white/35">
            <li>{t('localStorage.url')}</li>
            <li>{t('localStorage.history')}</li>
          </ul>
          <p>{t('localStorage.details')}</p>
        </Section>

        <Section title={t('token.title')}>
          <p>{t('token.text')}</p>
        </Section>

        <Section title={t('drive.title')}>
          <p>{t('drive.backup')}</p>
          <p>{t('drive.permission')}</p>
        </Section>

        <Section title={t('analytics.title')}>
          <p>{t('analytics.collection')}</p>
          <p>
            {t('analytics.processing')}{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noreferrer"
              className="text-yellow-300 underline hover:text-yellow-200"
            >
              {t('analytics.googleDataLink')}
            </a>
            .
          </p>
        </Section>

        <Section title={t('cookies.title')}>
          <p>{t('cookies.text', app)}</p>
          <p>
            {t('cookies.optOutIntro')}{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noreferrer"
              className="text-yellow-300 underline hover:text-yellow-200"
            >
              {t('cookies.optOutLink')}
            </a>{' '}
            where supported.
          </p>
        </Section>

        <Section title={t('thirdParty.title')}>
          <p>{t('thirdParty.text')}</p>
        </Section>

        <Section title={t('changes.title')}>
          <p>{t('changes.text')}</p>
        </Section>
      </article>
    </>
  );
};
