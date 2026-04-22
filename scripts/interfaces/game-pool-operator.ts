export interface GamePoolOperator {
  code: number;
  data: Data;
  msg: string;
}

interface Data {
  pool: Pool;
  timezone: number;
}

interface Pool {
  pool_gacha_type: string;
  pool_name: string;
  pool_type: string;
  up6_name: string;
  up6_image: string;
  up5_name: string;
  up5_image: string;
  up6_item_name: string;
  rotate_image: string;
  ticket_name: string;
  ticket_ten_name: string;
  all: All[];
  rotate_list: Rotatelist[];
}

interface Rotatelist {
  name: string;
  times: number;
  image: string;
}

interface All {
  id: string;
  name: string;
  rarity: number;
}
