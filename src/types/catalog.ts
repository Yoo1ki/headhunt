import { RarityId } from "./enums";

export type Catalogs = Record<string, Catalog>;

export type Catalog = {
  id: string;
  name: string;
  icon: string;
  rarityId: RarityId;
};
