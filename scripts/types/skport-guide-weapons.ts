export interface SKPortGuideWeapons {
  code: number;
  message: string;
  timestamp: string;
  data: Data;
}

interface Data {
  weapons: Weapon[];
}

interface Weapon {
  id: string;
  name: string;
  iconUrl: string;
  rarity: Rarity;
  type: Rarity;
  function: string;
  description: string;
  skills: Rarity[];
  labelType?: string;
}

interface Rarity {
  key: string;
  value: string;
}
