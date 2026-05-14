export type HeadhuntTypeId =
  | "special"
  | "weponbox"
  | "joint"
  | "standard"
  | "beginner";

export type HeadhuntType = {
  id: HeadhuntTypeId;
  endpoint: string;
  poolType?: string;
  icon: string;
  guaranteeAt?: number;
  r6PityLimit: number;
  r5PityLimit: number;
};

export const headhuntTypes: HeadhuntType[] = [
  {
    id: "special",
    endpoint: "/api/record/char",
    poolType: "E_CharacterGachaPoolType_Special",
    icon: "b1631fda37aa7e67abae26081bc23a332641b53542d4aa9a57f38cfdffee885e",
    r6PityLimit: 80,
    r5PityLimit: 10,
    guaranteeAt: 120,
  },
  {
    id: "weponbox",
    endpoint: "/api/record/weapon",
    icon: "6d4a9b6980535dab1d10bf647363fe94eaf2bf11838a5beafffecc63a9e68760",
    r6PityLimit: 40,
    r5PityLimit: 10,
    guaranteeAt: 80,
  },
  {
    id: "joint",
    endpoint: "/api/record/char",
    poolType: "E_CharacterGachaPoolType_Joint",
    icon: "69c0b9842f5e59f873ca892191ae18d595350cdd30e93b00219d362a4e0d5909",
    r6PityLimit: 80,
    r5PityLimit: 10,
  },
  {
    id: "standard",
    endpoint: "/api/record/char",
    poolType: "E_CharacterGachaPoolType_Standard",
    icon: "b039152a41eb3bc5d03ea44902d2e65cc0f167864ab6f644657301dd06f4d3f2",
    r6PityLimit: 80,
    r5PityLimit: 10,
  },
  {
    id: "beginner",
    endpoint: "/api/record/char",
    poolType: "E_CharacterGachaPoolType_Beginner",
    icon: "eff495276cc8c3d4c70865fe2dc11ec1f1f54a12c6a161e4a89a3e386ec7ada7",
    r6PityLimit: 40,
    r5PityLimit: 10,
  },
];
