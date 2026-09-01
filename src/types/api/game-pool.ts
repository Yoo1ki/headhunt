type PoolItem = {
  id: string;
  name: string;
  rarity: number;
};

type OperatorPool = {
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
  all: PoolItem[];
  rotate_list: {
    name: string;
    times: number;
    image: string;
  }[];
};

type WeaponPool = {
  pool_gacha_type: string;
  pool_name: string;
  link_char_pool_name: string;
  up6_name: string;
  up6_image: string;
  gift_weapon_name: string;
  gift_weapon_box_name: string;
  gift_weapon_reward_name: string;
  gift_content: {
    type: number;
    name: string;
  }[];
  all: (PoolItem & { type: number })[];
};

type GamePoolResponse<TPool> = {
  code: number;
  data: {
    pool: TPool;
    timezone: number;
  };
  msg: string;
};

export type GamePoolOperator = GamePoolResponse<OperatorPool>;
export type GamePoolWeapon = GamePoolResponse<WeaponPool>;
export type GamePool = GamePoolOperator | GamePoolWeapon;
