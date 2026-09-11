import { PageTitle } from '@/components/ui/PageTitle';
import { CONFIG } from '@/config';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex flex-col gap-2">
    <h2 className="text-xl font-semibold text-white sm:text-2xl">{title}</h2>
    <div className="flex flex-col gap-2 leading-relaxed text-white/80">
      {children}
    </div>
  </section>
);

export const TermsOfServicePageContent = () => {
  return (
    <>
      <PageTitle
        title="Terms of Service"
        desc="Last updated: 2 September 2026"
      />

      <div className="flex flex-1 flex-col gap-6 rounded-xl bg-neutral-800/80 p-5">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing or using {CONFIG.appName}, you agree to these Terms of
            Service. If you do not agree, please do not use the service.
          </p>
        </Section>

        <Section title="2. Description of the Service">
          <p>
            {CONFIG.appName} is an independent tool for importing, displaying,
            analyzing, backing up, and restoring Arknights: Endfield gacha
            history. Features may change, be suspended, or be discontinued at
            any time.
          </p>
        </Section>

        <Section title="3. Google Account and Drive Backups">
          <p>
            Google Drive integration is optional. If you connect a Google
            account, you authorize {CONFIG.appName} to create, update, and read
            its own backup file in the application data folder of your Google
            Drive.
          </p>
          <p>
            You are responsible for selecting the correct Google account and
            protecting access to it. You may disconnect Google Drive at any time
            from the application or revoke access through your Google Account
            settings.
          </p>
        </Section>

        <Section title="4. User Responsibilities">
          <ul className="list-disc space-y-1 pl-6">
            <li>Use the service only for lawful, personal purposes.</li>
            <li>Do not abuse, disrupt, or attempt to bypass the service.</li>
            <li>
              Keep exported backup files and gacha import URLs private because
              they may contain temporary access tokens.
            </li>
            <li>Verify important data before relying on calculated results.</li>
          </ul>
        </Section>

        <Section title="5. Third-Party Services">
          <p>
            The service interacts with third-party services, including Google
            Drive and game-related endpoints. Your use of those services is also
            governed by their respective terms and policies. We do not control
            their availability, accuracy, or behavior.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            The {CONFIG.appName} project code is made available under its
            repository license. Arknights: Endfield names, images, trademarks,
            game data, and other third-party materials remain the property of
            their respective owners and are not licensed by us.
          </p>
        </Section>

        <Section title="7. Disclaimer of Warranties">
          <p>
            The service is provided “as is” and “as available” without
            warranties of any kind. We do not guarantee uninterrupted access,
            complete data, accurate calculations, or compatibility with future
            game or third-party API changes.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, {CONFIG.appName} and its
            contributors will not be liable for lost data, account issues,
            service interruptions, or indirect or consequential damages arising
            from use of the service.
          </p>
        </Section>

        <Section title="9. Changes to These Terms">
          <p>
            We may update these Terms from time to time. The updated date will
            be shown on this page. Continued use after an update means you
            accept the revised Terms.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            Questions about these Terms can be submitted through the project’s
            official repository or community channels linked by {CONFIG.appName}
            .
          </p>
        </Section>
      </div>
    </>
  );
};
