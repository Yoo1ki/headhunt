export interface SKPortWikiCatalog {
  code: number;
  message: string;
  timestamp: string;
  data: Data;
}

interface Data {
  catalog: Catalog[];
}

interface Catalog {
  id: string;
  name: string;
  status: number;
  position: number;
  typeSub: TypeSub[];
}

interface TypeSub {
  id: string;
  name: string;
  fatherHeadhuntTypeId: string;
  style: number;
  status: number;
  position: number;
  icon: string;
  items: (Item | Items2 | Items3 | Items4 | Items5)[];
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

interface Items5 {
  itemId: string;
  name: string;
  lang: string;
  brief: Brief2;
  status: number;
  tagIds: string[];
  publishedAtTs: string;
  caption: (Caption3 | Caption2 | Caption32 | Caption4 | Caption5 | Caption6)[];
}

interface Caption6 {
  color: string;
  kind: string;
  text: Text;
}

interface Caption5 {
  bold?: boolean;
  kind: string;
  text: Text;
  italic?: boolean;
  color?: string;
}

interface Caption4 {
  bold?: boolean;
  kind: string;
  text: Text;
  underline?: boolean;
  color?: string;
}

interface Caption32 {
  bold?: boolean;
  kind: string;
  text: Text;
}

interface Caption3 {
  bold?: boolean;
  color: string;
  kind: string;
  text: Text;
}

interface Items4 {
  itemId: string;
  name: string;
  lang: string;
  brief: Brief4;
  status: number;
  tagIds: string[];
  publishedAtTs: string;
  caption: Caption2[];
}

interface Brief4 {
  cover: string;
  name: string;
  description: null;
  associate: null;
  subTypeList: SubTypeList[];
  composite: null;
}

interface Items3 {
  itemId: string;
  name: string;
  lang: string;
  brief: Brief3;
  status: number;
  tagIds: unknown[];
  publishedAtTs: string;
  caption: unknown[];
}

interface Brief3 {
  cover: string;
  name: string;
  description: null;
  associate: null;
  subTypeList: unknown[];
  composite: null;
}

interface Items2 {
  itemId: string;
  name: string;
  lang: string;
  brief: Brief2;
  status: number;
  tagIds: string[];
  publishedAtTs: string;
  caption: Caption2[];
}

interface Caption2 {
  bold?: boolean;
  kind: string;
  text: Text;
  color?: string;
}

interface Brief2 {
  cover: string;
  name: string;
  description: null;
  associate: null;
  subTypeList: SubTypeList[];
  composite: null;
}

interface Item {
  itemId: string;
  name: string;
  lang: string;
  brief: Brief;
  status: number;
  tagIds: string[];
  publishedAtTs: string;
  caption: Caption[];
}

interface Caption {
  kind: string;
  text: Text;
  color?: string;
}

interface Text {
  text: string;
}

interface Brief {
  cover: string;
  name: string;
  description: null;
  associate: Associate | null;
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
