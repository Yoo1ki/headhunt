export interface SKPortWikiDetailOperator {
  code: number;
  message: string;
  timestamp: string;
  data: Data;
}

interface Data {
  item: Item;
}

interface Item {
  itemId: string;
  document: Document;
  name: string;
  mainType: MainType;
  subType: SubType;
  lang: string;
  lastUpdatedUser: LastUpdatedUser;
  createdUser: LastUpdatedUser;
  brief: Brief;
  status: number;
  publishedAtTs: string;
  lastAuditPassedAt: string;
  tagIds: string[];
}

interface Brief {
  cover: string;
  name: string;
  description: Description;
  associate: Associate;
  subTypeList: SubTypeList[];
  composite: null;
}

interface SubTypeList {
  subHeadhuntTypeId: string;
  value: string;
}

interface Associate {
  id: string;
  name: string;
  type: string;
  dotType: string;
}

interface Description {
  id: string;
  blockIds: string[];
  blockMap: BlockMap44;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap44 {
  "5URa8a": _1gMaKvaA7BjO;
  NLlPJt1sAT4v: _1gMaKvaA7BjO;
  b9A5o6sT5oAs: _1gMaKvaA7BjO;
  gy46Bva1qy2f: _1gMaKvaA7BjO;
  iNOyBs11TMd1: _1gMaKvaA7BjO;
}

interface LastUpdatedUser {
  id: string;
  nickname: string;
  avatarCode: number;
  avatar: string;
}

interface SubType {
  id: string;
  name: string;
  fatherHeadhuntTypeId: string;
  style: number;
  status: number;
  position: number;
  icon: string;
  items: unknown[];
  filterTagTree: FilterTagTree[];
}

interface FilterTagTree {
  id: string;
  children: Child[];
  name: string;
  type: number;
  value: string;
}

interface Child {
  id: string;
  children: unknown[];
  name: string;
  type: number;
  value: string;
}

interface MainType {
  id: string;
  name: string;
  status: number;
  position: number;
  typeSub: unknown[];
}

interface Document {
  documentMap: DocumentMap;
  chapterGroup: ChapterGroup[];
  extraInfo: ExtraInfo;
  widgetCommonMap: WidgetCommonMap;
}

interface WidgetCommonMap {
  "1SuOqtCW": _1SuOqtCW;
  "4bZn0d7O": _4bZn0d7O;
  AK19wWsz: AK19wWsz;
  AirCUzTO: AirCUzTO;
  Fs2hlx9C: Fs2hlx9C;
  KZCK4HJw: KZCK4HJw;
  ikbm7SJr: Ikbm7SJr;
  kfAHtVD1: KfAHtVD1;
  nZBcz2eI: NZBcz2eI;
  oPrRsVPj: OPrRsVPj;
  pqiHX5vg: PqiHX5vg;
  uu0VPmg1: _4bZn0d7O;
}

interface PqiHX5vg {
  type: string;
  tableList: unknown[];
  tabList: unknown[];
  tabDataMap: TabDataMap10;
}

interface TabDataMap10 {
  default: Default2;
}

interface Default2 {
  intro: null;
  content: string;
  audioList: AudioList[];
}

interface AudioList {
  title: string;
  profile: string;
  resourceUrl: string;
}

interface OPrRsVPj {
  type: string;
  tableList: TableList[];
  tabList: unknown[];
  tabDataMap: AuthorMap;
}

interface TableList {
  label: string;
  value: string;
}

interface NZBcz2eI {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap9;
}

interface TabDataMap9 {
  tab_1774762934598: Default;
  tab_1774762959364: Default;
}

interface KfAHtVD1 {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap8;
}

interface TabDataMap8 {
  tab_1765219386566: Default;
  tab_1765219649261: Default;
  tab_1765219652469: Default;
}

interface Ikbm7SJr {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap7;
}

interface TabDataMap7 {
  tab_1765218574319: Default;
  tab_1765218957462: Default;
  tab_1765218961341: Default;
  tab_1765218964863: Default;
  tab_1765218968982: Default;
}

interface KZCK4HJw {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap6;
}

interface TabDataMap6 {
  tab_1765058426789: Default;
  tab_1765058442859: Default;
  tab_1765058448796: Default;
  tab_1765058451188: Default;
  tab_1765058455556: Default;
  tab_1765058458739: Default;
  tab_1765297487454: Default;
}

interface Fs2hlx9C {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap5;
}

interface TabDataMap5 {
  tab_1773414832780: Default;
  tab_1773414845813: Default;
  tab_1773414893523: Default;
  tab_1773414943533: Default;
}

interface AirCUzTO {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap4;
}

interface TabDataMap4 {
  tab_1765060661586: Default;
  tab_1765060662002: Default;
  tab_1765060662418: Default;
  tab_1765060662813: Default;
  tab_1765060663265: Default;
  tab_1765060663672: Default;
  tab_1765060664162: Default;
}

interface AK19wWsz {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap3;
}

interface TabDataMap3 {
  tab_1765060325109: Default;
  tab_1765060329100: Default;
  tab_1765060332183: Default;
  tab_1767436315308: Default;
  tab_1767436323304: Default;
}

interface _4bZn0d7O {
  type: string;
  tableList: unknown[];
  tabList: unknown[];
  tabDataMap: TabDataMap2;
}

interface TabDataMap2 {
  default: Default;
}

interface Default {
  intro: null;
  content: string;
  audioList: unknown[];
}

interface _1SuOqtCW {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap;
}

interface TabDataMap {
  tab_1765059722556: Tab1765059722556;
  tab_1765059725993: Tab1765059722556;
  tab_1765059726474: Tab1765059722556;
  tab_1765059726933: Tab1765059722556;
}

interface Tab1765059722556 {
  intro: Intro;
  content: string;
  audioList: unknown[];
}

interface Intro {
  name: string;
  type: string;
  imgUrl: string;
  description: string;
}

interface TabList {
  tabId: string;
  title: string;
  icon: string;
}

interface ExtraInfo {
  showType: string;
  illustration: string;
  composite: string;
}

interface ChapterGroup {
  title: string;
  widgets: Widget[];
}

interface Widget {
  id: string;
  title: string;
  size: string;
}

interface DocumentMap {
  "0WD9p66F": _0WD9p66F;
  "4i6aNhMa": _4i6aNhMa;
  "61Z4PcdF": _61Z4PcdF;
  "6elRB4qv": _6elRB4qv;
  "6igUsu2I": _6igUsu2I;
  "8IL8WAy9": _8IL8WAy9;
  E3d9N6sX: E3d9N6sX;
  FmkKkcaV: FmkKkcaV;
  GMBynQQh: GMBynQQh;
  IXWLEX7W: IXWLEX7W;
  Jsyfx1Ij: Jsyfx1Ij;
  LrN8bpgM: LrN8bpgM;
  N5qWWjXG: N5qWWjXG;
  OwUUgbmj: OwUUgbmj;
  RNyY0Byp: RNyY0Byp;
  S4klh1FU: S4klh1FU;
  SBDKY26X: SBDKY26X;
  SZD4RCWq: SZD4RCWq;
  SwtVDZ9g: SwtVDZ9g;
  UnDAjRNk: UnDAjRNk;
  UvVV39vq: UvVV39vq;
  VucxoeHX: VucxoeHX;
  Y0qYeoeb: Y0qYeoeb;
  bP7NEJ6f: BP7NEJ6f;
  dAbveUHS: DAbveUHS;
  e5WXWqfk: E5WXWqfk;
  eMFfnA1o: EMFfnA1o;
  faFB0oUA: FaFB0oUA;
  fe0JJLg8: Fe0JJLg8;
  h4gKgOUy: H4gKgOUy;
  hnmE4i0y: HnmE4i0y;
  iyDloJhP: IyDloJhP;
  jQv485HQ: JQv485HQ;
  malUH3Fm: MalUH3Fm;
  nUNp8LCm: NUNp8LCm;
  pc6zlqDH: Pc6zlqDH;
  pgk1gEnx: Pgk1gEnx;
  rMoU7ofk: RMoU7ofk;
  vdBYJIMc: VdBYJIMc;
  wa2iFbQF: Wa2iFbQF;
  xiTSq5YP: XiTSq5YP;
  yKxUDwTS: YKxUDwTS;
  zZ7AuGBY: ZZ7AuGBY;
}

interface ZZ7AuGBY {
  id: string;
  blockIds: string[];
  blockMap: BlockMap43;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap43 {
  "4WkFtB": AXkkW5;
  "6ZdjzU": _5VjsaYMoapdl;
  DBfSvX: _1gMaKvaA7BjO;
  VslnJV: _5VjsaYMoapdl;
  VsmBBP: _1gMaKvaA7BjO;
  VzeKZW: _5VjsaYMoapdl;
  Z4QYRF: _0d68qb;
  gNDvPT: _5uvau9Bh;
  mEs3qb: X6pjrn;
  u73PkH: _5VjsaYMoapdl;
  wrE1d4: WrE1d4;
  xJFPyB: O89Zfr;
  yU20JQ: _5VjsaYMoapdl;
}

interface WrE1d4 {
  id: string;
  parentId: string;
  kind: string;
  table: Table26;
}

interface Table26 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap26;
  columnMap: ColumnMap26;
  cellMap: CellMap26;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap26 {
  AbaMgi_18UMXa: Mf8TGC05oPm2;
  AbaMgi_UEFp51: Mf8TGC05oPm2;
  AbaMgi_ec9VE9: Mf8TGC05oPm2;
  AbaMgi_pKwzA7: Mf8TGC05oPm2;
  Yj5oNF_18UMXa: Mf8TGC05oPm2;
  Yj5oNF_UEFp51: Mf8TGC05oPm2;
  Yj5oNF_ec9VE9: Mf8TGC05oPm2;
  Yj5oNF_pKwzA7: Mf8TGC05oPm2;
}

interface ColumnMap26 {
  "18UMXa": _05oPm2;
  UEFp51: _05oPm2;
  ec9VE9: _05oPm2;
  pKwzA7: _05oPm2;
}

interface RowMap26 {
  AbaMgi: Mf8TGC;
  Yj5oNF: Mf8TGC;
}

interface YKxUDwTS {
  id: string;
  blockIds: string[];
  blockMap: BlockMap42;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap42 {
  "00c8BS": _1gMaKvaA7BjO;
  "0xeTUI": _5uvau9Bh;
  "239Xyf": _1gMaKvaA7BjO;
  "3Fuwd2": _1gMaKvaA7BjO;
  "3oFEXc": _5VjsaYMoapdl;
  "4UMu5I": _5uvau9Bh;
  "56uaZR": _1gMaKvaA7BjO;
  "5PgK7L": _1gMaKvaA7BjO;
  "6A9Xur": _5VjsaYMoapdl;
  "6Ht4Gl": _1gMaKvaA7BjO;
  "7jXk54": _1gMaKvaA7BjO;
  "88mJrK": _5VjsaYMoapdl;
  "8nqrCM": _1gMaKvaA7BjO;
  "91q7SP": _5VjsaYMoapdl;
  "9wBcw7": _0d68qb;
  ASS3G3: _1gMaKvaA7BjO;
  B5696o: _1gMaKvaA7BjO;
  BstcCq: _5VjsaYMoapdl;
  EHSByX: _1gMaKvaA7BjO;
  EX2T97: _1gMaKvaA7BjO;
  EXUX2p: _5uvau9Bh;
  EwBmXj: _1gMaKvaA7BjO;
  JEdgop: _1gMaKvaA7BjO;
  JVd1zB: _1gMaKvaA7BjO;
  JdZ363: _5VjsaYMoapdl;
  L8hvsN: L8hvsN;
  LWod1j: _1gMaKvaA7BjO;
  M8b0Py: _1gMaKvaA7BjO;
  MZIW73: _1gMaKvaA7BjO;
  MscpII: _1gMaKvaA7BjO;
  NgQllP: _1gMaKvaA7BjO;
  PTCFTN: _5VjsaYMoapdl;
  QDcbmL: _1gMaKvaA7BjO;
  R0dhab: _1gMaKvaA7BjO;
  TTJ1xr: _5VjsaYMoapdl;
  Xdlw6U: _5VjsaYMoapdl;
  beHnMS: _5VjsaYMoapdl;
  c5UmhY: _1gMaKvaA7BjO;
  cdPdYj: _1gMaKvaA7BjO;
  ckgEHA: _1gMaKvaA7BjO;
  duimGl: _5VjsaYMoapdl;
  eRcvYI: _1gMaKvaA7BjO;
  f1G5AA: _1gMaKvaA7BjO;
  hC9JxF: _5VjsaYMoapdl;
  iOlyxu: AXkkW5;
  kEBWlb: _1gMaKvaA7BjO;
  kSBWIc: _1gMaKvaA7BjO;
  nTGkXl: _1gMaKvaA7BjO;
  oX3qYB: _1gMaKvaA7BjO;
  pRfzJ7: _5VjsaYMoapdl;
  qAAdmY: _1gMaKvaA7BjO;
  qdHBIi: _5uvau9Bh;
  rY50RU: _1gMaKvaA7BjO;
  ssTPXf: _5uvau9Bh;
  uQuNzl: _1gMaKvaA7BjO;
  upiQB2: _1gMaKvaA7BjO;
  y01bG6: _1gMaKvaA7BjO;
  yTzkjL: _1gMaKvaA7BjO;
}

interface L8hvsN {
  id: string;
  parentId: string;
  kind: string;
  table: Table25;
}

interface Table25 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap25;
  columnMap: ColumnMap25;
  cellMap: CellMap25;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap25 {
  "3HJdfy_B14CuJ": Mf8TGC05oPm2;
  "3HJdfy_LaVk9V": Mf8TGC05oPm2;
  "3HJdfy_Ta347H": Mf8TGC05oPm2;
  "3HJdfy_UqBPTN": Mf8TGC05oPm2;
  "3HJdfy_ccADAk": Mf8TGC05oPm2;
  "3HJdfy_eFJ6Ed": Mf8TGC05oPm2;
  "3HJdfy_iJ7Esd": Mf8TGC05oPm2;
  LBzB6Q_B14CuJ: Mf8TGC05oPm2;
  LBzB6Q_LaVk9V: Mf8TGC05oPm2;
  LBzB6Q_Ta347H: Mf8TGC05oPm2;
  LBzB6Q_UqBPTN: Mf8TGC05oPm2;
  LBzB6Q_ccADAk: Mf8TGC05oPm2;
  LBzB6Q_eFJ6Ed: Mf8TGC05oPm2;
  LBzB6Q_iJ7Esd: Mf8TGC05oPm2;
  MEeX2j_B14CuJ: Mf8TGC05oPm2;
  MEeX2j_LaVk9V: Mf8TGC05oPm2;
  MEeX2j_Ta347H: Mf8TGC05oPm2;
  MEeX2j_UqBPTN: Mf8TGC05oPm2;
  MEeX2j_ccADAk: Mf8TGC05oPm2;
  MEeX2j_eFJ6Ed: Mf8TGC05oPm2;
  MEeX2j_iJ7Esd: Mf8TGC05oPm2;
  Nwcooz_B14CuJ: Mf8TGC05oPm2;
  Nwcooz_LaVk9V: Mf8TGC05oPm2;
  Nwcooz_Ta347H: Mf8TGC05oPm2;
  Nwcooz_UqBPTN: Mf8TGC05oPm2;
  Nwcooz_ccADAk: Mf8TGC05oPm2;
  Nwcooz_eFJ6Ed: Mf8TGC05oPm2;
  Nwcooz_iJ7Esd: Mf8TGC05oPm2;
  PX45SM_B14CuJ: Mf8TGC05oPm2;
  PX45SM_LaVk9V: Mf8TGC05oPm2;
  PX45SM_Ta347H: Mf8TGC05oPm2;
  PX45SM_UqBPTN: Mf8TGC05oPm2;
  PX45SM_ccADAk: Mf8TGC05oPm2;
  PX45SM_eFJ6Ed: Mf8TGC05oPm2;
  PX45SM_iJ7Esd: Mf8TGC05oPm2;
  gHtOhn_B14CuJ: Mf8TGC05oPm2;
  gHtOhn_LaVk9V: Mf8TGC05oPm2;
  gHtOhn_Ta347H: Mf8TGC05oPm2;
  gHtOhn_UqBPTN: Mf8TGC05oPm2;
  gHtOhn_ccADAk: Mf8TGC05oPm2;
  gHtOhn_eFJ6Ed: Mf8TGC05oPm2;
  gHtOhn_iJ7Esd: Mf8TGC05oPm2;
  lpjwra_B14CuJ: Mf8TGC05oPm2;
  lpjwra_LaVk9V: Mf8TGC05oPm2;
  lpjwra_Ta347H: Mf8TGC05oPm2;
  lpjwra_UqBPTN: Mf8TGC05oPm2;
  lpjwra_ccADAk: Mf8TGC05oPm2;
  lpjwra_eFJ6Ed: Mf8TGC05oPm2;
  lpjwra_iJ7Esd: Mf8TGC05oPm2;
  oiUSU8_B14CuJ: Mf8TGC05oPm2;
  oiUSU8_LaVk9V: Mf8TGC05oPm2;
  oiUSU8_Ta347H: Mf8TGC05oPm2;
  oiUSU8_UqBPTN: Mf8TGC05oPm2;
  oiUSU8_ccADAk: Mf8TGC05oPm2;
  oiUSU8_eFJ6Ed: Mf8TGC05oPm2;
  oiUSU8_iJ7Esd: Mf8TGC05oPm2;
}

interface ColumnMap25 {
  B14CuJ: _05oPm2;
  LaVk9V: _05oPm2;
  Ta347H: _05oPm2;
  UqBPTN: _05oPm2;
  ccADAk: _05oPm2;
  eFJ6Ed: _05oPm2;
  iJ7Esd: _05oPm2;
}

interface RowMap25 {
  "3HJdfy": Mf8TGC;
  LBzB6Q: Mf8TGC;
  MEeX2j: Mf8TGC;
  Nwcooz: Mf8TGC;
  PX45SM: Mf8TGC;
  gHtOhn: Mf8TGC;
  lpjwra: Mf8TGC;
  oiUSU8: Mf8TGC;
}

interface XiTSq5YP {
  id: string;
  blockIds: string[];
  blockMap: BlockMap41;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap41 {
  h2QvppF1Ujxr: AXkkW5;
  lvOwBOaO1DAfjfPn: _8lfF5QwiYjDk5T5A;
}

interface Wa2iFbQF {
  id: string;
  blockIds: string[];
  blockMap: BlockMap40;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap40 {
  "0JmKBh": _5VjsaYMoapdl;
  "0PXxYw": _5uvau9Bh;
  "0c3iTbesKICT": _1gMaKvaA7BjO;
  "33TQ8P": _0d68qb;
  "39mnpugiE583": _1gMaKvaA7BjO;
  "3I2AjI8H": _5uvau9Bh;
  "5dfuBFVR6eaP": _1gMaKvaA7BjO;
  "5wFHcPqd0mHN": _5VjsaYMoapdl;
  "6Qxbzs": _1gMaKvaA7BjO;
  "7Jg6FPmLcNTR": _1gMaKvaA7BjO;
  "7V8QCYfzEJrz": _1gMaKvaA7BjO;
  "7y0LLPHiVcL2": _1gMaKvaA7BjO;
  "8mqVcP": _5uvau9Bh;
  "8pnZW1": _5VjsaYMoapdl;
  "9tFd9r": _5VjsaYMoapdl;
  AoUBAk9XD9Do: _1gMaKvaA7BjO;
  C9kvYx6TeCNv: _1gMaKvaA7BjO;
  CN8cZ6: AXkkW5;
  E0sF8Z8xAxji: _1gMaKvaA7BjO;
  EMs2TqJ4RDUz: _1gMaKvaA7BjO;
  ESz3Gg: ESz3Gg;
  EXTEqm: _5VjsaYMoapdl;
  Eblzch: _1gMaKvaA7BjO;
  EtE13K: _1gMaKvaA7BjO;
  FVUg7O: _5VjsaYMoapdl;
  FsPoZQRWRrzL: _1gMaKvaA7BjO;
  HLgpS1IA: _5uvau9Bh;
  Hl34iRrl79AB: _1gMaKvaA7BjO;
  IAdHFGH5NACk: _1gMaKvaA7BjO;
  IGJ1NyqDkaJl: _1gMaKvaA7BjO;
  JVKJtMhA4koW: _1gMaKvaA7BjO;
  JsglPChja7mJ: _1gMaKvaA7BjO;
  Jwvs6G: _5VjsaYMoapdl;
  KJp9bC: _1gMaKvaA7BjO;
  LRVUVSnyDkpK: _5VjsaYMoapdl;
  LRdNNI: _5uvau9Bh;
  LeETRC67Nvcw: _1gMaKvaA7BjO;
  LkuE9I: _1gMaKvaA7BjO;
  NXmgqY: _5uvau9Bh;
  OfnFeZDhPoOJ: _1gMaKvaA7BjO;
  PXjng9: _1gMaKvaA7BjO;
  Pmsly6gNAAng: _1gMaKvaA7BjO;
  QjaOK0LN6OvE: _1gMaKvaA7BjO;
  Rym4BwBWYvyo: _1gMaKvaA7BjO;
  S28Zjj7ZQPqQ: _5VjsaYMoapdl;
  Sx9tawQ4: _5uvau9Bh;
  SzFtnH: _5VjsaYMoapdl;
  TOGtDm: _5uvau9Bh;
  TSDUWe: _5VjsaYMoapdl;
  UBlzTo: _5VjsaYMoapdl;
  VFYWkLrD4epq: _1gMaKvaA7BjO;
  VMKBzw: _5VjsaYMoapdl;
  W4sKTj: _5VjsaYMoapdl;
  W5thCg3Mp3la: _1gMaKvaA7BjO;
  WInE8q: _5VjsaYMoapdl;
  Wsxaz6UTBjqS: _1gMaKvaA7BjO;
  X7I7u3LC: _5uvau9Bh;
  XzU3vffXDQCe: _1gMaKvaA7BjO;
  Yi95G3: _5VjsaYMoapdl;
  ZV4vdF: _1gMaKvaA7BjO;
  aCwB3SEK23gT: _1gMaKvaA7BjO;
  aeDdxBRkLW7b: _1gMaKvaA7BjO;
  cWOZjCUpnnnc: _1gMaKvaA7BjO;
  ckg9oXbTvgSX: _1gMaKvaA7BjO;
  djL8bsMeNwpt: _1gMaKvaA7BjO;
  f5A5T2: _5uvau9Bh;
  ftxcDc: _1gMaKvaA7BjO;
  gvtlEUWQ3Jh5: _1gMaKvaA7BjO;
  hUTWpmnP29j4: _1gMaKvaA7BjO;
  hfuRDcmx37wL: _1gMaKvaA7BjO;
  hgwksmanmlMV: _1gMaKvaA7BjO;
  hmj5QcmEcw7X: _1gMaKvaA7BjO;
  iW1go0: _5VjsaYMoapdl;
  iqFtmknVRek0: _1gMaKvaA7BjO;
  j9WfAShdH8wq: _1gMaKvaA7BjO;
  kcZxee: _1gMaKvaA7BjO;
  krpXC385K8ON: _1gMaKvaA7BjO;
  lvAzkCw0xfQF: _1gMaKvaA7BjO;
  mDz9op: _5VjsaYMoapdl;
  mcvkqoSnPapA: _1gMaKvaA7BjO;
  nAsXhU3Y1qf8: _1gMaKvaA7BjO;
  nTCiJZXQJLbp: _1gMaKvaA7BjO;
  ne9qEW: _1gMaKvaA7BjO;
  oEKmetuqtuKN: _1gMaKvaA7BjO;
  ozpUVC: _1gMaKvaA7BjO;
  pu1Be8: _1gMaKvaA7BjO;
  q5rxZn: _1gMaKvaA7BjO;
  r6f7iZ9ZkPVT: _1gMaKvaA7BjO;
  sUz0emNbRjtU: _1gMaKvaA7BjO;
  vBJ6t1: _5uvau9Bh;
  vD7Vwi: _1gMaKvaA7BjO;
  vDvhJh2kDvNe: _1gMaKvaA7BjO;
  yZ9WPG9AJNRQ: _1gMaKvaA7BjO;
}

interface ESz3Gg {
  id: string;
  parentId: string;
  kind: string;
  table: Table24;
}

interface Table24 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap24;
  columnMap: ColumnMap24;
  cellMap: CellMap24;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap24 {
  "3NBGFN_CNjdqT": Mf8TGC05oPm2;
  "3NBGFN_ENqqBP": Mf8TGC05oPm2;
  "3NBGFN_OuxmyD": Mf8TGC05oPm2;
  "3NBGFN_PW5HoH": Mf8TGC05oPm2;
  "3NBGFN_RO4hdy": Mf8TGC05oPm2;
  "3NBGFN_USZouS": Mf8TGC05oPm2;
  "3NBGFN_ahppBM": Mf8TGC05oPm2;
  "3NBGFN_dWmFby": Mf8TGC05oPm2;
  "3NBGFN_gZJrYJ": Mf8TGC05oPm2;
  "3NBGFN_l4Bou2": Mf8TGC05oPm2;
  "3NBGFN_oLXhoO": Mf8TGC05oPm2;
  "3NBGFN_tEeQxU": Mf8TGC05oPm2;
  "3NBGFN_vWRtoW": Mf8TGC05oPm2;
  XkTWGC_CNjdqT: Mf8TGC05oPm2;
  XkTWGC_ENqqBP: Mf8TGC05oPm2;
  XkTWGC_OuxmyD: Mf8TGC05oPm2;
  XkTWGC_PW5HoH: Mf8TGC05oPm2;
  XkTWGC_RO4hdy: Mf8TGC05oPm2;
  XkTWGC_USZouS: Mf8TGC05oPm2;
  XkTWGC_ahppBM: Mf8TGC05oPm2;
  XkTWGC_dWmFby: Mf8TGC05oPm2;
  XkTWGC_gZJrYJ: Mf8TGC05oPm2;
  XkTWGC_l4Bou2: Mf8TGC05oPm2;
  XkTWGC_oLXhoO: Mf8TGC05oPm2;
  XkTWGC_tEeQxU: Mf8TGC05oPm2;
  XkTWGC_vWRtoW: Mf8TGC05oPm2;
  aS5n3r_CNjdqT: Mf8TGC05oPm2;
  aS5n3r_ENqqBP: Mf8TGC05oPm2;
  aS5n3r_OuxmyD: Mf8TGC05oPm2;
  aS5n3r_PW5HoH: Mf8TGC05oPm2;
  aS5n3r_RO4hdy: Mf8TGC05oPm2;
  aS5n3r_USZouS: Mf8TGC05oPm2;
  aS5n3r_ahppBM: Mf8TGC05oPm2;
  aS5n3r_dWmFby: Mf8TGC05oPm2;
  aS5n3r_gZJrYJ: Mf8TGC05oPm2;
  aS5n3r_l4Bou2: Mf8TGC05oPm2;
  aS5n3r_oLXhoO: Mf8TGC05oPm2;
  aS5n3r_tEeQxU: Mf8TGC05oPm2;
  aS5n3r_vWRtoW: Mf8TGC05oPm2;
  nZoGBy_CNjdqT: Mf8TGC05oPm2;
  nZoGBy_ENqqBP: Mf8TGC05oPm2;
  nZoGBy_OuxmyD: Mf8TGC05oPm2;
  nZoGBy_PW5HoH: Mf8TGC05oPm2;
  nZoGBy_RO4hdy: Mf8TGC05oPm2;
  nZoGBy_USZouS: Mf8TGC05oPm2;
  nZoGBy_ahppBM: Mf8TGC05oPm2;
  nZoGBy_dWmFby: Mf8TGC05oPm2;
  nZoGBy_gZJrYJ: Mf8TGC05oPm2;
  nZoGBy_l4Bou2: Mf8TGC05oPm2;
  nZoGBy_oLXhoO: Mf8TGC05oPm2;
  nZoGBy_tEeQxU: Mf8TGC05oPm2;
  nZoGBy_vWRtoW: Mf8TGC05oPm2;
  rfQTec_CNjdqT: Mf8TGC05oPm2;
  rfQTec_ENqqBP: Mf8TGC05oPm2;
  rfQTec_OuxmyD: Mf8TGC05oPm2;
  rfQTec_PW5HoH: Mf8TGC05oPm2;
  rfQTec_RO4hdy: Mf8TGC05oPm2;
  rfQTec_USZouS: Mf8TGC05oPm2;
  rfQTec_ahppBM: Mf8TGC05oPm2;
  rfQTec_dWmFby: Mf8TGC05oPm2;
  rfQTec_gZJrYJ: Mf8TGC05oPm2;
  rfQTec_l4Bou2: Mf8TGC05oPm2;
  rfQTec_oLXhoO: Mf8TGC05oPm2;
  rfQTec_tEeQxU: Mf8TGC05oPm2;
  rfQTec_vWRtoW: Mf8TGC05oPm2;
  sf6UsF_CNjdqT: Mf8TGC05oPm2;
  sf6UsF_ENqqBP: Mf8TGC05oPm2;
  sf6UsF_OuxmyD: Mf8TGC05oPm2;
  sf6UsF_PW5HoH: Mf8TGC05oPm2;
  sf6UsF_RO4hdy: Mf8TGC05oPm2;
  sf6UsF_USZouS: Mf8TGC05oPm2;
  sf6UsF_ahppBM: Mf8TGC05oPm2;
  sf6UsF_dWmFby: Mf8TGC05oPm2;
  sf6UsF_gZJrYJ: Mf8TGC05oPm2;
  sf6UsF_l4Bou2: Mf8TGC05oPm2;
  sf6UsF_oLXhoO: Mf8TGC05oPm2;
  sf6UsF_tEeQxU: Mf8TGC05oPm2;
  sf6UsF_vWRtoW: Mf8TGC05oPm2;
  xYuWZI_CNjdqT: Mf8TGC05oPm2;
  xYuWZI_ENqqBP: Mf8TGC05oPm2;
  xYuWZI_OuxmyD: Mf8TGC05oPm2;
  xYuWZI_PW5HoH: Mf8TGC05oPm2;
  xYuWZI_RO4hdy: Mf8TGC05oPm2;
  xYuWZI_USZouS: Mf8TGC05oPm2;
  xYuWZI_ahppBM: Mf8TGC05oPm2;
  xYuWZI_dWmFby: Mf8TGC05oPm2;
  xYuWZI_gZJrYJ: Mf8TGC05oPm2;
  xYuWZI_l4Bou2: Mf8TGC05oPm2;
  xYuWZI_oLXhoO: Mf8TGC05oPm2;
  xYuWZI_tEeQxU: Mf8TGC05oPm2;
  xYuWZI_vWRtoW: Mf8TGC05oPm2;
}

interface ColumnMap24 {
  CNjdqT: _05oPm2;
  ENqqBP: _05oPm2;
  OuxmyD: _05oPm2;
  PW5HoH: _05oPm2;
  RO4hdy: _05oPm2;
  USZouS: _05oPm2;
  ahppBM: _05oPm2;
  dWmFby: _05oPm2;
  gZJrYJ: _05oPm2;
  l4Bou2: _05oPm2;
  oLXhoO: _05oPm2;
  tEeQxU: _05oPm2;
  vWRtoW: _05oPm2;
}

interface RowMap24 {
  "3NBGFN": Mf8TGC;
  XkTWGC: Mf8TGC;
  aS5n3r: Mf8TGC;
  nZoGBy: Mf8TGC;
  rfQTec: Mf8TGC;
  sf6UsF: Mf8TGC;
  xYuWZI: Mf8TGC;
}

interface VdBYJIMc {
  id: string;
  blockIds: string[];
  blockMap: BlockMap39;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap39 {
  DybnhY7XGCNP: AXkkW5;
  VlV9AqPTA0jJiBBn: _8lfF5QwiYjDk5T5A;
}

interface RMoU7ofk {
  id: string;
  blockIds: string[];
  blockMap: BlockMap38;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap38 {
  "0RhQlJ": _5uvau9Bh;
  "41Axfi": _5VjsaYMoapdl;
  "5TfgPn": _5VjsaYMoapdl;
  "5ykZAm": _0d68qb;
  "8B4iB5": _8B4iB5;
  LRl7T0: _5VjsaYMoapdl;
  NKpplH: _5VjsaYMoapdl;
  NvnkeS: _1gMaKvaA7BjO;
  Rgwd4p: _5VjsaYMoapdl;
  U7sU5V: _5VjsaYMoapdl;
  UvhNfN: _1gMaKvaA7BjO;
  VErnhl: _1gMaKvaA7BjO;
  VLL89y: _5VjsaYMoapdl;
  Xf6sSr: _1gMaKvaA7BjO;
  YzVdNI: _5VjsaYMoapdl;
  j4TXw4: _1gMaKvaA7BjO;
  p3S6o6: _1gMaKvaA7BjO;
  qOxIoo: AXkkW5;
  xdLY1H: _1gMaKvaA7BjO;
}

interface _8B4iB5 {
  id: string;
  parentId: string;
  kind: string;
  table: Table23;
}

interface Table23 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap23;
  columnMap: ColumnMap23;
  cellMap: CellMap23;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap23 {
  CEdnex_awSpi3: Mf8TGC05oPm2;
  CEdnex_iyojJ6: Mf8TGC05oPm2;
  NQ94gd_awSpi3: Mf8TGC05oPm2;
  NQ94gd_iyojJ6: Mf8TGC05oPm2;
  gwCyw1_awSpi3: Mf8TGC05oPm2;
  gwCyw1_iyojJ6: Mf8TGC05oPm2;
  k5mWkH_F4nVbM: Mf8TGC05oPm2;
  k5mWkH_awSpi3: Mf8TGC05oPm2;
  k5mWkH_iyojJ6: Mf8TGC05oPm2;
  mOMVcP_awSpi3: Mf8TGC05oPm2;
  mOMVcP_iyojJ6: Mf8TGC05oPm2;
  nnn6LH_F4nVbM: Mf8TGC05oPm2;
  nnn6LH_awSpi3: Mf8TGC05oPm2;
  nnn6LH_iyojJ6: Mf8TGC05oPm2;
  xrFN7G_awSpi3: Mf8TGC05oPm2;
  xrFN7G_iyojJ6: Mf8TGC05oPm2;
}

interface ColumnMap23 {
  F4nVbM: _05oPm2;
  awSpi3: _05oPm2;
  iyojJ6: _05oPm2;
}

interface RowMap23 {
  CEdnex: Mf8TGC;
  NQ94gd: Mf8TGC;
  gwCyw1: Mf8TGC;
  k5mWkH: Mf8TGC;
  mOMVcP: Mf8TGC;
  nnn6LH: Mf8TGC;
  xrFN7G: Mf8TGC;
}

interface Pgk1gEnx {
  id: string;
  blockIds: string[];
  blockMap: BlockMap37;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap37 {
  "7V2FxlNMpBeg": AXkkW5;
  BN4I89UzUmFjxRXH: _8lfF5QwiYjDk5T5A;
}

interface Pc6zlqDH {
  id: string;
  blockIds: string[];
  blockMap: BlockMap36;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap36 {
  gCxRp2: AXkkW5;
  pOsUnZvh6LGy: DxVpgqnZeTZ9;
}

interface NUNp8LCm {
  id: string;
  blockIds: string[];
  blockMap: BlockMap35;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap35 {
  D4VCnk: _5uvau9Bh;
  DBfSvX: _1gMaKvaA7BjO;
  J6aWDP: _5VjsaYMoapdl;
  LjXDYk: _1gMaKvaA7BjO;
  S8jZij: S8jZij;
  WvAcFq: AXkkW5;
  XllHv4: _5VjsaYMoapdl;
  Yv3rkx: _1gMaKvaA7BjO;
  mZBp9P: _0d68qb;
  n6r2AF: _5VjsaYMoapdl;
  pY204P: _5VjsaYMoapdl;
  xJFPyB: O89Zfr;
  yU20JQ: _5VjsaYMoapdl;
}

interface S8jZij {
  id: string;
  parentId: string;
  kind: string;
  table: Table22;
}

interface Table22 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap22;
  columnMap: ColumnMap22;
  cellMap: CellMap22;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap22 {
  R8QKud_DuUOQU: Mf8TGC05oPm2;
  R8QKud_G3MeYy: Mf8TGC05oPm2;
  R8QKud_RDvmp4: Mf8TGC05oPm2;
  R8QKud_lpYLM6: Mf8TGC05oPm2;
  xYJabD_DuUOQU: Mf8TGC05oPm2;
  xYJabD_G3MeYy: Mf8TGC05oPm2;
  xYJabD_RDvmp4: Mf8TGC05oPm2;
  xYJabD_lpYLM6: Mf8TGC05oPm2;
}

interface ColumnMap22 {
  DuUOQU: _05oPm2;
  G3MeYy: _05oPm2;
  RDvmp4: _05oPm2;
  lpYLM6: _05oPm2;
}

interface RowMap22 {
  R8QKud: Mf8TGC;
  xYJabD: Mf8TGC;
}

interface MalUH3Fm {
  id: string;
  blockIds: string[];
  blockMap: BlockMap34;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap34 {
  "2MG32p58Vy2V": _1gMaKvaA7BjO;
  "4VrIqa": _5VjsaYMoapdl;
  FIorO9: _5VjsaYMoapdl;
  JsP3AG: _5VjsaYMoapdl;
  K1ardZzceWLi: _1gMaKvaA7BjO;
  LifqfP: _5VjsaYMoapdl;
  TOLtk4AmcuIh: _1gMaKvaA7BjO;
  VPRspy: _0d68qb;
  WuRLnSWKXcSh: _1gMaKvaA7BjO;
  YQHR17WtkZcI: _1gMaKvaA7BjO;
  d7AQgl: _5VjsaYMoapdl;
  geCm6J: _5VjsaYMoapdl;
  i2sOjL: I2sOjL;
  jIXxnBfVm6ud: _1gMaKvaA7BjO;
  kemRBK: AXkkW5;
  oM1jdc: _1gMaKvaA7BjO;
  pipv9s: _5VjsaYMoapdl;
  rDvcIK: _5VjsaYMoapdl;
}

interface I2sOjL {
  id: string;
  parentId: string;
  kind: string;
  table: Table21;
}

interface Table21 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap21;
  columnMap: ColumnMap21;
  cellMap: CellMap21;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap21 {
  "1qodeu_Z25OS1": Mf8TGC05oPm2;
  "1qodeu_wtqlch": Mf8TGC05oPm2;
  "5NT855_Z25OS1": Mf8TGC05oPm2;
  "5NT855_wtqlch": Mf8TGC05oPm2;
  "8utFkt_Z25OS1": Mf8TGC05oPm2;
  "8utFkt_wtqlch": Mf8TGC05oPm2;
  Fo9lm4_BNWdo0: Mf8TGC05oPm2;
  Fo9lm4_Z25OS1: Mf8TGC05oPm2;
  Fo9lm4_wtqlch: Mf8TGC05oPm2;
  R8QfCT_Z25OS1: Mf8TGC05oPm2;
  R8QfCT_wtqlch: Mf8TGC05oPm2;
  rnBcI9_BNWdo0: Mf8TGC05oPm2;
  rnBcI9_Z25OS1: Mf8TGC05oPm2;
  rnBcI9_wtqlch: Mf8TGC05oPm2;
  yDWRgQ_Z25OS1: Mf8TGC05oPm2;
  yDWRgQ_wtqlch: Mf8TGC05oPm2;
}

interface ColumnMap21 {
  BNWdo0: _05oPm2;
  Z25OS1: _05oPm2;
  wtqlch: _05oPm2;
}

interface RowMap21 {
  "1qodeu": Mf8TGC;
  "5NT855": Mf8TGC;
  "8utFkt": Mf8TGC;
  Fo9lm4: Mf8TGC;
  R8QfCT: Mf8TGC;
  rnBcI9: Mf8TGC;
  yDWRgQ: Mf8TGC;
}

interface JQv485HQ {
  id: string;
  blockIds: string[];
  blockMap: BlockMap33;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap33 {
  bY9wOSlANPel: DxVpgqnZeTZ9;
  dtwxV4: AXkkW5;
}

interface IyDloJhP {
  id: string;
  blockIds: string[];
  blockMap: BlockMap32;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap32 {
  "565zNy": _5VjsaYMoapdl;
  "9RcENo": _5uvau9Bh;
  CHuOKqWShemM: _1gMaKvaA7BjO;
  DQZECK: _1gMaKvaA7BjO;
  NT1Eku: AXkkW5;
  RvtRJY: _5VjsaYMoapdl;
  YCobCa: _5VjsaYMoapdl;
  YM2n0i: _5uvau9Bh;
  YqYiLp: _1gMaKvaA7BjO;
  aj6CaYZsSxaG: _1gMaKvaA7BjO;
  iE31ew: _0d68qb;
  kGS8gq: O89Zfr;
  mtXu0b: _5VjsaYMoapdl;
  slRddt: SlRddt;
  tRfG5B: _5VjsaYMoapdl;
  wuelcu: _1gMaKvaA7BjO;
  yhpklO: _5VjsaYMoapdl;
}

interface SlRddt {
  id: string;
  parentId: string;
  kind: string;
  table: Table20;
}

interface Table20 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap20;
  columnMap: ColumnMap20;
  cellMap: CellMap20;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap20 {
  "8KSDvP_2BfX2W": Mf8TGC05oPm2;
  "8KSDvP_9kHAjJ": Mf8TGC05oPm2;
  "8KSDvP_Q28KeS": Mf8TGC05oPm2;
  "8KSDvP_tMIfOk": Mf8TGC05oPm2;
  WX5quY_2BfX2W: Mf8TGC05oPm2;
  WX5quY_9kHAjJ: Mf8TGC05oPm2;
  WX5quY_Q28KeS: Mf8TGC05oPm2;
  WX5quY_tMIfOk: Mf8TGC05oPm2;
  xjTT5j_2BfX2W: Mf8TGC05oPm2;
  xjTT5j_9kHAjJ: Mf8TGC05oPm2;
  xjTT5j_Q28KeS: Mf8TGC05oPm2;
  xjTT5j_tMIfOk: Mf8TGC05oPm2;
}

interface ColumnMap20 {
  "2BfX2W": _05oPm2;
  "9kHAjJ": _05oPm2;
  Q28KeS: _05oPm2;
  tMIfOk: _05oPm2;
}

interface RowMap20 {
  "8KSDvP": Mf8TGC;
  WX5quY: Mf8TGC;
  xjTT5j: Mf8TGC;
}

interface HnmE4i0y {
  id: string;
  blockIds: string[];
  blockMap: BlockMap31;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap31 {
  "8lfF5QwiYjDk5T5A": _8lfF5QwiYjDk5T5A;
  jDxepKaJKJ6t: AXkkW5;
}

interface _8lfF5QwiYjDk5T5A {
  id: string;
  parentId: string;
  kind: string;
  externalVideo: ExternalVideo;
}

interface ExternalVideo {
  id: string;
  kind: string;
  url: string;
  cover: Image;
  description: string;
}

interface H4gKgOUy {
  id: string;
  blockIds: string[];
  blockMap: BlockMap30;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap30 {
  "3WXdTL": _3WXdTL;
  "6Effbt": _5VjsaYMoapdl;
  "6Gba8N": _1gMaKvaA7BjO;
  "8jQkS0": _0d68qb;
  DBfSvX: _1gMaKvaA7BjO;
  OiLr3F: _5uvau9Bh;
  VSeB4G: _5VjsaYMoapdl;
  VYN8C0: _5VjsaYMoapdl;
  lQOnB7: _1gMaKvaA7BjO;
  pe6OBH: _5VjsaYMoapdl;
  xJFPyB: O89Zfr;
  yU20JQ: _5VjsaYMoapdl;
  yU91Lp: AXkkW5;
}

interface _3WXdTL {
  id: string;
  parentId: string;
  kind: string;
  table: Table19;
}

interface Table19 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap19;
  columnMap: ColumnMap19;
  cellMap: CellMap19;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap19 {
  EfrCAo_VkZs8J: Mf8TGC05oPm2;
  EfrCAo_Z4f9Z0: Mf8TGC05oPm2;
  EfrCAo_pjijUd: Mf8TGC05oPm2;
  EfrCAo_sXCYJm: Mf8TGC05oPm2;
  F2ozir_VkZs8J: Mf8TGC05oPm2;
  F2ozir_Z4f9Z0: Mf8TGC05oPm2;
  F2ozir_pjijUd: Mf8TGC05oPm2;
  F2ozir_sXCYJm: Mf8TGC05oPm2;
}

interface ColumnMap19 {
  VkZs8J: _05oPm2;
  Z4f9Z0: _05oPm2;
  pjijUd: _05oPm2;
  sXCYJm: _05oPm2;
}

interface RowMap19 {
  EfrCAo: Mf8TGC;
  F2ozir: Mf8TGC;
}

interface Fe0JJLg8 {
  id: string;
  blockIds: string[];
  blockMap: BlockMap29;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap29 {
  "26o6KmYg3WUk": DxVpgqnZeTZ9;
}

interface FaFB0oUA {
  id: string;
  blockIds: string[];
  blockMap: BlockMap28;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap28 {
  "5hNScY": _1gMaKvaA7BjO;
  DBfSvX: _1gMaKvaA7BjO;
  HxtnrN: _1gMaKvaA7BjO;
  LGOO7U: _5VjsaYMoapdl;
  MuDQp2: AXkkW5;
  XEebx5: _5VjsaYMoapdl;
  Xr1yuY: _5uvau9Bh;
  b0MuKd: _0d68qb;
  e6viUG: _5VjsaYMoapdl;
  vMtjxp: VMtjxp;
  xJFPyB: O89Zfr;
  yTLeBP: _5VjsaYMoapdl;
  yU20JQ: _5VjsaYMoapdl;
}

interface VMtjxp {
  id: string;
  parentId: string;
  kind: string;
  table: Table18;
}

interface Table18 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap18;
  columnMap: ColumnMap18;
  cellMap: CellMap18;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap18 {
  D4yM5k_EIxO1L: Mf8TGC05oPm2;
  D4yM5k_Xf24xv: Mf8TGC05oPm2;
  D4yM5k_f2PwdS: Mf8TGC05oPm2;
  D4yM5k_vSyw2B: Mf8TGC05oPm2;
  NxFL4k_EIxO1L: Mf8TGC05oPm2;
  NxFL4k_Xf24xv: Mf8TGC05oPm2;
  NxFL4k_f2PwdS: Mf8TGC05oPm2;
  NxFL4k_vSyw2B: Mf8TGC05oPm2;
}

interface ColumnMap18 {
  EIxO1L: _05oPm2;
  Xf24xv: _05oPm2;
  f2PwdS: _05oPm2;
  vSyw2B: _05oPm2;
}

interface RowMap18 {
  D4yM5k: Mf8TGC;
  NxFL4k: Mf8TGC;
}

interface EMFfnA1o {
  id: string;
  blockIds: string[];
  blockMap: BlockMap27;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap27 {
  "0PXxYw": _5uvau9Bh;
  "1WkHeu": _5uvau9Bh;
  "2kidLI": _1gMaKvaA7BjO;
  "2qV5Tp": _1gMaKvaA7BjO;
  "3JXSCs": _1gMaKvaA7BjO;
  "3NxvNV": _1gMaKvaA7BjO;
  "4QlsDVc72KhP": _1gMaKvaA7BjO;
  "5CDq5l": _1gMaKvaA7BjO;
  "60C2xo": _1gMaKvaA7BjO;
  "6kBjkg": _1gMaKvaA7BjO;
  "6pzV2L": _5VjsaYMoapdl;
  "7u3XCk": _1gMaKvaA7BjO;
  "8012X3": _5VjsaYMoapdl;
  "8AHmrY": _1gMaKvaA7BjO;
  "8FW7Ua": _1gMaKvaA7BjO;
  "8mqVcP": _5uvau9Bh;
  "8uQ3897pKGXo": _1gMaKvaA7BjO;
  AzVstO: _1gMaKvaA7BjO;
  B0MTXu: _1gMaKvaA7BjO;
  BbcTYy: _1gMaKvaA7BjO;
  C5YTUt: _1gMaKvaA7BjO;
  CZi1kq: _1gMaKvaA7BjO;
  Cp7GPbw2u5Q0: _1gMaKvaA7BjO;
  Dai3mtkjDJeY: _1gMaKvaA7BjO;
  DivnPh: _5VjsaYMoapdl;
  ETPXlH: _5uvau9Bh;
  FCgo30: _0d68qb;
  FSpWs8: _5VjsaYMoapdl;
  FygEiUZHSnW0: _1gMaKvaA7BjO;
  GgxHXM: _1gMaKvaA7BjO;
  Htj2qx: _1gMaKvaA7BjO;
  IWJY4b: _1gMaKvaA7BjO;
  KJp9bC: _1gMaKvaA7BjO;
  KlmpqB: _1gMaKvaA7BjO;
  KyV9C2: _5VjsaYMoapdl;
  LRdNNI: _5uvau9Bh;
  LWQUHJ: _1gMaKvaA7BjO;
  LZ9d1o: AXkkW5;
  LZwRkN2vKP9U: _5uvau9Bh;
  M6S5Qz: _1gMaKvaA7BjO;
  Mnb8xu: _5VjsaYMoapdl;
  NNi0VY: _5uvau9Bh;
  NXmgqY: _5uvau9Bh;
  NhRIzw: _5VjsaYMoapdl;
  NryF2L: _1gMaKvaA7BjO;
  OF6ZOP: _1gMaKvaA7BjO;
  OUA7XF: _1gMaKvaA7BjO;
  OYKpdK: _1gMaKvaA7BjO;
  PK9V48: _1gMaKvaA7BjO;
  PKCcca: _1gMaKvaA7BjO;
  PzStKb: _1gMaKvaA7BjO;
  QAHOhz: _1gMaKvaA7BjO;
  ShSCjB: _1gMaKvaA7BjO;
  TQdJOX: _1gMaKvaA7BjO;
  TZS5DI: _1gMaKvaA7BjO;
  U5zflU: _5VjsaYMoapdl;
  UBfONE: _1gMaKvaA7BjO;
  UTKfrh: _1gMaKvaA7BjO;
  UxqQ4g: _1gMaKvaA7BjO;
  VM90BZ: _1gMaKvaA7BjO;
  WENRHj: _5uvau9Bh;
  Wf3e8m: _5VjsaYMoapdl;
  Wt0Wvs: _1gMaKvaA7BjO;
  X1eV75: _1gMaKvaA7BjO;
  XgqAmR: _5VjsaYMoapdl;
  Y0eSNV: _1gMaKvaA7BjO;
  YrlipN: _1gMaKvaA7BjO;
  Z4cLko: _1gMaKvaA7BjO;
  Z6IO0MJAU35r: _1gMaKvaA7BjO;
  ZbhHaa: _1gMaKvaA7BjO;
  Zj8P9fis52M5: _1gMaKvaA7BjO;
  a3fFFi: _1gMaKvaA7BjO;
  awmDgn: _5VjsaYMoapdl;
  bLzUUX: _1gMaKvaA7BjO;
  cR8z52: _5VjsaYMoapdl;
  dGnb5U: _1gMaKvaA7BjO;
  df4cwB: _5VjsaYMoapdl;
  djfGUZ: _5VjsaYMoapdl;
  dufHfy: _1gMaKvaA7BjO;
  e1UP21: _5VjsaYMoapdl;
  eQPGtJ: _1gMaKvaA7BjO;
  f5A5T2: _5uvau9Bh;
  fJJB7d: _1gMaKvaA7BjO;
  fafyXc: _1gMaKvaA7BjO;
  gNR0wi: _1gMaKvaA7BjO;
  gXFspG: _1gMaKvaA7BjO;
  gxmFIu: _1gMaKvaA7BjO;
  i7gF2muhNfBD: _1gMaKvaA7BjO;
  ioy5IZ: _1gMaKvaA7BjO;
  jAKogV: _1gMaKvaA7BjO;
  lGQOir: _1gMaKvaA7BjO;
  lmJs9J: _5VjsaYMoapdl;
  mGPmO7: _5VjsaYMoapdl;
  muZlrJ: _5VjsaYMoapdl;
  pOveaO: _1gMaKvaA7BjO;
  qDaStJkvayJD: _1gMaKvaA7BjO;
  qRyeNz: _1gMaKvaA7BjO;
  qfLyc1: _1gMaKvaA7BjO;
  rI0PpZ: _5VjsaYMoapdl;
  raDQMn: _1gMaKvaA7BjO;
  rgOZaf: _1gMaKvaA7BjO;
  rtmywUTR6yuO: _1gMaKvaA7BjO;
  sA2HkG: _1gMaKvaA7BjO;
  sko52z: Sko52z;
  t2qylk: _1gMaKvaA7BjO;
  u2qIQB: _1gMaKvaA7BjO;
  uXUORa: _1gMaKvaA7BjO;
  v2EURo: _1gMaKvaA7BjO;
  v4Ptik: _1gMaKvaA7BjO;
  vBB49A: _1gMaKvaA7BjO;
  vBJ6t1: _5uvau9Bh;
  voT22o: _5VjsaYMoapdl;
  wydouZXhQB8i: _1gMaKvaA7BjO;
  y0T7tr: _1gMaKvaA7BjO;
  yZ9PPx: _1gMaKvaA7BjO;
  zBHx2P: _1gMaKvaA7BjO;
  zc2Ynq: _1gMaKvaA7BjO;
  zcGTHp: _1gMaKvaA7BjO;
  zevNjF: _1gMaKvaA7BjO;
}

interface Sko52z {
  id: string;
  parentId: string;
  kind: string;
  table: Table17;
}

interface Table17 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap17;
  columnMap: ColumnMap17;
  cellMap: CellMap17;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap17 {
  "1w8waL_2OcJA6": Mf8TGC05oPm2;
  "1w8waL_8NvomU": Mf8TGC05oPm2;
  "1w8waL_B0U8U2": Mf8TGC05oPm2;
  "1w8waL_CvfCwy": Mf8TGC05oPm2;
  "1w8waL_LGFdAa": Mf8TGC05oPm2;
  "1w8waL_afe4a9": Mf8TGC05oPm2;
  "1w8waL_dGJ0kO": Mf8TGC05oPm2;
  "1w8waL_gXTeBK": Mf8TGC05oPm2;
  "1w8waL_kYbpHo": Mf8TGC05oPm2;
  "1w8waL_kqm11q": Mf8TGC05oPm2;
  "1w8waL_mIoVT0": Mf8TGC05oPm2;
  "1w8waL_qaMgXh": Mf8TGC05oPm2;
  "1w8waL_rxfZxj": Mf8TGC05oPm2;
  "9j1y7g_2OcJA6": Mf8TGC05oPm2;
  "9j1y7g_8NvomU": Mf8TGC05oPm2;
  "9j1y7g_B0U8U2": Mf8TGC05oPm2;
  "9j1y7g_CvfCwy": Mf8TGC05oPm2;
  "9j1y7g_LGFdAa": Mf8TGC05oPm2;
  "9j1y7g_afe4a9": Mf8TGC05oPm2;
  "9j1y7g_dGJ0kO": Mf8TGC05oPm2;
  "9j1y7g_gXTeBK": Mf8TGC05oPm2;
  "9j1y7g_kYbpHo": Mf8TGC05oPm2;
  "9j1y7g_kqm11q": Mf8TGC05oPm2;
  "9j1y7g_mIoVT0": Mf8TGC05oPm2;
  "9j1y7g_qaMgXh": Mf8TGC05oPm2;
  "9j1y7g_rxfZxj": Mf8TGC05oPm2;
  FkzcfC_2OcJA6: Mf8TGC05oPm2;
  FkzcfC_8NvomU: Mf8TGC05oPm2;
  FkzcfC_B0U8U2: Mf8TGC05oPm2;
  FkzcfC_CvfCwy: Mf8TGC05oPm2;
  FkzcfC_LGFdAa: Mf8TGC05oPm2;
  FkzcfC_afe4a9: Mf8TGC05oPm2;
  FkzcfC_dGJ0kO: Mf8TGC05oPm2;
  FkzcfC_gXTeBK: Mf8TGC05oPm2;
  FkzcfC_kYbpHo: Mf8TGC05oPm2;
  FkzcfC_kqm11q: Mf8TGC05oPm2;
  FkzcfC_mIoVT0: Mf8TGC05oPm2;
  FkzcfC_qaMgXh: Mf8TGC05oPm2;
  FkzcfC_rxfZxj: Mf8TGC05oPm2;
  ICOUSJ_2OcJA6: Mf8TGC05oPm2;
  ICOUSJ_8NvomU: Mf8TGC05oPm2;
  ICOUSJ_B0U8U2: Mf8TGC05oPm2;
  ICOUSJ_CvfCwy: Mf8TGC05oPm2;
  ICOUSJ_LGFdAa: Mf8TGC05oPm2;
  ICOUSJ_afe4a9: Mf8TGC05oPm2;
  ICOUSJ_dGJ0kO: Mf8TGC05oPm2;
  ICOUSJ_gXTeBK: Mf8TGC05oPm2;
  ICOUSJ_kYbpHo: Mf8TGC05oPm2;
  ICOUSJ_kqm11q: Mf8TGC05oPm2;
  ICOUSJ_mIoVT0: Mf8TGC05oPm2;
  ICOUSJ_qaMgXh: Mf8TGC05oPm2;
  ICOUSJ_rxfZxj: Mf8TGC05oPm2;
  IuN4as_2OcJA6: Mf8TGC05oPm2;
  IuN4as_8NvomU: Mf8TGC05oPm2;
  IuN4as_B0U8U2: Mf8TGC05oPm2;
  IuN4as_CvfCwy: Mf8TGC05oPm2;
  IuN4as_LGFdAa: Mf8TGC05oPm2;
  IuN4as_afe4a9: Mf8TGC05oPm2;
  IuN4as_dGJ0kO: Mf8TGC05oPm2;
  IuN4as_gXTeBK: Mf8TGC05oPm2;
  IuN4as_kYbpHo: Mf8TGC05oPm2;
  IuN4as_kqm11q: Mf8TGC05oPm2;
  IuN4as_mIoVT0: Mf8TGC05oPm2;
  IuN4as_qaMgXh: Mf8TGC05oPm2;
  IuN4as_rxfZxj: Mf8TGC05oPm2;
  PVscaM_2OcJA6: Mf8TGC05oPm2;
  PVscaM_8NvomU: Mf8TGC05oPm2;
  PVscaM_B0U8U2: Mf8TGC05oPm2;
  PVscaM_CvfCwy: Mf8TGC05oPm2;
  PVscaM_LGFdAa: Mf8TGC05oPm2;
  PVscaM_afe4a9: Mf8TGC05oPm2;
  PVscaM_dGJ0kO: Mf8TGC05oPm2;
  PVscaM_gXTeBK: Mf8TGC05oPm2;
  PVscaM_kYbpHo: Mf8TGC05oPm2;
  PVscaM_kqm11q: Mf8TGC05oPm2;
  PVscaM_mIoVT0: Mf8TGC05oPm2;
  PVscaM_qaMgXh: Mf8TGC05oPm2;
  PVscaM_rxfZxj: Mf8TGC05oPm2;
  dmVlzM_2OcJA6: Mf8TGC05oPm2;
  dmVlzM_8NvomU: Mf8TGC05oPm2;
  dmVlzM_B0U8U2: Mf8TGC05oPm2;
  dmVlzM_CvfCwy: Mf8TGC05oPm2;
  dmVlzM_LGFdAa: Mf8TGC05oPm2;
  dmVlzM_afe4a9: Mf8TGC05oPm2;
  dmVlzM_dGJ0kO: Mf8TGC05oPm2;
  dmVlzM_gXTeBK: Mf8TGC05oPm2;
  dmVlzM_kYbpHo: Mf8TGC05oPm2;
  dmVlzM_kqm11q: Mf8TGC05oPm2;
  dmVlzM_mIoVT0: Mf8TGC05oPm2;
  dmVlzM_qaMgXh: Mf8TGC05oPm2;
  dmVlzM_rxfZxj: Mf8TGC05oPm2;
  jjZzjV_2OcJA6: Mf8TGC05oPm2;
  jjZzjV_8NvomU: Mf8TGC05oPm2;
  jjZzjV_B0U8U2: Mf8TGC05oPm2;
  jjZzjV_CvfCwy: Mf8TGC05oPm2;
  jjZzjV_LGFdAa: Mf8TGC05oPm2;
  jjZzjV_afe4a9: Mf8TGC05oPm2;
  jjZzjV_dGJ0kO: Mf8TGC05oPm2;
  jjZzjV_gXTeBK: Mf8TGC05oPm2;
  jjZzjV_kYbpHo: Mf8TGC05oPm2;
  jjZzjV_kqm11q: Mf8TGC05oPm2;
  jjZzjV_mIoVT0: Mf8TGC05oPm2;
  jjZzjV_qaMgXh: Mf8TGC05oPm2;
  jjZzjV_rxfZxj: Mf8TGC05oPm2;
  ue5ETk_2OcJA6: Mf8TGC05oPm2;
  ue5ETk_8NvomU: Mf8TGC05oPm2;
  ue5ETk_B0U8U2: Mf8TGC05oPm2;
  ue5ETk_CvfCwy: Mf8TGC05oPm2;
  ue5ETk_LGFdAa: Mf8TGC05oPm2;
  ue5ETk_afe4a9: Mf8TGC05oPm2;
  ue5ETk_dGJ0kO: Mf8TGC05oPm2;
  ue5ETk_gXTeBK: Mf8TGC05oPm2;
  ue5ETk_kYbpHo: Mf8TGC05oPm2;
  ue5ETk_kqm11q: Mf8TGC05oPm2;
  ue5ETk_mIoVT0: Mf8TGC05oPm2;
  ue5ETk_qaMgXh: Mf8TGC05oPm2;
  ue5ETk_rxfZxj: Mf8TGC05oPm2;
}

interface ColumnMap17 {
  "2OcJA6": _05oPm2;
  "8NvomU": _05oPm2;
  B0U8U2: _05oPm2;
  CvfCwy: _05oPm2;
  LGFdAa: _05oPm2;
  afe4a9: _05oPm2;
  dGJ0kO: _05oPm2;
  gXTeBK: _05oPm2;
  kYbpHo: _05oPm2;
  kqm11q: _05oPm2;
  mIoVT0: _05oPm2;
  qaMgXh: _05oPm2;
  rxfZxj: _05oPm2;
}

interface RowMap17 {
  "1w8waL": Mf8TGC;
  "9j1y7g": Mf8TGC;
  FkzcfC: Mf8TGC;
  ICOUSJ: Mf8TGC;
  IuN4as: Mf8TGC;
  PVscaM: Mf8TGC;
  dmVlzM: Mf8TGC;
  jjZzjV: Mf8TGC;
  ue5ETk: Mf8TGC;
}

interface E5WXWqfk {
  id: string;
  blockIds: string[];
  blockMap: BlockMap26;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap26 {
  "08SA1U": _5VjsaYMoapdl;
  "3FTW2l": _3FTW2l;
  AJGGlp: _1gMaKvaA7BjO;
  BbYWOw: _5VjsaYMoapdl;
  HFuDHf: _5VjsaYMoapdl;
  HQBqle: _5VjsaYMoapdl;
  HwmlNt: _1gMaKvaA7BjO;
  JW25oo: _1gMaKvaA7BjO;
  QLyQS4: _5uvau9Bh;
  RrSGNX: AXkkW5;
  cc3cuo: _0d68qb;
  cypwrY: _1gMaKvaA7BjO;
  dS9srt: _5VjsaYMoapdl;
  eIQHVd: _1gMaKvaA7BjO;
  iORBHi: _5VjsaYMoapdl;
  tgnKfg: _1gMaKvaA7BjO;
  uumLQi: _5VjsaYMoapdl;
  wMSSQQ: _1gMaKvaA7BjO;
  zdeeo0: _5VjsaYMoapdl;
}

interface _3FTW2l {
  id: string;
  parentId: string;
  kind: string;
  table: Table16;
}

interface Table16 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap16;
  columnMap: ColumnMap16;
  cellMap: CellMap16;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap16 {
  "0ZScFJ_HCND7P": Mf8TGC05oPm2;
  "0ZScFJ_jda3sT": Mf8TGC05oPm2;
  "0gPP6k_HCND7P": Mf8TGC05oPm2;
  "0gPP6k_bmz3xS": Mf8TGC05oPm2;
  "0gPP6k_jda3sT": Mf8TGC05oPm2;
  "4vg1R5_HCND7P": Mf8TGC05oPm2;
  "4vg1R5_jda3sT": Mf8TGC05oPm2;
  "6tEbUM_HCND7P": Mf8TGC05oPm2;
  "6tEbUM_jda3sT": Mf8TGC05oPm2;
  "73MaUc_HCND7P": Mf8TGC05oPm2;
  "73MaUc_jda3sT": Mf8TGC05oPm2;
  GA81Wa_HCND7P: Mf8TGC05oPm2;
  GA81Wa_bmz3xS: Mf8TGC05oPm2;
  GA81Wa_jda3sT: Mf8TGC05oPm2;
  XLO9cW_HCND7P: Mf8TGC05oPm2;
  XLO9cW_jda3sT: Mf8TGC05oPm2;
}

interface ColumnMap16 {
  HCND7P: _05oPm2;
  bmz3xS: _05oPm2;
  jda3sT: _05oPm2;
}

interface RowMap16 {
  "0ZScFJ": Mf8TGC;
  "0gPP6k": Mf8TGC;
  "4vg1R5": Mf8TGC;
  "6tEbUM": Mf8TGC;
  "73MaUc": Mf8TGC;
  GA81Wa: Mf8TGC;
  XLO9cW: Mf8TGC;
}

interface DAbveUHS {
  id: string;
  blockIds: string[];
  blockMap: BlockMap25;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap25 {
  "9xDkO5oVFFgL": _5VjsaYMoapdl;
  ZWsy3oJugJR8: CRj3jW3wo6IO;
  hHE2ly4rOvku: X6pjrn;
  ir8uJ9: _5VjsaYMoapdl;
  mYoWWpsI9kZf: X6pjrn;
  odH55JRsxnTZ: _5VjsaYMoapdl;
}

interface BP7NEJ6f {
  id: string;
  blockIds: string[];
  blockMap: BlockMap24;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap24 {
  "1kzydy": _1gMaKvaA7BjO;
  "2YIzRU": _5uvau9Bh;
  "5phRbB": _5VjsaYMoapdl;
  "8x04ky": _0d68qb;
  BF1KsD: _5VjsaYMoapdl;
  HLoNv8: HLoNv8;
  HcmBv9: _1gMaKvaA7BjO;
  OWoZi6: _5VjsaYMoapdl;
  OYqe8j: O89Zfr;
  Zsccqc: AXkkW5;
  ggLKSS: _5VjsaYMoapdl;
  h5pYX7: _5VjsaYMoapdl;
  mw7m8m: _1gMaKvaA7BjO;
  qqDi2g: CRj3jW3wo6IO;
  sYBfotiE18q4: CRj3jW3wo6IO;
  wbzs0C: _5VjsaYMoapdl;
  xe2nmB: _5uvau9Bh;
}

interface HLoNv8 {
  id: string;
  parentId: string;
  kind: string;
  table: Table15;
}

interface Table15 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap15;
  columnMap: ColumnMap15;
  cellMap: CellMap15;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap15 {
  "10JyyE_8dRlbc": Mf8TGC05oPm2;
  "10JyyE_NNOpGs": Mf8TGC05oPm2;
  "10JyyE_VsRhud": Mf8TGC05oPm2;
  "10JyyE_aMdkDT": Mf8TGC05oPm2;
  fOqbyR_8dRlbc: Mf8TGC05oPm2;
  fOqbyR_NNOpGs: Mf8TGC05oPm2;
  fOqbyR_VsRhud: Mf8TGC05oPm2;
  fOqbyR_aMdkDT: Mf8TGC05oPm2;
  xMtPYk_8dRlbc: Mf8TGC05oPm2;
  xMtPYk_NNOpGs: Mf8TGC05oPm2;
  xMtPYk_VsRhud: Mf8TGC05oPm2;
  xMtPYk_aMdkDT: Mf8TGC05oPm2;
}

interface ColumnMap15 {
  "8dRlbc": _05oPm2;
  NNOpGs: _05oPm2;
  VsRhud: _05oPm2;
  aMdkDT: _05oPm2;
}

interface RowMap15 {
  "10JyyE": Mf8TGC;
  fOqbyR: Mf8TGC;
  xMtPYk: Mf8TGC;
}

interface Y0qYeoeb {
  id: string;
  blockIds: string[];
  blockMap: BlockMap23;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap23 {
  "2tN8QG": _5VjsaYMoapdl;
  "5phRbB": _5VjsaYMoapdl;
  "6JjpQbadWrLc": CRj3jW3wo6IO;
  Dajqq1: CRj3jW3wo6IO;
  H3LkeE: _5VjsaYMoapdl;
  K7ql0h: CRj3jW3wo6IO;
  KuZdmt: _1gMaKvaA7BjO;
  RvZIn2: _5VjsaYMoapdl;
  Ycx8jC: Ycx8jC;
  ccPls3: _1gMaKvaA7BjO;
  elsdYX: _1gMaKvaA7BjO;
  gltm9Z: _5VjsaYMoapdl;
  jq02iT: _5VjsaYMoapdl;
  kN9RRy: _0d68qb;
  p8Uofm: O89Zfr;
  s8Fuss: AXkkW5;
  tC61Zs: _5uvau9Bh;
  vk3RLZ: _5uvau9Bh;
  yKwwhYMDaffX: CRj3jW3wo6IO;
}

interface Ycx8jC {
  id: string;
  parentId: string;
  kind: string;
  table: Table14;
}

interface Table14 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap14;
  columnMap: ColumnMap14;
  cellMap: CellMap14;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap14 {
  "17LSkc_SDF2x8": Mf8TGC05oPm2;
  "17LSkc_b2k4A4": Mf8TGC05oPm2;
  "17LSkc_tU7NLU": Mf8TGC05oPm2;
  "17LSkc_yVvQgY": Mf8TGC05oPm2;
  D6ZmBn_SDF2x8: Mf8TGC05oPm2;
  D6ZmBn_b2k4A4: Mf8TGC05oPm2;
  D6ZmBn_tU7NLU: Mf8TGC05oPm2;
  D6ZmBn_yVvQgY: Mf8TGC05oPm2;
  J0qZIo_SDF2x8: Mf8TGC05oPm2;
  J0qZIo_b2k4A4: Mf8TGC05oPm2;
  J0qZIo_tU7NLU: Mf8TGC05oPm2;
  J0qZIo_yVvQgY: Mf8TGC05oPm2;
}

interface ColumnMap14 {
  SDF2x8: _05oPm2;
  b2k4A4: _05oPm2;
  tU7NLU: _05oPm2;
  yVvQgY: _05oPm2;
}

interface RowMap14 {
  "17LSkc": Mf8TGC;
  D6ZmBn: Mf8TGC;
  J0qZIo: Mf8TGC;
}

interface VucxoeHX {
  id: string;
  blockIds: string[];
  blockMap: BlockMap22;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap22 {
  BW8bsccpyXvI: _7Hn9eU;
  ir8uJ9: CRj3jW3wo6IO;
  jG4JQRQnFEp9: CRj3jW3wo6IO;
  jgc7OYXR3K3b: _1gMaKvaA7BjO;
  zcpWt41z2J1l: CRj3jW3wo6IO;
}

interface UvVV39vq {
  id: string;
  blockIds: string[];
  blockMap: BlockMap21;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap21 {
  "0dCy7xXRqid6": _1gMaKvaA7BjO;
  "15nkHrGtcBOH": _1gMaKvaA7BjO;
  "36OjSvasHlCl": _1gMaKvaA7BjO;
  "8TV1DFJLim7h": _1gMaKvaA7BjO;
  BeH5Ln6uX2Z5: _1gMaKvaA7BjO;
  CVP4bixpBW0D: _1gMaKvaA7BjO;
  CYiS2TTSAti1: _1gMaKvaA7BjO;
  CjnnvK9SdjBC: _0d68qb;
  CmVQp6a15ZPi: _1gMaKvaA7BjO;
  DUNg3M: AXkkW5;
  EeN8ivHhMLw2: _1gMaKvaA7BjO;
  GyFtdkOSebzt: _1gMaKvaA7BjO;
  IPMqbZ8PPMC7: _1gMaKvaA7BjO;
  LbBMNou0D4Qt: _1gMaKvaA7BjO;
  LcnJvmKz6INt: _1gMaKvaA7BjO;
  LfeIHnkYJFWP: _1gMaKvaA7BjO;
  OhElJTLvXtLB: _1gMaKvaA7BjO;
  PbcAynMY6v55: _1gMaKvaA7BjO;
  QSaoOSylvNWA: _1gMaKvaA7BjO;
  Yu6yKrUa0ryI: _1gMaKvaA7BjO;
  YwnF7gjTZvHh: _1gMaKvaA7BjO;
  ZEOj2ZQAsnc8: _1gMaKvaA7BjO;
  brs4FD52Ps53: _1gMaKvaA7BjO;
  deAms9: AXkkW5;
  eQwQbY7Xkmpz: _1gMaKvaA7BjO;
  fKxjU7: _1gMaKvaA7BjO;
  gy6JfttOao6X: _1gMaKvaA7BjO;
  khfjsa0412jT: _1gMaKvaA7BjO;
  m9yXWyPFKo4a: _1gMaKvaA7BjO;
  nVFXXlbGzUFG: _1gMaKvaA7BjO;
  nY9SgKPUSLnO: _1gMaKvaA7BjO;
  o89Zfr: O89Zfr;
  pytryrrNuYZI: _1gMaKvaA7BjO;
  re6U0JEDx3FG: _1gMaKvaA7BjO;
  usLbUs: _5VjsaYMoapdl;
  zTh6kg: _1gMaKvaA7BjO;
}

interface UnDAjRNk {
  id: string;
  blockIds: string[];
  blockMap: BlockMap20;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap20 {
  "1mOq8I": _5VjsaYMoapdl;
  "1wi26u": _1gMaKvaA7BjO;
  "4D0mVIUdwkgu": _1gMaKvaA7BjO;
  "6H3MQb": _1gMaKvaA7BjO;
  "8Dr5fA": _1gMaKvaA7BjO;
  AoH2P7IEXR8t: _1gMaKvaA7BjO;
  BISOhjPqISdZ: _5uvau9Bh;
  I8psGC: O89Zfr;
  L9bDX6: _5VjsaYMoapdl;
  M76z5z: AXkkW5;
  MTUCk3: _5VjsaYMoapdl;
  PRqHVI: _5VjsaYMoapdl;
  QxJsOR: _1gMaKvaA7BjO;
  Rozba4: _1gMaKvaA7BjO;
  V0wbYH: V0wbYH;
  Vz7KK3: _5VjsaYMoapdl;
  YOleOQ: _1gMaKvaA7BjO;
  abSadp: _5VjsaYMoapdl;
  dp8Sh1: _0d68qb;
  e17lDl: E17lDl;
  e8YkZZ: _1gMaKvaA7BjO;
  eViqxR: _1gMaKvaA7BjO;
  iO88c6: _5uvau9Bh;
  kmyOHi: _5uvau9Bh;
  lM2WdaJUpTPA: _1gMaKvaA7BjO;
  nit6oY: _5uvau9Bh;
  pT3EMT: _5VjsaYMoapdl;
  r73uNq: _1gMaKvaA7BjO;
  rGBXLz: _1gMaKvaA7BjO;
  rQXxEn4VUemd: _5VjsaYMoapdl;
  tSy4vV: _1gMaKvaA7BjO;
  w2si4r: _5VjsaYMoapdl;
  wME9A4: _1gMaKvaA7BjO;
}

interface E17lDl {
  id: string;
  parentId: string;
  kind: string;
  table: Table13;
}

interface Table13 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap13;
  columnMap: ColumnMap13;
  cellMap: CellMap13;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap13 {
  XRzI6S_GkfInd: Mf8TGC05oPm2;
  XRzI6S_OiCLjW: Mf8TGC05oPm2;
}

interface ColumnMap13 {
  GkfInd: _05oPm2;
  OiCLjW: _05oPm2;
}

interface RowMap13 {
  XRzI6S: Mf8TGC;
}

interface V0wbYH {
  id: string;
  parentId: string;
  kind: string;
  table: Table12;
}

interface Table12 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap12;
  columnMap: ColumnMap12;
  cellMap: CellMap12;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap12 {
  H1ruP98j5N7o_14Zw4y: Mf8TGC05oPm2;
  H1ruP98j5N7o_5Eppcn: Mf8TGC05oPm2;
  H1ruP98j5N7o_Rsla8K: Mf8TGC05oPm2;
  H1ruP98j5N7o_vi4gqE: Mf8TGC05oPm2;
  H1ruP98j5N7o_z6VpF8: Mf8TGC05oPm2;
  I8tsAf_14Zw4y: Mf8TGC05oPm2;
  I8tsAf_5Eppcn: Mf8TGC05oPm2;
  I8tsAf_Rsla8K: Mf8TGC05oPm2;
  I8tsAf_vi4gqE: Mf8TGC05oPm2;
  I8tsAf_z6VpF8: Mf8TGC05oPm2;
  S7LzRX_14Zw4y: Mf8TGC05oPm2;
  S7LzRX_5Eppcn: Mf8TGC05oPm2;
  S7LzRX_Rsla8K: Mf8TGC05oPm2;
  S7LzRX_vi4gqE: Mf8TGC05oPm2;
  S7LzRX_z6VpF8: Mf8TGC05oPm2;
  ueVnvl_14Zw4y: Mf8TGC05oPm2;
  ueVnvl_5Eppcn: Mf8TGC05oPm2;
  ueVnvl_Rsla8K: Mf8TGC05oPm2;
  ueVnvl_vi4gqE: Mf8TGC05oPm2;
  v5Lwi4_14Zw4y: Mf8TGC05oPm2;
  v5Lwi4_5Eppcn: Mf8TGC05oPm2;
  v5Lwi4_Rsla8K: Mf8TGC05oPm2;
  v5Lwi4_vi4gqE: Mf8TGC05oPm2;
  v5Lwi4_z6VpF8: Mf8TGC05oPm2;
}

interface ColumnMap12 {
  "14Zw4y": _05oPm2;
  "5Eppcn": _05oPm2;
  Rsla8K: _05oPm2;
  vi4gqE: _05oPm2;
  z6VpF8: _05oPm2;
}

interface RowMap12 {
  H1ruP98j5N7o: Mf8TGC;
  I8tsAf: Mf8TGC;
  S7LzRX: Mf8TGC;
  ueVnvl: Mf8TGC;
  v5Lwi4: Mf8TGC;
}

interface SwtVDZ9g {
  id: string;
  blockIds: string[];
  blockMap: BlockMap19;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap19 {
  "0RAvmp": _5VjsaYMoapdl;
  "10cw1j": _5VjsaYMoapdl;
  "1ikqx9UQfWwz": DxVpgqnZeTZ9;
  "4vDHg4fWOhBx": O89Zfr;
  "51uGiG7pdyzt": _1gMaKvaA7BjO;
  "5cmbCS": _5cmbCS;
  "6952d3a13d5589184a984f5d": DxVpgqnZeTZ9;
  "6952d3a85c0745090f635d1f": DxVpgqnZeTZ9;
  "6952d3af9931ee14c9cbb59e": DxVpgqnZeTZ9;
  "6952d3b634fc9623ec80df68": DxVpgqnZeTZ9;
  "6952d3bcffa0958ec8b8b7c5": DxVpgqnZeTZ9;
  "7Hn9eU": _7Hn9eU;
  "8dot7g": _5VjsaYMoapdl;
  "9Xv9Y4": O89Zfr;
  CtJCnK: AXkkW5;
  D0GkuA: _7Hn9eU;
  IM3KB7: AXkkW5;
  Ifal9D: O89Zfr;
  KWi9lH: _5VjsaYMoapdl;
  LEwlqA: AXkkW5;
  OWhhiUo5YInr: O89Zfr;
  S1NACn: _5VjsaYMoapdl;
  SxdgrruuMdK4: _7Hn9eU;
  Tqz2Eo: _7Hn9eU;
  UKFo6a: QgWFVK2Y84vu;
  Vhacqa: _5VjsaYMoapdl;
  XNdnox: O89Zfr;
  XOkK7IqWQy35: _7Hn9eU;
  ZNNRSX: _5VjsaYMoapdl;
  a4bM4d: O89Zfr;
  bkjfWV: QgWFVK2Y84vu;
  cRj3jW3wo6IO: CRj3jW3wo6IO;
  d0Y6kc: QgWFVK2Y84vu;
  fNhid2: _5VjsaYMoapdl;
  gyva3R: _5VjsaYMoapdl;
  iKBDpw: _5VjsaYMoapdl;
  ikqBEBQX4nIz: _1gMaKvaA7BjO;
  kC7mc9: O89Zfr;
  nf2UGT: _5VjsaYMoapdl;
  oonNw0: _5VjsaYMoapdl;
  osBxMz: AXkkW5;
  p2orKu1qUoQe: DxVpgqnZeTZ9;
  p5pTEk: _5VjsaYMoapdl;
  phnXOg: O89Zfr;
  pmlaHi: PmlaHi;
  psbhvn: QgWFVK2Y84vu;
  t3NITdHFx2TU: DxVpgqnZeTZ9;
  tJ99epJ0kHjU: _1gMaKvaA7BjO;
  tfwLoY: _5VjsaYMoapdl;
  uqyTL9pJdPlm: _1gMaKvaA7BjO;
  wZPDVU: O89Zfr;
  yfSJ4D: QgWFVK2Y84vu;
  zwrkTWcxSATW: _1gMaKvaA7BjO;
}

interface PmlaHi {
  id: string;
  parentId: string;
  kind: string;
  table: Table11;
}

interface Table11 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap11;
  columnMap: ColumnMap11;
  cellMap: CellMap11;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap11 {
  Cs0VUh_1G9c1a: Mf8TGC05oPm2;
  Cs0VUh_77a1PC: Mf8TGC05oPm2;
  Cs0VUh_NXQIZ1: Mf8TGC05oPm2;
  OH776p_1G9c1a: Mf8TGC05oPm2;
  OH776p_77a1PC: Mf8TGC05oPm2;
  OH776p_NXQIZ1: Mf8TGC05oPm2;
  PkOqlR_1G9c1a: Mf8TGC05oPm2;
  PkOqlR_77a1PC: Mf8TGC05oPm2;
  PkOqlR_NXQIZ1: Mf8TGC05oPm2;
  kNgQlc_1G9c1a: Mf8TGC05oPm2;
  kNgQlc_77a1PC: Mf8TGC05oPm2;
  kNgQlc_NXQIZ1: Mf8TGC05oPm2;
  oW2adg_1G9c1a: Mf8TGC05oPm2;
  oW2adg_77a1PC: Mf8TGC05oPm2;
  oW2adg_NXQIZ1: Mf8TGC05oPm2;
}

interface ColumnMap11 {
  "1G9c1a": _05oPm2;
  "77a1PC": _05oPm2;
  NXQIZ1: _05oPm2;
}

interface RowMap11 {
  Cs0VUh: Mf8TGC;
  OH776p: Mf8TGC;
  PkOqlR: Mf8TGC;
  kNgQlc: Mf8TGC;
  oW2adg: Mf8TGC;
}

interface CRj3jW3wo6IO {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text11;
}

interface Text11 {
  inlineElements: InlineElement9[];
  kind: string;
}

interface InlineElement9 {
  color?: string;
  kind: string;
  text: Text2;
  underline?: boolean;
  bold?: boolean;
}

interface _7Hn9eU {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text10;
}

interface Text10 {
  inlineElements: InlineElement8[];
  kind: string;
}

interface InlineElement8 {
  kind: string;
  text: Text2;
  color?: string;
  bold?: boolean;
}

interface _5cmbCS {
  id: string;
  parentId: string;
  kind: string;
  table: Table10;
}

interface Table10 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap10;
  columnMap: ColumnMap10;
  cellMap: CellMap10;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap10 {
  GeoJRg_Yq2Z5D: Mf8TGC05oPm2;
  qsNn39_IXpGo0: Mf8TGC05oPm2;
  qsNn39_WBMzoo: Mf8TGC05oPm2;
  qsNn39_Yq2Z5D: Mf8TGC05oPm2;
}

interface ColumnMap10 {
  IXpGo0: _05oPm2;
  WBMzoo: _05oPm2;
  Yq2Z5D: _05oPm2;
}

interface RowMap10 {
  GeoJRg: Mf8TGC;
  qsNn39: Mf8TGC;
}

interface SZD4RCWq {
  id: string;
  blockIds: string[];
  blockMap: BlockMap18;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap18 {
  "8YygjZ": _1gMaKvaA7BjO;
  "8qDaYo": _5VjsaYMoapdl;
  AQ1mv3: _5VjsaYMoapdl;
  C85fcQ: O89Zfr;
  FHtUEb: _0d68qb;
  FRDQ0h: _5VjsaYMoapdl;
  Vp9UWm: _1gMaKvaA7BjO;
  WHliQp: _1gMaKvaA7BjO;
  WaLqK9: _5VjsaYMoapdl;
  YThDHv: _5uvau9Bh;
  aHeGbO: _5uvau9Bh;
  beg00q: _1gMaKvaA7BjO;
  dGn8LY: DGn8LY;
  oqmXcu: AXkkW5;
  pDhzvH: _1gMaKvaA7BjO;
  vH72SR: _5VjsaYMoapdl;
  xsz3rA: _5VjsaYMoapdl;
}

interface DGn8LY {
  id: string;
  parentId: string;
  kind: string;
  table: Table9;
}

interface Table9 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap9;
  columnMap: ColumnMap9;
  cellMap: CellMap9;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap9 {
  Crl7cA_9KVxbk: Mf8TGC05oPm2;
  Crl7cA_AVspOu: Mf8TGC05oPm2;
  Crl7cA_lfmVo8: Mf8TGC05oPm2;
  Crl7cA_z2o9Q0: Mf8TGC05oPm2;
  Dj82Za_9KVxbk: Mf8TGC05oPm2;
  Dj82Za_AVspOu: Mf8TGC05oPm2;
  Dj82Za_lfmVo8: Mf8TGC05oPm2;
  Dj82Za_z2o9Q0: Mf8TGC05oPm2;
  aRWcRm_9KVxbk: Mf8TGC05oPm2;
  aRWcRm_AVspOu: Mf8TGC05oPm2;
  aRWcRm_lfmVo8: Mf8TGC05oPm2;
  aRWcRm_z2o9Q0: Mf8TGC05oPm2;
}

interface ColumnMap9 {
  "9KVxbk": _05oPm2;
  AVspOu: _05oPm2;
  lfmVo8: _05oPm2;
  z2o9Q0: _05oPm2;
}

interface RowMap9 {
  Crl7cA: Mf8TGC;
  Dj82Za: Mf8TGC;
  aRWcRm: Mf8TGC;
}

interface SBDKY26X {
  id: string;
  blockIds: string[];
  blockMap: BlockMap17;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap17 {
  "64uiX4": _5VjsaYMoapdl;
  "723moS": _1gMaKvaA7BjO;
  BLbHaj: BLbHaj;
  F5aED6: _1gMaKvaA7BjO;
  FYLtC5: _1gMaKvaA7BjO;
  Gl1c3J: _1gMaKvaA7BjO;
  H3VVnt: _5VjsaYMoapdl;
  HzIRL5: AXkkW5;
  Ku5e2M: _5VjsaYMoapdl;
  LRwvYt: _1gMaKvaA7BjO;
  PZaJWC: _5VjsaYMoapdl;
  dQczgi: _5VjsaYMoapdl;
  h8rLwS: _5uvau9Bh;
  mRAzUs: _5VjsaYMoapdl;
  mVwxlA: _5VjsaYMoapdl;
  n0aneF: _0d68qb;
  q9ZV9t: _1gMaKvaA7BjO;
  r6gMoR: _5VjsaYMoapdl;
  wRLz1K: _1gMaKvaA7BjO;
}

interface BLbHaj {
  id: string;
  parentId: string;
  kind: string;
  table: Table8;
}

interface Table8 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap8;
  columnMap: ColumnMap8;
  cellMap: CellMap8;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap8 {
  "2kOvG5_paQD3R": Mf8TGC05oPm2;
  "2kOvG5_vycCZ2": Mf8TGC05oPm2;
  "5axBh6_paQD3R": Mf8TGC05oPm2;
  "5axBh6_vycCZ2": Mf8TGC05oPm2;
  CVcPje_paQD3R: Mf8TGC05oPm2;
  CVcPje_vycCZ2: Mf8TGC05oPm2;
  FLAFfu_paQD3R: Mf8TGC05oPm2;
  FLAFfu_vycCZ2: Mf8TGC05oPm2;
  Kk8U7D_RZ783f: Mf8TGC05oPm2;
  Kk8U7D_paQD3R: Mf8TGC05oPm2;
  Kk8U7D_vycCZ2: Mf8TGC05oPm2;
  eJIDa3_paQD3R: Mf8TGC05oPm2;
  eJIDa3_vycCZ2: Mf8TGC05oPm2;
  wXOTBM_RZ783f: Mf8TGC05oPm2;
  wXOTBM_paQD3R: Mf8TGC05oPm2;
  wXOTBM_vycCZ2: Mf8TGC05oPm2;
}

interface ColumnMap8 {
  RZ783f: _05oPm2;
  paQD3R: _05oPm2;
  vycCZ2: _05oPm2;
}

interface RowMap8 {
  "2kOvG5": Mf8TGC;
  "5axBh6": Mf8TGC;
  CVcPje: Mf8TGC;
  FLAFfu: Mf8TGC;
  Kk8U7D: Mf8TGC;
  eJIDa3: Mf8TGC;
  wXOTBM: Mf8TGC;
}

interface S4klh1FU {
  id: string;
  blockIds: string[];
  blockMap: BlockMap16;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap16 {
  "3GbSlr": _1gMaKvaA7BjO;
  "7A0XWr": X6pjrn;
  "7LMDPP": _5VjsaYMoapdl;
  An7p6b: _5VjsaYMoapdl;
  DBfSvX: _1gMaKvaA7BjO;
  EDdOXp: _5uvau9Bh;
  MuH5EB: _5VjsaYMoapdl;
  e6bXr7: _0d68qb;
  fke25t: AXkkW5;
  jWv9wV: JWv9wV;
  non9R1: _5VjsaYMoapdl;
  xJFPyB: O89Zfr;
  yU20JQ: _5VjsaYMoapdl;
}

interface JWv9wV {
  id: string;
  parentId: string;
  kind: string;
  table: Table7;
}

interface Table7 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap7;
  columnMap: ColumnMap7;
  cellMap: CellMap7;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap7 {
  M1JmFI_81bNYS: Mf8TGC05oPm2;
  M1JmFI_82OZZA: Mf8TGC05oPm2;
  M1JmFI_ooSWoJ: Mf8TGC05oPm2;
  M1JmFI_sNYXlX: Mf8TGC05oPm2;
  TMoS3P_81bNYS: Mf8TGC05oPm2;
  TMoS3P_82OZZA: Mf8TGC05oPm2;
  TMoS3P_ooSWoJ: Mf8TGC05oPm2;
  TMoS3P_sNYXlX: Mf8TGC05oPm2;
}

interface ColumnMap7 {
  "81bNYS": _05oPm2;
  "82OZZA": _05oPm2;
  ooSWoJ: _05oPm2;
  sNYXlX: _05oPm2;
}

interface RowMap7 {
  M1JmFI: Mf8TGC;
  TMoS3P: Mf8TGC;
}

interface RNyY0Byp {
  id: string;
  blockIds: string[];
  blockMap: BlockMap15;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap15 {
  "2uih6p": _1gMaKvaA7BjO;
  "7tWAEh": _1gMaKvaA7BjO;
  "8MXeIK": _5VjsaYMoapdl;
  Erreze: _0d68qb;
  FZPpTL: _5VjsaYMoapdl;
  GrNb5Y: _5VjsaYMoapdl;
  HbeXH8: _5uvau9Bh;
  JpUzyp: _5VjsaYMoapdl;
  PStHNa: _1gMaKvaA7BjO;
  RHH9jj: RHH9jj;
  S930O9: _5VjsaYMoapdl;
  SSSAXP: _1gMaKvaA7BjO;
  UdbhIp: _5VjsaYMoapdl;
  XkphKn: _1gMaKvaA7BjO;
  cSzmju: _1gMaKvaA7BjO;
  dIV78z: _5VjsaYMoapdl;
  f2q6QA: _5VjsaYMoapdl;
  mtK2Gc: _1gMaKvaA7BjO;
  x84xeb: AXkkW5;
}

interface RHH9jj {
  id: string;
  parentId: string;
  kind: string;
  table: Table6;
}

interface Table6 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap6;
  columnMap: ColumnMap6;
  cellMap: CellMap6;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap6 {
  "6klkt5_rsGgAT": Mf8TGC05oPm2;
  "6klkt5_zO2F0o": Mf8TGC05oPm2;
  "7umlfU_rsGgAT": Mf8TGC05oPm2;
  "7umlfU_zO2F0o": Mf8TGC05oPm2;
  PGRhip_rsGgAT: Mf8TGC05oPm2;
  PGRhip_zO2F0o: Mf8TGC05oPm2;
  fwMeck_rsGgAT: Mf8TGC05oPm2;
  fwMeck_zO2F0o: Mf8TGC05oPm2;
  lZODXC_NfBEeM: Mf8TGC05oPm2;
  lZODXC_rsGgAT: Mf8TGC05oPm2;
  lZODXC_zO2F0o: Mf8TGC05oPm2;
  oY1Zin_NfBEeM: Mf8TGC05oPm2;
  oY1Zin_rsGgAT: Mf8TGC05oPm2;
  oY1Zin_zO2F0o: Mf8TGC05oPm2;
  qcWH2E_rsGgAT: Mf8TGC05oPm2;
  qcWH2E_zO2F0o: Mf8TGC05oPm2;
}

interface ColumnMap6 {
  NfBEeM: _05oPm2;
  rsGgAT: _05oPm2;
  zO2F0o: _05oPm2;
}

interface RowMap6 {
  "6klkt5": Mf8TGC;
  "7umlfU": Mf8TGC;
  PGRhip: Mf8TGC;
  fwMeck: Mf8TGC;
  lZODXC: Mf8TGC;
  oY1Zin: Mf8TGC;
  qcWH2E: Mf8TGC;
}

interface OwUUgbmj {
  id: string;
  blockIds: string[];
  blockMap: BlockMap14;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap14 {
  "6346Oy": _5uvau9Bh;
  "6UtX46": _5VjsaYMoapdl;
  DBfSvX: _1gMaKvaA7BjO;
  DUraim: AXkkW5;
  GTXzIE: _0d68qb;
  HzWi4P: _1gMaKvaA7BjO;
  bkOSoX: _1gMaKvaA7BjO;
  e30u49: _5VjsaYMoapdl;
  oz3IDr: _5VjsaYMoapdl;
  sqvOzB: _5VjsaYMoapdl;
  vksoFs: VksoFs;
  xJFPyB: O89Zfr;
  yU20JQ: _5VjsaYMoapdl;
}

interface VksoFs {
  id: string;
  parentId: string;
  kind: string;
  table: Table5;
}

interface Table5 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap5;
  columnMap: ColumnMap5;
  cellMap: CellMap5;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap5 {
  PlFv2J_8onmL4: Mf8TGC05oPm2;
  PlFv2J_ElKUkY: Mf8TGC05oPm2;
  PlFv2J_JZR1cK: Mf8TGC05oPm2;
  PlFv2J_h5Sbru: Mf8TGC05oPm2;
  rp5Ps4_8onmL4: Mf8TGC05oPm2;
  rp5Ps4_ElKUkY: Mf8TGC05oPm2;
  rp5Ps4_JZR1cK: Mf8TGC05oPm2;
  rp5Ps4_h5Sbru: Mf8TGC05oPm2;
}

interface ColumnMap5 {
  "8onmL4": _05oPm2;
  ElKUkY: _05oPm2;
  JZR1cK: _05oPm2;
  h5Sbru: _05oPm2;
}

interface RowMap5 {
  PlFv2J: Mf8TGC;
  rp5Ps4: Mf8TGC;
}

interface N5qWWjXG {
  id: string;
  blockIds: string[];
  blockMap: BlockMap13;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap13 {
  "6NwxujS7JKL6": _1gMaKvaA7BjO;
  HurMC44DeX7q: _1gMaKvaA7BjO;
  J1XdxClZKynC: _1gMaKvaA7BjO;
  QZAnLpPU0qFh: _1gMaKvaA7BjO;
  UCoVFk0IO6Tt: _1gMaKvaA7BjO;
  W3z9hUHjPKMz: _1gMaKvaA7BjO;
  deAms9: AXkkW5;
  fKxjU7: _1gMaKvaA7BjO;
  img65h: _5VjsaYMoapdl;
  lAF4EK: _1gMaKvaA7BjO;
  mSfHvpZ7oFpq: _1gMaKvaA7BjO;
  o7sFzEyLBpk4: _1gMaKvaA7BjO;
  o89Zfr: O89Zfr;
  oYEZLNikQdnB: _1gMaKvaA7BjO;
  sZNiBe15Honk: _1gMaKvaA7BjO;
  xmR7p0f5dDse: _1gMaKvaA7BjO;
  xtgjh6: AXkkW5;
  zmYPBQv3RDEG: _1gMaKvaA7BjO;
}

interface LrN8bpgM {
  id: string;
  blockIds: string[];
  blockMap: BlockMap12;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap12 {
  "5N8zOIEpAqh3": HJ2XbfzOICOX;
  ir8uJ9: HJ2XbfzOICOX;
}

interface Jsyfx1Ij {
  id: string;
  blockIds: string[];
  blockMap: BlockMap11;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap11 {
  "1eAxL4": _5VjsaYMoapdl;
  "9ralUO": _5VjsaYMoapdl;
  Awc0eF: _5VjsaYMoapdl;
  BhXkG3: _5VjsaYMoapdl;
  FZa2uZ: _5VjsaYMoapdl;
  H7F2nQ: H7F2nQ;
  HDLXbt: _1gMaKvaA7BjO;
  O0tOp0: _1gMaKvaA7BjO;
  ToPVfN: AXkkW5;
  VdgKAB: _5uvau9Bh;
  VhK420: _5VjsaYMoapdl;
  cbOriP: _1gMaKvaA7BjO;
  mNqzn9: _1gMaKvaA7BjO;
  oqUlga: _1gMaKvaA7BjO;
  oyYrS4: _0d68qb;
  sQ1zVH: _5VjsaYMoapdl;
  srADfh: _1gMaKvaA7BjO;
  vOiq6H: _5VjsaYMoapdl;
  wPDBw4: _1gMaKvaA7BjO;
}

interface H7F2nQ {
  id: string;
  parentId: string;
  kind: string;
  table: Table4;
}

interface Table4 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap4;
  columnMap: ColumnMap4;
  cellMap: CellMap4;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap4 {
  KlyrGK_4dcrlx: Mf8TGC05oPm2;
  KlyrGK_KgUkBb: Mf8TGC05oPm2;
  MkKNrk_4PaMxn: Mf8TGC05oPm2;
  MkKNrk_4dcrlx: Mf8TGC05oPm2;
  MkKNrk_KgUkBb: Mf8TGC05oPm2;
  SdI9ov_4dcrlx: Mf8TGC05oPm2;
  SdI9ov_KgUkBb: Mf8TGC05oPm2;
  Td1hpm_4dcrlx: Mf8TGC05oPm2;
  Td1hpm_KgUkBb: Mf8TGC05oPm2;
  pDfQdU_4dcrlx: Mf8TGC05oPm2;
  pDfQdU_KgUkBb: Mf8TGC05oPm2;
  wESRy8_4PaMxn: Mf8TGC05oPm2;
  wESRy8_4dcrlx: Mf8TGC05oPm2;
  wESRy8_KgUkBb: Mf8TGC05oPm2;
  xMtUHl_4dcrlx: Mf8TGC05oPm2;
  xMtUHl_KgUkBb: Mf8TGC05oPm2;
}

interface ColumnMap4 {
  "4PaMxn": _05oPm2;
  "4dcrlx": _05oPm2;
  KgUkBb: _05oPm2;
}

interface RowMap4 {
  KlyrGK: Mf8TGC;
  MkKNrk: Mf8TGC;
  SdI9ov: Mf8TGC;
  Td1hpm: Mf8TGC;
  pDfQdU: Mf8TGC;
  wESRy8: Mf8TGC;
  xMtUHl: Mf8TGC;
}

interface IXWLEX7W {
  id: string;
  blockIds: string[];
  blockMap: BlockMap10;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap10 {
  "5qsMiD": _1gMaKvaA7BjO;
  DBfSvX: _1gMaKvaA7BjO;
  HFqqL2: _0d68qb;
  OIAG2h: AXkkW5;
  ZpYadc: _5VjsaYMoapdl;
  e3fhec: _5VjsaYMoapdl;
  jHS7hC: _5VjsaYMoapdl;
  lChBiE: LChBiE;
  mpu5rD: _5uvau9Bh;
  u7wxw4: _5VjsaYMoapdl;
  x6pjrn: X6pjrn;
  xJFPyB: O89Zfr;
  yU20JQ: _5VjsaYMoapdl;
}

interface X6pjrn {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text9;
}

interface Text9 {
  inlineElements: InlineElement7[];
  kind: string;
}

interface InlineElement7 {
  kind: string;
  text: Text2;
  color?: string;
}

interface LChBiE {
  id: string;
  parentId: string;
  kind: string;
  table: Table3;
}

interface Table3 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap3;
  columnMap: ColumnMap3;
  cellMap: CellMap3;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap3 {
  FeQfSo_cpD3q9: Mf8TGC05oPm2;
  FeQfSo_doqFXo: Mf8TGC05oPm2;
  FeQfSo_trDZxC: Mf8TGC05oPm2;
  FeQfSo_vysrKD: Mf8TGC05oPm2;
  oth7tT_cpD3q9: Mf8TGC05oPm2;
  oth7tT_doqFXo: Mf8TGC05oPm2;
  oth7tT_trDZxC: Mf8TGC05oPm2;
  oth7tT_vysrKD: Mf8TGC05oPm2;
}

interface ColumnMap3 {
  cpD3q9: _05oPm2;
  doqFXo: _05oPm2;
  trDZxC: _05oPm2;
  vysrKD: _05oPm2;
}

interface RowMap3 {
  FeQfSo: Mf8TGC;
  oth7tT: Mf8TGC;
}

interface GMBynQQh {
  id: string;
  blockIds: string[];
  blockMap: BlockMap9;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap9 {
  "2JB43M": _1gMaKvaA7BjO;
  "2cAoMp": _1gMaKvaA7BjO;
  "5yDW92": _1gMaKvaA7BjO;
  "8WsuA0": _1gMaKvaA7BjO;
  AAFkAy: O89Zfr;
  AeZoOG: AXkkW5;
  DMp8Qi: O89Zfr;
  EtDHTW: _5VjsaYMoapdl;
  I2jxXE: _1gMaKvaA7BjO;
  Lwodwv: _1gMaKvaA7BjO;
  Pwdbnr: AXkkW5;
  QkrUqn: _1gMaKvaA7BjO;
  RMUUpr: _5VjsaYMoapdl;
  S67V4g: O89Zfr;
  TSze8h: AXkkW5;
  TbA5S0: _1gMaKvaA7BjO;
  UhDZTa: O89Zfr;
  UoEqzw: AXkkW5;
  Xuj28D: AXkkW5;
  bHL9UW: _1gMaKvaA7BjO;
  bs8kkS: AXkkW5;
  kIyDr3: _5VjsaYMoapdl;
  l24U86: _1gMaKvaA7BjO;
  wV8Vzw: _5VjsaYMoapdl;
  yXdDYd: _1gMaKvaA7BjO;
  zaMLeC: _1gMaKvaA7BjO;
  zdGBwc: AXkkW5;
}

interface FmkKkcaV {
  id: string;
  blockIds: string[];
  blockMap: BlockMap8;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap8 {
  "1nJrirYTVXxi": _1gMaKvaA7BjO;
  "58fJo0cppAfA": _1gMaKvaA7BjO;
  AcXqKvECdJAb: _1gMaKvaA7BjO;
  BJshXVIjqufF: _1gMaKvaA7BjO;
  EfD42FF6Tq8h: _1gMaKvaA7BjO;
  FgwN66gpIzyc: _1gMaKvaA7BjO;
  JAm9Ky: AXkkW5;
  LlFaJCLzeLku: _1gMaKvaA7BjO;
  Onowc7SwBRVc: _1gMaKvaA7BjO;
  QeVuGc4p8mWr: _1gMaKvaA7BjO;
  R6dZAiB0xA5Q: _1gMaKvaA7BjO;
  TELmhNKiiVXz: _1gMaKvaA7BjO;
  UgOaMEf49fdo: _1gMaKvaA7BjO;
  YmNb2esJKFJt: _1gMaKvaA7BjO;
  ZUakJvsRaGoY: _1gMaKvaA7BjO;
  ZrkftV8lKRG3: _1gMaKvaA7BjO;
  deAms9: AXkkW5;
  dlj3qP: _5VjsaYMoapdl;
  eZ55Nnn90rlC: _1gMaKvaA7BjO;
  fKxjU7: _1gMaKvaA7BjO;
  fzBZl4lFwy0c: _1gMaKvaA7BjO;
  g4fFhn1aj1Ye: _1gMaKvaA7BjO;
  k6eMLe9eiBcj: _1gMaKvaA7BjO;
  lNDBU1ddxQ50: _1gMaKvaA7BjO;
  o89Zfr: O89Zfr;
  ox5JYAjJA2ok: _1gMaKvaA7BjO;
  p0HMAhnr5DXO: _1gMaKvaA7BjO;
  rRkj3xyLivEb: _1gMaKvaA7BjO;
  sFtT9N: _1gMaKvaA7BjO;
  sZys5wVzZJx2: _1gMaKvaA7BjO;
  smKDd7mJMJ41: _1gMaKvaA7BjO;
  vhc8MzoVo2L8: _1gMaKvaA7BjO;
  w9OtvdGSFdWD: _1gMaKvaA7BjO;
}

interface O89Zfr {
  id: string;
  parentId: string;
  kind: string;
  quote: Quote;
}

interface Quote {
  childIds: string[];
}

interface E3d9N6sX {
  id: string;
  blockIds: string[];
  blockMap: BlockMap7;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap7 {
  "0GgUTL": _1gMaKvaA7BjO;
  "0MAq9IQwvcVR": _1gMaKvaA7BjO;
  "0RqD9MF14WKi": _5VjsaYMoapdl;
  "2DBZjO4pGm5K": _1gMaKvaA7BjO;
  "3LF2X9GI": _5uvau9Bh;
  "3ypsey": _5VjsaYMoapdl;
  "54Tn0i6rbnO5": _1gMaKvaA7BjO;
  "5JVzoyOTf6rn": _1gMaKvaA7BjO;
  "5YOcz17T27Qr": _1gMaKvaA7BjO;
  "5tUYRM": _1gMaKvaA7BjO;
  "6xAffz": _1gMaKvaA7BjO;
  "7NtMX3ojDGtX": _1gMaKvaA7BjO;
  "7RziPr": _1gMaKvaA7BjO;
  "8KcW4T": _8KcW4T;
  A5bpt9: _1gMaKvaA7BjO;
  AdmPzwolHH1K: _5VjsaYMoapdl;
  AvUzsg: _5VjsaYMoapdl;
  CP4544MXF1Ic: _1gMaKvaA7BjO;
  CrXRgV: _1gMaKvaA7BjO;
  DmWqmMxAx6m9: _5VjsaYMoapdl;
  DszBye: _1gMaKvaA7BjO;
  ELTzsOlqRYTP: _1gMaKvaA7BjO;
  F1dM8r: _5VjsaYMoapdl;
  FZPQ89DZewOo: _1gMaKvaA7BjO;
  GI1GSsiDoh2b: _1gMaKvaA7BjO;
  HA9oU4: _1gMaKvaA7BjO;
  HcGxfKxGEOMU: _1gMaKvaA7BjO;
  HkW8hie7cME1: _1gMaKvaA7BjO;
  J6PjXsvUb6bK: _1gMaKvaA7BjO;
  JjquWEd5N7XB: _1gMaKvaA7BjO;
  JnLd9R472ZTS: _1gMaKvaA7BjO;
  KFAEuUtNYV5H: _1gMaKvaA7BjO;
  KJp9bC: _1gMaKvaA7BjO;
  KX94R4blKc7P: _1gMaKvaA7BjO;
  LxENnI: _5VjsaYMoapdl;
  M0QmHZklDVpv: _1gMaKvaA7BjO;
  MOGAsk: _5VjsaYMoapdl;
  Myb7L1tN: _5uvau9Bh;
  NImXT4ied11s: _1gMaKvaA7BjO;
  NVY5ESQh: _5uvau9Bh;
  OB7w2B: _5VjsaYMoapdl;
  OnfStPZuvrWy: _1gMaKvaA7BjO;
  PEXFGQu7WoUL: _1gMaKvaA7BjO;
  QdBkjz: _1gMaKvaA7BjO;
  RQwfEiSp2kn5: _1gMaKvaA7BjO;
  RVtbQm: AXkkW5;
  Rt3gQk: _1gMaKvaA7BjO;
  S4m5Iu0PqHPg: _1gMaKvaA7BjO;
  S5piaLUfSqt2: _1gMaKvaA7BjO;
  SVosnR8mdiTe: _1gMaKvaA7BjO;
  SpdDgrpZconj: _1gMaKvaA7BjO;
  THcMBd: _5VjsaYMoapdl;
  TrbHIYChMiNI: _1gMaKvaA7BjO;
  UgjU8nkI0N2r: _5VjsaYMoapdl;
  UhNIlfrsKuhh: _1gMaKvaA7BjO;
  Uhf5XSvm: _5uvau9Bh;
  UmZE83V0qwUM: _1gMaKvaA7BjO;
  VaR7DmvpNcuD: _1gMaKvaA7BjO;
  VjlGSAcipOgF: _1gMaKvaA7BjO;
  W0EOUYj17vr6: _1gMaKvaA7BjO;
  WVm1XEQXRa1P: _1gMaKvaA7BjO;
  XaVWhWp2h3xK: _1gMaKvaA7BjO;
  YRFyr30H7sHP: _1gMaKvaA7BjO;
  Ym0wCZUJf82h: _1gMaKvaA7BjO;
  YsYbt12mBLhR: _1gMaKvaA7BjO;
  Yvs9Y1: _1gMaKvaA7BjO;
  ZJdb4oD4ds6H: _1gMaKvaA7BjO;
  a2aTaAsH: _5uvau9Bh;
  a8XpPj: _1gMaKvaA7BjO;
  aI4UPl: _1gMaKvaA7BjO;
  aLsLacgxfKQ2: _1gMaKvaA7BjO;
  aqsVXi: _1gMaKvaA7BjO;
  bAbLlU0aY9j9: _1gMaKvaA7BjO;
  blk8wugX4akj: _1gMaKvaA7BjO;
  briK4hNd2v1z: _1gMaKvaA7BjO;
  c6MiMU: _1gMaKvaA7BjO;
  cVH7Jz: _5VjsaYMoapdl;
  dF4iORy85afC: _1gMaKvaA7BjO;
  dvIAloptNJ2h: _1gMaKvaA7BjO;
  dxjhV24wl3XS: _1gMaKvaA7BjO;
  eJhY9cPX: _5uvau9Bh;
  f2LytWd3hKkF: _1gMaKvaA7BjO;
  g2sgM8i7bjW6: _1gMaKvaA7BjO;
  gSzKWpD0eFiE: _1gMaKvaA7BjO;
  guaU5czfDzpD: _1gMaKvaA7BjO;
  gwDKGY: _1gMaKvaA7BjO;
  h9SKzg6j4UEJ: _5VjsaYMoapdl;
  iHZd5f: _5VjsaYMoapdl;
  iJ6pKdgNBMbd: _1gMaKvaA7BjO;
  iQuoR2: _1gMaKvaA7BjO;
  iSBWiwU5: _5uvau9Bh;
  iUyosl: _1gMaKvaA7BjO;
  iXWCCZ: _1gMaKvaA7BjO;
  iYWTSI5gqakr: _1gMaKvaA7BjO;
  iZPLks: _5VjsaYMoapdl;
  ijTX0juaX5O2: _1gMaKvaA7BjO;
  jVwDmtIRRYvg: _1gMaKvaA7BjO;
  jt4oM8pYXfCE: _1gMaKvaA7BjO;
  kXqzWJXzwZ3W: _1gMaKvaA7BjO;
  kmiyb1aEhpUo: _5VjsaYMoapdl;
  l9aoGKIHz2Y1: _1gMaKvaA7BjO;
  mZujoN: _5VjsaYMoapdl;
  mf3JBLPq3XZs: _1gMaKvaA7BjO;
  n74tNHTvkM6X: _1gMaKvaA7BjO;
  nIqYYQ: _5VjsaYMoapdl;
  nhvCgDq96JVC: _1gMaKvaA7BjO;
  nnwen6: _1gMaKvaA7BjO;
  pN7HfIcK: _5uvau9Bh;
  peJ38Gs33SZo: _1gMaKvaA7BjO;
  qV2EApst: _5uvau9Bh;
  qymUDnWvZVp4: _1gMaKvaA7BjO;
  rSZJ9Y1j00YQ: _1gMaKvaA7BjO;
  raAQ5CRUX0hz: _1gMaKvaA7BjO;
  sMah24: _5VjsaYMoapdl;
  sYgzHiVQ: _5uvau9Bh;
  sZfQvH: _5VjsaYMoapdl;
  tQ7X4hDrzAhg: _1gMaKvaA7BjO;
  tbDCrMUdijJB: _1gMaKvaA7BjO;
  tuH8pU: _0d68qb;
  uyXkaF: _1gMaKvaA7BjO;
  wDj8HE7Sj5IU: _1gMaKvaA7BjO;
  wFTF2x: _1gMaKvaA7BjO;
  wnnLQX: _1gMaKvaA7BjO;
  x3WOKnZ07fEt: _1gMaKvaA7BjO;
  xCSzXZD18xsh: _1gMaKvaA7BjO;
  xKfCeeJnk96t: _1gMaKvaA7BjO;
  xQkKApqjZV0E: _1gMaKvaA7BjO;
  xyBjwj: _5VjsaYMoapdl;
  y2rmuM: _1gMaKvaA7BjO;
  y5BO7Q31v7FE: _1gMaKvaA7BjO;
  yRmaUCVdRBga: _1gMaKvaA7BjO;
  zc3rJycp: _5uvau9Bh;
}

interface _8KcW4T {
  id: string;
  parentId: string;
  kind: string;
  table: Table2;
}

interface Table2 {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap2;
  columnMap: ColumnMap2;
  cellMap: CellMap2;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap2 {
  JjM6mW_2IOq0I: Mf8TGC05oPm2;
  JjM6mW_2jUZ7e: Mf8TGC05oPm2;
  JjM6mW_3AYafb: Mf8TGC05oPm2;
  JjM6mW_IMGXp4: Mf8TGC05oPm2;
  JjM6mW_QIBedk: Mf8TGC05oPm2;
  JjM6mW_VDAP0R: Mf8TGC05oPm2;
  JjM6mW_WNyMdJ: Mf8TGC05oPm2;
  JjM6mW_fgM7IJ: Mf8TGC05oPm2;
  JjM6mW_jfz8ww: Mf8TGC05oPm2;
  JjM6mW_s63S7b: Mf8TGC05oPm2;
  JjM6mW_uikp04: Mf8TGC05oPm2;
  JjM6mW_y7Cd45: Mf8TGC05oPm2;
  JjM6mW_z0BjiP: Mf8TGC05oPm2;
  MfCMKP_2IOq0I: Mf8TGC05oPm2;
  MfCMKP_2jUZ7e: Mf8TGC05oPm2;
  MfCMKP_3AYafb: Mf8TGC05oPm2;
  MfCMKP_IMGXp4: Mf8TGC05oPm2;
  MfCMKP_QIBedk: Mf8TGC05oPm2;
  MfCMKP_VDAP0R: Mf8TGC05oPm2;
  MfCMKP_WNyMdJ: Mf8TGC05oPm2;
  MfCMKP_fgM7IJ: Mf8TGC05oPm2;
  MfCMKP_jfz8ww: Mf8TGC05oPm2;
  MfCMKP_s63S7b: Mf8TGC05oPm2;
  MfCMKP_uikp04: Mf8TGC05oPm2;
  MfCMKP_y7Cd45: Mf8TGC05oPm2;
  MfCMKP_z0BjiP: Mf8TGC05oPm2;
  PWdZmh_2IOq0I: Mf8TGC05oPm2;
  PWdZmh_2jUZ7e: Mf8TGC05oPm2;
  PWdZmh_3AYafb: Mf8TGC05oPm2;
  PWdZmh_IMGXp4: Mf8TGC05oPm2;
  PWdZmh_QIBedk: Mf8TGC05oPm2;
  PWdZmh_VDAP0R: Mf8TGC05oPm2;
  PWdZmh_WNyMdJ: Mf8TGC05oPm2;
  PWdZmh_fgM7IJ: Mf8TGC05oPm2;
  PWdZmh_jfz8ww: Mf8TGC05oPm2;
  PWdZmh_s63S7b: Mf8TGC05oPm2;
  PWdZmh_uikp04: Mf8TGC05oPm2;
  PWdZmh_y7Cd45: Mf8TGC05oPm2;
  PWdZmh_z0BjiP: Mf8TGC05oPm2;
  ZqBAeH_2IOq0I: Mf8TGC05oPm2;
  ZqBAeH_2jUZ7e: Mf8TGC05oPm2;
  ZqBAeH_3AYafb: Mf8TGC05oPm2;
  ZqBAeH_IMGXp4: Mf8TGC05oPm2;
  ZqBAeH_QIBedk: Mf8TGC05oPm2;
  ZqBAeH_VDAP0R: Mf8TGC05oPm2;
  ZqBAeH_WNyMdJ: Mf8TGC05oPm2;
  ZqBAeH_fgM7IJ: Mf8TGC05oPm2;
  ZqBAeH_jfz8ww: Mf8TGC05oPm2;
  ZqBAeH_s63S7b: Mf8TGC05oPm2;
  ZqBAeH_uikp04: Mf8TGC05oPm2;
  ZqBAeH_y7Cd45: Mf8TGC05oPm2;
  ZqBAeH_z0BjiP: Mf8TGC05oPm2;
  bUOCDJ_2IOq0I: Mf8TGC05oPm2;
  bUOCDJ_2jUZ7e: Mf8TGC05oPm2;
  bUOCDJ_3AYafb: Mf8TGC05oPm2;
  bUOCDJ_IMGXp4: Mf8TGC05oPm2;
  bUOCDJ_QIBedk: Mf8TGC05oPm2;
  bUOCDJ_VDAP0R: Mf8TGC05oPm2;
  bUOCDJ_WNyMdJ: Mf8TGC05oPm2;
  bUOCDJ_fgM7IJ: Mf8TGC05oPm2;
  bUOCDJ_jfz8ww: Mf8TGC05oPm2;
  bUOCDJ_s63S7b: Mf8TGC05oPm2;
  bUOCDJ_uikp04: Mf8TGC05oPm2;
  bUOCDJ_y7Cd45: Mf8TGC05oPm2;
  bUOCDJ_z0BjiP: Mf8TGC05oPm2;
  bpsZKE_2IOq0I: Mf8TGC05oPm2;
  bpsZKE_2jUZ7e: Mf8TGC05oPm2;
  bpsZKE_3AYafb: Mf8TGC05oPm2;
  bpsZKE_IMGXp4: Mf8TGC05oPm2;
  bpsZKE_QIBedk: Mf8TGC05oPm2;
  bpsZKE_VDAP0R: Mf8TGC05oPm2;
  bpsZKE_WNyMdJ: Mf8TGC05oPm2;
  bpsZKE_fgM7IJ: Mf8TGC05oPm2;
  bpsZKE_jfz8ww: Mf8TGC05oPm2;
  bpsZKE_s63S7b: Mf8TGC05oPm2;
  bpsZKE_uikp04: Mf8TGC05oPm2;
  bpsZKE_y7Cd45: Mf8TGC05oPm2;
  bpsZKE_z0BjiP: Mf8TGC05oPm2;
  c6RCGv_2IOq0I: Mf8TGC05oPm2;
  c6RCGv_2jUZ7e: Mf8TGC05oPm2;
  c6RCGv_3AYafb: Mf8TGC05oPm2;
  c6RCGv_IMGXp4: Mf8TGC05oPm2;
  c6RCGv_QIBedk: Mf8TGC05oPm2;
  c6RCGv_VDAP0R: Mf8TGC05oPm2;
  c6RCGv_WNyMdJ: Mf8TGC05oPm2;
  c6RCGv_fgM7IJ: Mf8TGC05oPm2;
  c6RCGv_jfz8ww: Mf8TGC05oPm2;
  c6RCGv_s63S7b: Mf8TGC05oPm2;
  c6RCGv_uikp04: Mf8TGC05oPm2;
  c6RCGv_y7Cd45: Mf8TGC05oPm2;
  c6RCGv_z0BjiP: Mf8TGC05oPm2;
  mQhxCz_2IOq0I: Mf8TGC05oPm2;
  mQhxCz_2jUZ7e: Mf8TGC05oPm2;
  mQhxCz_3AYafb: Mf8TGC05oPm2;
  mQhxCz_IMGXp4: Mf8TGC05oPm2;
  mQhxCz_QIBedk: Mf8TGC05oPm2;
  mQhxCz_VDAP0R: Mf8TGC05oPm2;
  mQhxCz_WNyMdJ: Mf8TGC05oPm2;
  mQhxCz_fgM7IJ: Mf8TGC05oPm2;
  mQhxCz_jfz8ww: Mf8TGC05oPm2;
  mQhxCz_s63S7b: Mf8TGC05oPm2;
  mQhxCz_uikp04: Mf8TGC05oPm2;
  mQhxCz_y7Cd45: Mf8TGC05oPm2;
  mQhxCz_z0BjiP: Mf8TGC05oPm2;
  nmtLmM_2IOq0I: Mf8TGC05oPm2;
  nmtLmM_2jUZ7e: Mf8TGC05oPm2;
  nmtLmM_3AYafb: Mf8TGC05oPm2;
  nmtLmM_IMGXp4: Mf8TGC05oPm2;
  nmtLmM_QIBedk: Mf8TGC05oPm2;
  nmtLmM_VDAP0R: Mf8TGC05oPm2;
  nmtLmM_WNyMdJ: Mf8TGC05oPm2;
  nmtLmM_fgM7IJ: Mf8TGC05oPm2;
  nmtLmM_jfz8ww: Mf8TGC05oPm2;
  nmtLmM_s63S7b: Mf8TGC05oPm2;
  nmtLmM_uikp04: Mf8TGC05oPm2;
  nmtLmM_y7Cd45: Mf8TGC05oPm2;
  nmtLmM_z0BjiP: Mf8TGC05oPm2;
  vITOqN_2IOq0I: Mf8TGC05oPm2;
  vITOqN_2jUZ7e: Mf8TGC05oPm2;
  vITOqN_3AYafb: Mf8TGC05oPm2;
  vITOqN_IMGXp4: Mf8TGC05oPm2;
  vITOqN_QIBedk: Mf8TGC05oPm2;
  vITOqN_VDAP0R: Mf8TGC05oPm2;
  vITOqN_WNyMdJ: Mf8TGC05oPm2;
  vITOqN_fgM7IJ: Mf8TGC05oPm2;
  vITOqN_jfz8ww: Mf8TGC05oPm2;
  vITOqN_s63S7b: Mf8TGC05oPm2;
  vITOqN_uikp04: Mf8TGC05oPm2;
  vITOqN_y7Cd45: Mf8TGC05oPm2;
  vITOqN_z0BjiP: Mf8TGC05oPm2;
}

interface ColumnMap2 {
  "2IOq0I": _05oPm2;
  "2jUZ7e": _05oPm2;
  "3AYafb": _05oPm2;
  IMGXp4: _05oPm2;
  QIBedk: _05oPm2;
  VDAP0R: _05oPm2;
  WNyMdJ: _05oPm2;
  fgM7IJ: _05oPm2;
  jfz8ww: _05oPm2;
  s63S7b: _05oPm2;
  uikp04: _05oPm2;
  y7Cd45: _05oPm2;
  z0BjiP: _05oPm2;
}

interface RowMap2 {
  JjM6mW: Mf8TGC;
  MfCMKP: Mf8TGC;
  PWdZmh: Mf8TGC;
  ZqBAeH: Mf8TGC;
  bUOCDJ: Mf8TGC;
  bpsZKE: Mf8TGC;
  c6RCGv: Mf8TGC;
  mQhxCz: Mf8TGC;
  nmtLmM: Mf8TGC;
  vITOqN: Mf8TGC;
}

interface _8IL8WAy9 {
  id: string;
  blockIds: string[];
  blockMap: BlockMap6;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap6 {
  EULiOtXT602Q: _1gMaKvaA7BjO;
  F9UEksoOVN5V: _5VjsaYMoapdl;
  GpoQWbYrs6aO: _1gMaKvaA7BjO;
  LiTUVPmRukIk: _5VjsaYMoapdl;
  QUF8sQxuvzAC: _5VjsaYMoapdl;
  VYIIvMFqpbl1: _1gMaKvaA7BjO;
  Z4tK7MQc3ART: _1gMaKvaA7BjO;
  c8d88WvqBiiK: _1gMaKvaA7BjO;
  deAms9: AXkkW5;
  fKxjU7: _1gMaKvaA7BjO;
  jDTlPD5G7hrU: _1gMaKvaA7BjO;
  oHF89i: _5VjsaYMoapdl;
  vY3EtQ: AXkkW5;
  vh3DYCOme9JR: _1gMaKvaA7BjO;
  wosmj7LJPgMx: _1gMaKvaA7BjO;
  xq2fAKh7j9S6: _5VjsaYMoapdl;
}

interface _6igUsu2I {
  id: string;
  blockIds: string[];
  blockMap: BlockMap5;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap5 {
  HJ2XbfzOICOX: HJ2XbfzOICOX;
  QgWFVK2Y84vu: QgWFVK2Y84vu;
}

interface QgWFVK2Y84vu {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text8;
}

interface Text8 {
  inlineElements: InlineElement6[];
  kind: string;
}

interface InlineElement6 {
  color: string;
  kind: string;
  text: Text2;
}

interface HJ2XbfzOICOX {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text7;
}

interface Text7 {
  inlineElements: InlineElement5[];
  kind: string;
}

interface InlineElement5 {
  kind: string;
  text: Text2;
  color?: string;
  underline?: boolean;
}

interface _6elRB4qv {
  id: string;
  blockIds: string[];
  blockMap: BlockMap4;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap4 {
  "1oifQjKApdMk": AXkkW5;
  "9zNsKH3jCHmc": _1gMaKvaA7BjO;
  wqhpQWe71Ald: DxVpgqnZeTZ9;
}

interface _61Z4PcdF {
  id: string;
  blockIds: string[];
  blockMap: BlockMap3;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap3 {
  "4G9wfv": _1gMaKvaA7BjO;
  "5eYOBA": _5VjsaYMoapdl;
  HhM4xYtta8hz: _1gMaKvaA7BjO;
  KyVMo8: KyVMo8;
  Lb8ybd4FT6Jg: _1gMaKvaA7BjO;
  MSM7bD: KyVMo8;
  N6KPid: KyVMo8;
  Ncnwnj: _1gMaKvaA7BjO;
  RagyUP: AXkkW5;
  RxoF4Uap07Jx: _1gMaKvaA7BjO;
  TXcXdJ: KyVMo8;
  UwanF4: KyVMo8;
  XcbwqwebE7pE: _1gMaKvaA7BjO;
  aZHlxB: AXkkW5;
  ay0b4U: KyVMo8;
  deAms9: AXkkW5;
  f9n7f6: KyVMo8;
  fKxjU7: _1gMaKvaA7BjO;
  fR9pt4: _1gMaKvaA7BjO;
  h9Ao1R: KyVMo8;
  ojpPBa: _5VjsaYMoapdl;
  oyTvcsN61odD: _0d68qb;
  uViqIt: _1gMaKvaA7BjO;
  udT2Jk: KyVMo8;
  vdlTIynMdfwN: _1gMaKvaA7BjO;
}

interface KyVMo8 {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text6;
}

interface Text6 {
  inlineElements: InlineElement4[];
  kind: string;
}

interface InlineElement4 {
  bold?: boolean;
  kind: string;
  text: Text2;
}

interface _4i6aNhMa {
  id: string;
  blockIds: string[];
  blockMap: BlockMap2;
  authorMap: AuthorMap;
  version: string;
}

interface BlockMap2 {
  "0d68qb": _0d68qb;
  "1gMaKvaA7BjO": _1gMaKvaA7BjO;
  "2ffC0T": _1gMaKvaA7BjO;
  "39pKgZJfk2wy": _1gMaKvaA7BjO;
  "4c7Wh84LJf51": _1gMaKvaA7BjO;
  "53huu7QL8bPC": _1gMaKvaA7BjO;
  "5VjsaYMoapdl": _5VjsaYMoapdl;
  "5uvau9Bh": _5uvau9Bh;
  "61O9D9": _1gMaKvaA7BjO;
  "6436slIyCKKS": _5VjsaYMoapdl;
  "6P8p2vkO7WQO": _1gMaKvaA7BjO;
  "758gCUn5": _5uvau9Bh;
  "8GlDTA63M3Jk": _1gMaKvaA7BjO;
  "8Wt8WdBTqXIR": _1gMaKvaA7BjO;
  "8rnULe": _1gMaKvaA7BjO;
  "9AeG8bqNL3IV": _1gMaKvaA7BjO;
  "9j4hDPE9UZpR": _1gMaKvaA7BjO;
  AztAmyAhmPhV: _1gMaKvaA7BjO;
  BI5nwK7z: _5uvau9Bh;
  BOJ2ZB4kPWGl: _1gMaKvaA7BjO;
  By1jAhIrMszk: _1gMaKvaA7BjO;
  CMSThoSMPqEO: _1gMaKvaA7BjO;
  CO0D9Z: _1gMaKvaA7BjO;
  CfjzW5JnzPTZ: _1gMaKvaA7BjO;
  CnM726WoIiVF: _1gMaKvaA7BjO;
  CuxwAl: _5VjsaYMoapdl;
  EqHe9q: _1gMaKvaA7BjO;
  Fqb6iJfDxeT8: _1gMaKvaA7BjO;
  GBDAtd: GBDAtd;
  GvHG2l: _1gMaKvaA7BjO;
  HAyHhn: _5VjsaYMoapdl;
  Hc95woodlTdX: _5VjsaYMoapdl;
  Hclwn9X4: _5uvau9Bh;
  Hg2nE5: _1gMaKvaA7BjO;
  ISMPyEIXBzOa: _1gMaKvaA7BjO;
  IjmCmR: _5VjsaYMoapdl;
  J2DDRwlscese: _1gMaKvaA7BjO;
  J68Xe2UKrfn0: _1gMaKvaA7BjO;
  JIlIg6: _5VjsaYMoapdl;
  KJp9bC: _1gMaKvaA7BjO;
  LOAZk5Bc: _5uvau9Bh;
  Lq4Hah9ZsVot: _1gMaKvaA7BjO;
  LzimJm: _1gMaKvaA7BjO;
  NYvJbjjy: _5uvau9Bh;
  NdNAdZ: _5VjsaYMoapdl;
  OyIgBa: AXkkW5;
  P12NTkuZJteM: _5VjsaYMoapdl;
  PmJK4a: _1gMaKvaA7BjO;
  PxWlR8SW: _5uvau9Bh;
  QQ0VK0: _1gMaKvaA7BjO;
  QdsJCXcMsY4l: _1gMaKvaA7BjO;
  R0vQv8y7dH2X: _1gMaKvaA7BjO;
  S3w2ww: _1gMaKvaA7BjO;
  SzOxeVfIqiTv: _1gMaKvaA7BjO;
  TVFbaq0nlYMx: _1gMaKvaA7BjO;
  Ttg9o5: _1gMaKvaA7BjO;
  Tx0rDybID6cG: _1gMaKvaA7BjO;
  U5AGswOdHti1: _1gMaKvaA7BjO;
  VCaABzk89uHB: _1gMaKvaA7BjO;
  VQyJJ0: _1gMaKvaA7BjO;
  WHH49s: _5VjsaYMoapdl;
  X5FlQf: _1gMaKvaA7BjO;
  Xas5DQIQphNa: _1gMaKvaA7BjO;
  Y8UGXMjC: _5uvau9Bh;
  ZpxMShSIyPYL: _1gMaKvaA7BjO;
  bQ9jAprTSdbF: _1gMaKvaA7BjO;
  dJlcih: _1gMaKvaA7BjO;
  dmypku: _1gMaKvaA7BjO;
  dtY1zkA0: _5uvau9Bh;
  dtfMlU: _1gMaKvaA7BjO;
  dwsq67Cf: _5uvau9Bh;
  fPhn8o: _1gMaKvaA7BjO;
  fj00Jv: _1gMaKvaA7BjO;
  g6CFGABjd0vn: _1gMaKvaA7BjO;
  g6dgo6: _5VjsaYMoapdl;
  h1vyeWfz0kEG: _1gMaKvaA7BjO;
  havdbw0rmLjt: _1gMaKvaA7BjO;
  iIcINry5KBxJ: _1gMaKvaA7BjO;
  iWlH2R: _1gMaKvaA7BjO;
  iniW5p10x40c: _1gMaKvaA7BjO;
  kCuLku: _1gMaKvaA7BjO;
  kcWMa8: _1gMaKvaA7BjO;
  lp5e6GpvrYBZ: _1gMaKvaA7BjO;
  lw1Jkv: _5VjsaYMoapdl;
  mj9dwazDpeml: _1gMaKvaA7BjO;
  nNczc8: _5VjsaYMoapdl;
  pG9l8PlHsDEB: _5VjsaYMoapdl;
  qF1emzOYYgHD: _1gMaKvaA7BjO;
  r71oT4: _5VjsaYMoapdl;
  rXVRCfFCPcIm: _1gMaKvaA7BjO;
  rcFwYS: _5VjsaYMoapdl;
  s3cDs4dFrPsL: _1gMaKvaA7BjO;
  sZE7x4: _5VjsaYMoapdl;
  skXaIJ: _1gMaKvaA7BjO;
  tGSr3KU9YAHU: _1gMaKvaA7BjO;
  tjofzL: _5VjsaYMoapdl;
  tvWMSCkZ: _5uvau9Bh;
  uElWUyyYsZs5: _1gMaKvaA7BjO;
  uYR7TuYrKM5J: _1gMaKvaA7BjO;
  ucIRl3: _5VjsaYMoapdl;
  wyXCwKgy1F8K: _1gMaKvaA7BjO;
  xDsZMpMx7L6k: _1gMaKvaA7BjO;
  xMTFKJ32rEqu: _1gMaKvaA7BjO;
  yesPSHjnSSSY: _1gMaKvaA7BjO;
  yvJ5UKR1sNtX: _1gMaKvaA7BjO;
  z4XQMT: _1gMaKvaA7BjO;
}

interface GBDAtd {
  id: string;
  parentId: string;
  kind: string;
  table: Table;
}

interface Table {
  id: string;
  rowIds: string[];
  columnIds: string[];
  rowMap: RowMap;
  columnMap: ColumnMap;
  cellMap: CellMap;
  description: string;
  rowHeader: boolean;
  colHeader: boolean;
}

interface CellMap {
  Mf8TGC_05oPm2: Mf8TGC05oPm2;
  Mf8TGC_58UKvZ: Mf8TGC05oPm2;
  Mf8TGC_5qjgkA: Mf8TGC05oPm2;
  Mf8TGC_6Jng33: Mf8TGC05oPm2;
  Mf8TGC_IbuZ9w: Mf8TGC05oPm2;
  Mf8TGC_IcKYNw: Mf8TGC05oPm2;
  Mf8TGC_KgcZgh: Mf8TGC05oPm2;
  Mf8TGC_MF2IMd: Mf8TGC05oPm2;
  Mf8TGC_Udpe5r: Mf8TGC05oPm2;
  Mf8TGC_VRSooB: Mf8TGC05oPm2;
  Mf8TGC_rfMduk: Mf8TGC05oPm2;
  Mf8TGC_x3Otwd: Mf8TGC05oPm2;
  Mf8TGC_xKnpMY: Mf8TGC05oPm2;
  TYedep_05oPm2: Mf8TGC05oPm2;
  TYedep_58UKvZ: Mf8TGC05oPm2;
  TYedep_5qjgkA: Mf8TGC05oPm2;
  TYedep_6Jng33: Mf8TGC05oPm2;
  TYedep_IbuZ9w: Mf8TGC05oPm2;
  TYedep_IcKYNw: Mf8TGC05oPm2;
  TYedep_KgcZgh: Mf8TGC05oPm2;
  TYedep_MF2IMd: Mf8TGC05oPm2;
  TYedep_Udpe5r: Mf8TGC05oPm2;
  TYedep_VRSooB: Mf8TGC05oPm2;
  TYedep_rfMduk: Mf8TGC05oPm2;
  TYedep_x3Otwd: Mf8TGC05oPm2;
  TYedep_xKnpMY: Mf8TGC05oPm2;
  TpIl5F_05oPm2: Mf8TGC05oPm2;
  TpIl5F_58UKvZ: Mf8TGC05oPm2;
  TpIl5F_5qjgkA: Mf8TGC05oPm2;
  TpIl5F_6Jng33: Mf8TGC05oPm2;
  TpIl5F_IbuZ9w: Mf8TGC05oPm2;
  TpIl5F_IcKYNw: Mf8TGC05oPm2;
  TpIl5F_KgcZgh: Mf8TGC05oPm2;
  TpIl5F_MF2IMd: Mf8TGC05oPm2;
  TpIl5F_Udpe5r: Mf8TGC05oPm2;
  TpIl5F_VRSooB: Mf8TGC05oPm2;
  TpIl5F_rfMduk: Mf8TGC05oPm2;
  TpIl5F_x3Otwd: Mf8TGC05oPm2;
  TpIl5F_xKnpMY: Mf8TGC05oPm2;
  Yhzvn9_05oPm2: Mf8TGC05oPm2;
  Yhzvn9_58UKvZ: Mf8TGC05oPm2;
  Yhzvn9_5qjgkA: Mf8TGC05oPm2;
  Yhzvn9_6Jng33: Mf8TGC05oPm2;
  Yhzvn9_IbuZ9w: Mf8TGC05oPm2;
  Yhzvn9_IcKYNw: Mf8TGC05oPm2;
  Yhzvn9_KgcZgh: Mf8TGC05oPm2;
  Yhzvn9_MF2IMd: Mf8TGC05oPm2;
  Yhzvn9_Udpe5r: Mf8TGC05oPm2;
  Yhzvn9_VRSooB: Mf8TGC05oPm2;
  Yhzvn9_rfMduk: Mf8TGC05oPm2;
  Yhzvn9_x3Otwd: Mf8TGC05oPm2;
  Yhzvn9_xKnpMY: Mf8TGC05oPm2;
  q6tobU_05oPm2: Mf8TGC05oPm2;
  q6tobU_58UKvZ: Mf8TGC05oPm2;
  q6tobU_5qjgkA: Mf8TGC05oPm2;
  q6tobU_6Jng33: Mf8TGC05oPm2;
  q6tobU_IbuZ9w: Mf8TGC05oPm2;
  q6tobU_IcKYNw: Mf8TGC05oPm2;
  q6tobU_KgcZgh: Mf8TGC05oPm2;
  q6tobU_MF2IMd: Mf8TGC05oPm2;
  q6tobU_Udpe5r: Mf8TGC05oPm2;
  q6tobU_VRSooB: Mf8TGC05oPm2;
  q6tobU_rfMduk: Mf8TGC05oPm2;
  q6tobU_x3Otwd: Mf8TGC05oPm2;
  q6tobU_xKnpMY: Mf8TGC05oPm2;
  qlCTY2_05oPm2: Mf8TGC05oPm2;
  qlCTY2_58UKvZ: Mf8TGC05oPm2;
  qlCTY2_5qjgkA: Mf8TGC05oPm2;
  qlCTY2_6Jng33: Mf8TGC05oPm2;
  qlCTY2_IbuZ9w: Mf8TGC05oPm2;
  qlCTY2_IcKYNw: Mf8TGC05oPm2;
  qlCTY2_KgcZgh: Mf8TGC05oPm2;
  qlCTY2_MF2IMd: Mf8TGC05oPm2;
  qlCTY2_Udpe5r: Mf8TGC05oPm2;
  qlCTY2_VRSooB: Mf8TGC05oPm2;
  qlCTY2_rfMduk: Mf8TGC05oPm2;
  qlCTY2_x3Otwd: Mf8TGC05oPm2;
  qlCTY2_xKnpMY: Mf8TGC05oPm2;
  sKqgMD_05oPm2: Mf8TGC05oPm2;
  sKqgMD_58UKvZ: Mf8TGC05oPm2;
  sKqgMD_5qjgkA: Mf8TGC05oPm2;
  sKqgMD_6Jng33: Mf8TGC05oPm2;
  sKqgMD_IbuZ9w: Mf8TGC05oPm2;
  sKqgMD_IcKYNw: Mf8TGC05oPm2;
  sKqgMD_KgcZgh: Mf8TGC05oPm2;
  sKqgMD_MF2IMd: Mf8TGC05oPm2;
  sKqgMD_Udpe5r: Mf8TGC05oPm2;
  sKqgMD_VRSooB: Mf8TGC05oPm2;
  sKqgMD_rfMduk: Mf8TGC05oPm2;
  sKqgMD_x3Otwd: Mf8TGC05oPm2;
  sKqgMD_xKnpMY: Mf8TGC05oPm2;
  tsb13r_05oPm2: Mf8TGC05oPm2;
  tsb13r_58UKvZ: Mf8TGC05oPm2;
  tsb13r_5qjgkA: Mf8TGC05oPm2;
  tsb13r_6Jng33: Mf8TGC05oPm2;
  tsb13r_IbuZ9w: Mf8TGC05oPm2;
  tsb13r_IcKYNw: Mf8TGC05oPm2;
  tsb13r_KgcZgh: Mf8TGC05oPm2;
  tsb13r_MF2IMd: Mf8TGC05oPm2;
  tsb13r_Udpe5r: Mf8TGC05oPm2;
  tsb13r_VRSooB: Mf8TGC05oPm2;
  tsb13r_rfMduk: Mf8TGC05oPm2;
  tsb13r_x3Otwd: Mf8TGC05oPm2;
  tsb13r_xKnpMY: Mf8TGC05oPm2;
}

interface Mf8TGC05oPm2 {
  id: string;
  childIds: string[];
  rowSpan: string;
  colSpan: string;
  borderKind: string;
  borderColor: string;
  backgroundColor: string;
  verticalAlign: string;
}

interface ColumnMap {
  "05oPm2": _05oPm2;
  "58UKvZ": _05oPm2;
  "5qjgkA": _05oPm2;
  "6Jng33": _05oPm2;
  IbuZ9w: _05oPm2;
  IcKYNw: _05oPm2;
  KgcZgh: _05oPm2;
  MF2IMd: _05oPm2;
  Udpe5r: _05oPm2;
  VRSooB: _05oPm2;
  rfMduk: _05oPm2;
  x3Otwd: _05oPm2;
  xKnpMY: _05oPm2;
}

interface _05oPm2 {
  id: string;
  width: number;
}

interface RowMap {
  Mf8TGC: Mf8TGC;
  TYedep: Mf8TGC;
  TpIl5F: Mf8TGC;
  Yhzvn9: Mf8TGC;
  q6tobU: Mf8TGC;
  qlCTY2: Mf8TGC;
  sKqgMD: Mf8TGC;
  tsb13r: Mf8TGC;
}

interface Mf8TGC {
  id: string;
}

interface _5uvau9Bh {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text5;
}

interface Text5 {
  inlineElements: InlineElement3[];
  kind: string;
}

interface InlineElement3 {
  kind: string;
  entry: Entry;
}

interface Entry {
  id: string;
  showType: string;
  count: string;
}

interface _5VjsaYMoapdl {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text4;
}

interface Text4 {
  inlineElements: InlineElement2[];
  kind: string;
}

interface InlineElement2 {
  bold: boolean;
  kind: string;
  text: Text2;
}

interface _1gMaKvaA7BjO {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text3;
}

interface Text3 {
  inlineElements: InlineElement[];
  kind: string;
}

interface InlineElement {
  kind: string;
  text: Text2;
}

interface Text2 {
  text: string;
}

interface _0d68qb {
  id: string;
  parentId: string;
  align: string;
  kind: string;
  text: Text;
}

interface Text {
  inlineElements: unknown[];
  kind: string;
}

interface _0WD9p66F {
  id: string;
  blockIds: string[];
  blockMap: BlockMap;
  authorMap: AuthorMap;
  version: string;
}

type AuthorMap = object;

interface BlockMap {
  AXkkW5: AXkkW5;
  DxVpgqnZeTZ9: DxVpgqnZeTZ9;
}

interface DxVpgqnZeTZ9 {
  id: string;
  parentId: string;
  kind: string;
  image: Image;
}

interface Image {
  id: string;
  url: string;
  width: string;
  height: string;
  size: string;
  format: string;
  kind: string;
  description: string;
  status: string;
  infos: unknown[];
}

interface AXkkW5 {
  id: string;
  parentId: string;
  kind: string;
  horizontalLine: HorizontalLine;
}

interface HorizontalLine {
  kind: string;
}
