export interface SKPortGuideGear {
  code: number;
  message: string;
  timestamp: string;
  data: Data;
}

interface Data {
  equips: Equip[];
}

interface Equip {
  id: string;
  name: string;
  iconUrl: string;
  rarity: Rarity;
  type: Rarity;
  level: Rarity;
  properties: string[];
  isAccessory: boolean;
  suit: Suit | null;
  function: string;
  pkg: string;
  baseAttrValue: number;
  canEnhance: boolean;
}

interface Suit {
  id: string;
  name: string;
  skillId: string;
  skillDesc: string;
  skillDescParams: Record<string, string>;
}

interface Rarity {
  key: string;
  value: string;
}
