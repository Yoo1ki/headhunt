export interface GamePoolWeapon {
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
  link_char_pool_name: string;
  up6_name: string;
  up6_image: string;
  gift_weapon_name: string;
  gift_weapon_box_name: string;
  gift_weapon_reward_name: string;
  gift_content: Giftcontent[];
  all: All[];
}

interface All {
  id: string;
  name: string;
  rarity: number;
  type: number;
}

interface Giftcontent {
  type: number;
  name: string;
}
