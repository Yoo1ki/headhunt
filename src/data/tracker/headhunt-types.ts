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
    icon: "c00cd24c699e6b991e09d8f52e89c8dd2e96cd16a16396955ccfa2f3558fd0a7",
    r6PityLimit: 80,
    r5PityLimit: 10,
  },
  {
    id: "beginner",
    endpoint: "/api/record/char",
    poolType: "E_CharacterGachaPoolType_Beginner",
    icon: "38852b0e22b0e4c278e078c647aeb96ae37972dc4cdbcc47f98b960eae545e3d",
    r6PityLimit: 40,
    r5PityLimit: 10,
  },
];
