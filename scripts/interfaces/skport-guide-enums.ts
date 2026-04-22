export interface SKPortGuideEnums {
  code: number;
  message: string;
  timestamp: string;
  data: Data;
}

interface Data {
  rarities: Item[];
  professions: Item[];
  charProperties: Item[];
  weaponTypes: Item[];
  skillTypes: Item[];
  skillProperties: Item[];
  labelTypes: Item[];
  equipRarities: Item[];
  equipTypes: Item[];
  equipLevels: Item[];
  activeEffectTypes: Item[];
  passiveEffectTypes: Item[];
  equipProperties: Item[];
  equipAbilities: Item[];
  suitTypes: Item[];
  achievementFirstCategories: Item[];
  gemRarities: Item[];
}

interface Item {
  key: string;
  value: string;
}
