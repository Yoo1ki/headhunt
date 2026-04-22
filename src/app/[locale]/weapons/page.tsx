import { PageContent } from "./PageContent";
import { getLocale } from "next-intl/server";
import { Weapon } from "@/types/weapons";
import { Enums } from "@/types/enums";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata() {
  const t = await getTranslations("WeaponsPage");

  const metadata: Metadata = {
    title: t("title"),
  };

  return metadata;
}

export default async function WeaponsPage() {
  const locale = await getLocale();

  const [enums, weapons] = await Promise.all([
    import(`@/data/enums/${locale}.json`).then((m) => m.default as Enums),
    import(`@/data/weapons/${locale}.json`).then((m) => m.default as Weapon[]),
  ]);

  return (
    <PageContent
      rarities={enums.rarities}
      wpTypes={enums.wpTypes}
      weapons={weapons}
    />
  );
}
