import { PageContent } from "./PageContent";
import { getLocale } from "next-intl/server";
import { Weapon } from "@/types/weapons";
import { Enums } from "@/types/enums";

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
