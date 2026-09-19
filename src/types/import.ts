export type ResImportRecord = {
  data: DataImportRecord;
};

export type DataImportRecord = {
  list: ImportRecordItem[];
  hasMore: boolean;
  nextId?: number;
  serverId?: string;
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
  list: (GameRecordOperator | GameRecordWeapon | GameRecordOther)[];
  hasMore: boolean;
};

export type GameRecordOperator = GameRecordDraw & {
  charId: string;
  charName: string;
  isFree: boolean;
};

export type GameRecordWeapon = GameRecordDraw & {
  weaponId: string;
  weaponName: string;
  weaponType: string;
};

export type GameRecordOther = GameRecordBase & {
  kind: Exclude<string, 'draw'>;
};

type GameRecordDraw = GameRecordBase & {
  kind: 'draw';
  rarity: number;
  isFree: boolean;
  isNew: boolean;
};

type GameRecordBase = {
  kind: string;
  poolId: string;
  poolName: string;
  gachaTs: string;
  seqId: string;
};
