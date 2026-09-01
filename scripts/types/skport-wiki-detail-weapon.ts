export interface SKPortWikiDetailWeapon {
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
  blockMap: BlockMap;
  authorMap: object;
  version: string;
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

export interface Document {
  documentMap: DocumentMap;
  chapterGroup: ChapterGroup[];
  extraInfo: ExtraInfo;
  widgetCommonMap: WidgetCommonMap;
}

interface WidgetCommonMap {
  [key: string]: WidgetCommonItem;
}

interface WidgetCommonItem {
  type: string;
  tableList: unknown[];
  tabList: TabList[];
  tabDataMap: TabDataMap;
}

export interface TabDataMap {
  [key: string]: Default;
  default: Default;
}

interface Default {
  intro?: Intro;
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
  [key: string]: Description;
}

interface Entry {
  id: string;
  showType: string;
  count: string;
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

export interface BlockMap {
  [key: string]: BlockMapItem;
}

interface BlockMapItem {
  id: string;
  parentId: string;
  align?: string;
  kind: string;
  text?: Text;
  image?: Image;
  list?: List;
  horizontalLine?: HorizontalLine;
  table?: Table;
}

interface Text {
  inlineElements: InlineElement[];
  kind: string;
}

export interface InlineElement {
  kind: string;
  text: TextAja;
  bold?: boolean;
  underline?: boolean;
  color?: string;
  entry?: Entry;
}

interface TextAja {
  text: string;
}

interface List {
  id: string;
  itemIds: string[];
  itemMap: ItemMap;
  kind: string;
}

interface ItemMap {
  [key: string]: ItemMapItem;
}

interface ItemMapItem {
  id: string;
  childIds: string[];
}

interface HorizontalLine {
  kind: string;
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
  [key: string]: CellMapItem | undefined;
}

interface CellMapItem {
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
  [key: string]: ColumnMapItem;
}

interface ColumnMapItem {
  id: string;
  width: number;
}

interface RowMap {
  [key: string]: RowMapItem;
}

interface RowMapItem {
  id: string;
}
