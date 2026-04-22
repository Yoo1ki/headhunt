import { PageContent } from "./PageContent";
import { getLocale } from "next-intl/server";
import { Operator } from "@/types/operator";
import { Enums } from "@/types/enums";

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
