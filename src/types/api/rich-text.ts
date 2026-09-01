export type InlineElement = {
  kind: string;
  text: {
    text: string;
  };
  bold?: boolean;
  underline?: boolean;
  color?: string;
  entry?: {
    id: string;
    showType: string;
    count: string;
  };
};
