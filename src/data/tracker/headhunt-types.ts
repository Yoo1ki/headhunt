export type HeadhuntTypeId = "special" | "weponbox" | "standard" | "beginner";

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
    icon: "220616c3cdbfaf99ee3d6c38f0a892fe78a23a3dfaedd611e448d968c92806e2",
    r6PityLimit: 80,
    r5PityLimit: 10,
    guaranteeAt: 120,
  },
  {
    id: "weponbox",
    endpoint: "/api/record/weapon",
    icon: "fc6abe0e6e4a4a6b468fa4dacef40669de8790c04e64ebc28615c2a03cdb5229",
    r6PityLimit: 40,
    r5PityLimit: 10,
    guaranteeAt: 80,
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
