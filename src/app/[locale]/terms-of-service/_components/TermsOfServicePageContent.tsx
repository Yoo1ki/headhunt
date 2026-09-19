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

export const TermsOfServicePageContent = () => {
  const t = useTranslations('TermsOfService');
  const app = { appName: CONFIG.appName };

  return (
    <>
      <PageTitle title={t('title')} desc={t('updated')} descPosition="right" />

      <article className="flex flex-1 flex-col gap-2 rounded-xl bg-neutral-800/80 p-3 sm:p-4">
        <Section title={t('acceptance.title')}>
          <p>{t('acceptance.text', app)}</p>
        </Section>

        <Section title={t('description.title')}>
          <p>{t('description.text', app)}</p>
        </Section>

        <Section title={t('drive.title')}>
          <p>{t('drive.access', app)}</p>
          <p>{t('drive.responsibility')}</p>
        </Section>

        <Section title={t('responsibilities.title')}>
          <ul className="list-disc space-y-1 pl-6 marker:text-white/35">
            <li>{t('responsibilities.lawful')}</li>
            <li>{t('responsibilities.account')}</li>
            <li>{t('responsibilities.abuse')}</li>
            <li>{t('responsibilities.private')}</li>
            <li>{t('responsibilities.verify')}</li>
          </ul>
        </Section>

        <Section title={t('thirdParty.title')}>
          <p>{t('thirdParty.text')}</p>
        </Section>

        <Section title={t('intellectualProperty.title')}>
          <p>{t('intellectualProperty.text', app)}</p>
        </Section>

        <Section title={t('warranties.title')}>
          <p>{t('warranties.text')}</p>
        </Section>

        <Section title={t('liability.title')}>
          <p>{t('liability.text', app)}</p>
        </Section>

        <Section title={t('changes.title')}>
          <p>{t('changes.text')}</p>
        </Section>

        <Section title={t('contact.title')}>
          <p>{t('contact.text', app)}</p>
        </Section>
      </article>
    </>
  );
};
