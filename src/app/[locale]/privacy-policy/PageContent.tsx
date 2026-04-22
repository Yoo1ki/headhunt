import { PageTitle } from "@/components/ui/PageTitle";

export const PageContent = () => {
  return (
    <>
      <PageTitle title={"Privacy Policy"} />

      <p>
        <span className="font-semibold">Last updated:</span> 22 April 2026
      </p>

      <div className="flex flex-col gap-5 mt-5">
        {/* 1 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to Headhunt.cc. Your privacy is important to us. This
            Privacy Policy explains how we handle your data when you use our
            website.
          </p>
        </div>

        {/* 2 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">2. Data Collection</h2>
          <p>
            Headhunt.cc does{" "}
            <strong>
              not collect, store, or process personal data on our servers
            </strong>
            .
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
            This data stays on your device, is not transmitted to our servers,
            and can be deleted at any time by clearing your browser data.
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
          <h2 className="text-2xl font-semibold">5. Cookies</h2>
          <p>
            Headhunt.cc may use minimal cookies or browser storage for
            functionality, but not for tracking personal identity.
          </p>
        </div>

        {/* 6 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">6. Third-Party Services</h2>
          <p>
            We may use third-party services such as analytics tools or content
            delivery networks (CDN). These services may collect anonymous usage
            data according to their own privacy policies.
          </p>
        </div>

        {/* 7 */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            reflected on this page.
          </p>
        </div>
      </div>
    </>
  );
};
