import { PageTitle } from '@/components/ui/PageTitle';
import { CONFIG } from '@/config';

export const PrivacyPolicyPageContent = () => {
  return (
    <>
      <PageTitle title={'Privacy Policy'}>
        <p>
          <span className="font-semibold">Last updated:</span> 2 September 2026
        </p>
      </PageTitle>

      <div className="flex flex-1 flex-col gap-5 rounded-xl bg-neutral-800/80 p-5">
        {/* 1 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to {CONFIG.appName}. Your privacy is important to us. This
            Privacy Policy explains how we handle your data when you use our
            website.
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">2. Data Collection</h2>
          <p>
            {CONFIG.appName} does not maintain a user account database or
            permanently store your gacha history on our servers.
          </p>
          <p>
            All application data (such as gacha history, pity records, or
            imported data) is stored <strong>locally in your browser</strong>.
          </p>
        </div>

        {/* 3 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">3. Local Storage</h2>
          <p>We use your browser’s local storage to:</p>
          <ul className="list-disc pl-6">
            <li>Save your gacha URL or token</li>
            <li>Save your gacha history and pity tracking data</li>
          </ul>
          <p>
            This data stays on your device unless you choose to import records
            or enable Google Drive backup. Local data can be deleted at any time
            by clearing your browser data.
          </p>
        </div>

        {/* 4 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">4. Token Usage</h2>
          <p>
            Your gacha URL or token is only used temporarily to load roll
            history and is never stored or persisted on our servers.
          </p>
        </div>

        {/* 5 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">5. Google Drive Backup</h2>
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
        </div>

        {/* 6 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">6. Cookies</h2>
          <p>
            {CONFIG.appName} may use minimal cookies or browser storage for
            functionality, but not for tracking personal identity.
          </p>
        </div>

        {/* 7 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">7. Third-Party Services</h2>
          <p>
            We use third-party services such as Google Drive, game-related
            endpoints, and content delivery networks. Data handled by those
            services is subject to their respective privacy policies.
          </p>
        </div>

        {/* 8 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            reflected on this page.
          </p>
        </div>
      </div>
    </>
  );
};
