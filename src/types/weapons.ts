import type { InlineElement } from './api/rich-text';

export interface Weapon {
  id: string;
  name: string;
  icon: string;
  rarityId: string;
  HeadhuntTypeId: string;
  skillLabels: string[];
  detail: WeaponDetail | undefined;
  labelType?: string;
}

export interface WeaponDetail {
  baseATK: string;
  skills: {
    label: string;
    content: InlineElement[][];
  }[];
}
