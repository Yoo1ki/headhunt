export type ResImportRecord = {
  data: DataImportRecord;
};

export type DataImportRecord = {
  list: ImportRecordItem[];
  hasMore: boolean;
};

export type ImportRecordItem = {
  id: number;
  bannerId: string;
  itemId: string;
  rarity: number;
  isFree?: boolean;
  isNew: boolean;
  timestamp: number;
};

export type ResGameRecord = {
  code: number;
  data: DataGameRecord;
  msg: string;
};

type DataGameRecord = {
  list: (GameRecordOperator | GameRecordWeapon)[];
  hasMore: boolean;
};

export type GameRecordOperator = GameRecordItem & {
  charId: string;
  charName: string;
  isFree: boolean;
};

export type GameRecordWeapon = GameRecordItem & {
  weaponId: string;
  weaponName: string;
  weaponType: string;
};

type GameRecordItem = {
  poolId: string;
  poolName: string;
  rarity: number;
  isFree: boolean;
  isNew: boolean;
  gachaTs: string;
  seqId: string;
};
