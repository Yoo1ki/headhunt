import { CONFIG } from '@/config';

export type RarityId = keyof typeof CONFIG.enumColors.rarities;
export type ElementId = keyof typeof CONFIG.enumColors.elements;
export type OpClassId = keyof typeof CONFIG.enumColors.opClass;
export type WpHeadhuntTypeId = keyof typeof CONFIG.enumColors.wpTypes;

export interface Enums {
  rarities: EnumRarity[];
  elements: EnumElement[];
  opClass: EnumOpClass[];
  wpTypes: EnumWPType[];
}

export interface EnumRarity {
  id: RarityId;
  name: string;
}
export interface EnumElement {
  id: ElementId;
  name: string;
}
export interface EnumOpClass {
  id: OpClassId;
  name: string;
}
export interface EnumWPType {
  id: WpHeadhuntTypeId;
  name: string;
}
