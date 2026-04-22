import { PageContent } from "./PageContent";
import { getLocale } from "next-intl/server";
import { Operator } from "@/types/operator";
import { Enums } from "@/types/enums";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata() {
  const t = await getTranslations("OperatorsPage");

  const metadata: Metadata = {
    title: t("title"),
  };

  return metadata;
}

export default async function OperatorsPage() {
  const locale = await getLocale();

  const [enums, operators] = await Promise.all([
    import(`@/data/enums/${locale}.json`).then((m) => m.default as Enums),
    import(`@/data/operators/${locale}.json`).then(
      (m) => m.default as Operator[],
    ),
  ]);

  return (
    <PageContent
      rarities={enums.rarities}
      elements={enums.elements}
      opClass={enums.opClass}
      operators={operators}
    />
  );
}
