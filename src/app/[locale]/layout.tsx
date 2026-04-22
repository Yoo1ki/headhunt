import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { Footer } from "@/components/common/Footer";
import { ImportStatus } from "@/components/common/ImportStatus";
import { GoToTop } from "@/components/common/GoToTop";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  const t = await getTranslations("HomePage");

  const metadata: Metadata = {
    title: {
      default: `Headhunt.cc — ${t("title")}`,
      template: "%s — Headhunt.cc",
    },
    description: t("description"),
    keywords: [
      "Arknights Endfield",
      "Arknights Endfield pity",
      "Arknights Endfield gacha",
      "Arknights Endfield tracker",
      "Endfield pity tracker",
      "Endfield gacha tracker",
      "headhunting",
      "headhunt tracker",
      "headhunting pity",
      "headhunting records",
      "gacha tracker",
      "pity tracker",
      "pity counter",
      "pity checker",
      "check pity",
      "track pity",
      "gacha history",
      "pull history",
      "summon tracker",
      "free gacha tool",
      "gacha tools",
    ],
  };

  return metadata;
}

export default async function HomeLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <NextIntlClientProvider>
      <Header className="h-14 lg:relative fixed top-0 z-50" />
      <div className="relative lg:flex-1 lg:mt-0 mt-14">
        <div
          id="scroll-container"
          className="absolute inset-0 lg:overflow-y-auto flex flex-col"
        >
          <div className="lg:container lg:mx-auto lg:px-4 flex-1 lg:flex lg:gap-4">
            <div className="w-64 hidden lg:block">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col mt-4 lg:mb-4 gap-4">
              <main className="flex flex-col container mx-auto px-4 lg:px-0 flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <ImportStatus />
            <GoToTop />
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
