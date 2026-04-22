import { CONFIG } from "@/config";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("App");
  const y = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800/80 p-4 lg:rounded-xl w-full">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-2 items-center text-center justify-between text-sm text-white/80">
          <div className="lg:text-left text-center">
            <p>{`${CONFIG.appName} ${t("disclaimerP1")}`}</p>
            <p>{t("disclaimerP2")}</p>
          </div>
          <div className="lg:text-right text-center">
            <div className="flex gap-2 justify-end">
              <Link
                href="/privacy-policy"
                className="hover:text-yellow-500 duration-300"
              >
                Privacy Policy
              </Link>
              •
              <Link
                href="https://discord.gg/uJt4sHYvT"
                className="hover:text-yellow-500 duration-300"
                target="_blank"
              >
                Discord
              </Link>
            </div>
            <p className="font-semibold">
              &copy; {CONFIG.since}
              {y > CONFIG.since && " - " + y} {CONFIG.appName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
