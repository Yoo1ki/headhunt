import { PageTitle } from '@/components/ui/PageTitle';
import { CONFIG } from '@/config';

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
  return (
    <>
      <PageTitle
        title="Privacy Policy"
        desc="Last updated: 2 September 2026"
        descPosition="right"
      />

      <article className="flex flex-1 flex-col gap-2 rounded-xl bg-neutral-800/80 p-3 sm:p-4">
        <Section title="1. Introduction">
          <p>
            Welcome to {CONFIG.appName}. Your privacy is important to us. This
            Privacy Policy explains how we handle your data when you use our
            website.
          </p>
        </Section>

        <Section title="2. Data Collection">
          <p>
            {CONFIG.appName} does not maintain a user account database or
            permanently store your gacha history on our servers.
          </p>
          <p>
            All application data (such as gacha history, pity records, or
            imported data) is stored <strong>locally in your browser</strong>.
          </p>
        </Section>

        <Section title="3. Local Storage">
          <p>We use your browser’s local storage to:</p>
          <ul className="list-disc space-y-1 pl-6 marker:text-white/35">
            <li>Save your gacha URL or token</li>
            <li>Save your gacha history and pity tracking data</li>
          </ul>
          <p>
            This data stays on your device unless you choose to import records
            or enable Google Drive backup. Local data can be deleted at any time
            by clearing your browser data.
          </p>
        </Section>

        <Section title="4. Token Usage">
          <p>
            Your gacha URL or token is only used temporarily to load roll
            history and is never stored or persisted on our servers.
          </p>
        </Section>

        <Section title="5. Google Drive Backup">
          <p>
            If you connect Google Drive, backup data is sent directly from your
            browser to the application data folder in your Google Drive. The
            backup may contain your profiles, gacha records, statistics, and
            import URL or token.
          </p>
          <p>
            We request the limited Google Drive application-data permission. The
            Google access token is kept in browser memory and is not stored in
            local storage or included in backup files.
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            {CONFIG.appName} may use minimal cookies or browser storage for
            functionality, but not for tracking personal identity.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>
            We use third-party services such as Google Drive, game-related
            endpoints, and content delivery networks. Data handled by those
            services is subject to their respective privacy policies.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            reflected on this page.
          </p>
        </Section>
      </article>
    </>
  );
};
