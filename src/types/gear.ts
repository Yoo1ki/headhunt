export type Gear = {
  id: string;
  name: string;
  icon: string;
  rarityId: string;
  typeId: string;
  levelId: string;
  propertyIds: string[];
  isAccessory: boolean;
  baseAttrValue: number;
  canEnhance: boolean;
  suit: GearSuit | null;
  detail?: GearDetail;
};

export type GearFilterOption = {
  id: string;
  name: string;
};

export type GearFilters = {
  rarities: GearFilterOption[];
  types: GearFilterOption[];
  levels: GearFilterOption[];
  properties: GearFilterOption[];
  suits: GearFilterOption[];
  flags: GearFilterOption[];
};

export type GearSuit = {
  id: string;
  name: string;
  skillId: string;
  skillDesc: string;
  skillDescParams: Record<string, string>;
};

export type GearDetail = {
  name: string;
  stats: GearStat[];
};

export type GearStat = {
  label: string;
  value: string;
};
