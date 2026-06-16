export interface SKPortGuideOperators {
  code: number;
  message: string;
  timestamp: string;
  data: Data;
}

interface Data {
  chars: Char[];
}

interface Char {
  id: string;
  name: string;
  avatarSqUrl: string;
  avatarRtUrl: string;
  rarity: Rarity;
  profession: Rarity;
  property: Rarity;
  weaponType: Rarity;
  skills: Skill[];
  labelType?: string;
  illustrationUrl: string;
  tags: string[];
  abilityTalents: AbilityTalent[];
  combatTalents: CombatTalent[];
  cultivationTalents: AbilityTalent[];
}

interface CombatTalent {
  id: string;
  name: string;
  iconUrl: string;
  desc: string;
  descParams: DescParams2;
  lockedIconUrl: string;
}

interface DescParams2 {
  duration_talent1buff?: string;
  range_talent1buff?: string;
  ratio_speed?: string;
  ratio_speedreduction?: string;
  talent1_speed?: string;
  dmg_up_water_ult?: string;
  talent2?: string;
  effect_prob?: string;
  heal_scale?: string;
  heal_value?: string;
  sheep_num?: string;
  talent1?: string;
  attack?: string;
  duration?: string;
  shelterrate?: string;
  atk_up?: string;
  dmg?: string;
  add?: string;
  heal_const?: string;
  cd?: string;
  heal_max_hp?: string;
  hp_threshold?: string;
  shelter?: string;
  shelter_real?: string;
  ignore_fire_resist?: string;
  ignore_fire_resist_duration?: string;
  max_stack?: string;
  crystal_up?: string;
  rate?: string;
  talent_2?: string;
  atk_scale_talent2?: string;
  atb_gain?: string;
  max_stack_owner?: string;
  physpell_up?: string;
  dmg_up?: string;
  inflict_up?: string;
  status_up?: string;
  prob_add?: string;
  prob_max?: string;
  usp?: string;
  usp_self?: string;
  prob?: string;
  count?: string;
  pulse_up?: string;
  talent_1?: string;
  pulse_vul_duration?: string;
  pulse_vul_rate?: string;
  talent0_usp?: string;
  atk?: string;
  poise?: string;
  talent_1_cd_reduce?: string;
  talent_1_duration?: string;
  talent_1_stack?: string;
  stack?: string;
  heal_up?: string;
  talent_2_sup?: string;
  returnskillpower?: string;
  exist_talent_2?: string;
  cryst_up?: string;
  exist_talent_1?: string;
  max_ratio?: string;
  sub_ratio?: string;
  combo?: string;
  imbue_scale?: string;
  healvalue?: string;
  multiplier?: string;
  probability?: string;
  atk_scale_shockwave?: string;
  atb?: string;
  dmg_down?: string;
}

interface AbilityTalent {
  id: string;
  name: string;
  iconUrl: string;
  desc: string;
  lockedIconUrl: string;
}

interface Skill {
  id: string;
  name: string;
  type: Rarity;
  property: Rarity;
  iconUrl: string;
  desc: string;
  descLevelParams: DescLevelParams;
}

interface DescLevelParams {
  '1': _1;
}

interface _1 {
  level: string;
  params: Params;
}

interface Params {
  atb?: string;
  atk_scale?: string;
  poise?: string;
  atb_return?: string;
  atb_return_02?: string;
  atk_scale_1?: string;
  display_atk_scale1?: string;
  display_atk_scale2?: string;
  display_poise?: string;
  poise1?: string;
  poise_tornado?: string;
  duration_water?: string;
  usp?: string;
  atk_scale_2?: string;
  atk_scale_3?: string;
  display_atk_scale?: string;
  display_duration?: string;
  poise2?: string;
  poise3?: string;
  duration_vul?: string;
  rate_vul_base?: string;
  rate_vul_max?: string;
  atk_scale_boom?: string;
  duration_corrupt?: string;
  duration?: string;
  effect_prob?: string;
  interval?: string;
  atk_scale2?: string;
  displayextrapoise?: string;
  displaypoise?: string;
  extrapoise?: string;
  heal_base?: string;
  will_additive?: string;
  hp_percent?: string;
  atk_scale_trigger?: string;
  originum_ult_break_scale?: string;
  atk_scale_explosion?: string;
  atk_scale_pull?: string;
  display_atk_scale_pull?: string;
  move_speed_scalar?: string;
  spell_vulnerable_4stack?: string;
  spell_vulnerable_perstack?: string;
  spell_vulnerable_rate?: string;
  count?: string;
  extra_usp?: string;
  poise_extra?: string;
  usp_1_display?: string;
  usp_2_display?: string;
  usp_3_display?: string;
  atk_scale3?: string;
  usp_base?: string;
  phy_resist_down?: string;
  atk_scale1?: string;
  atb1?: string;
  atb2?: string;
  atb3?: string;
  atb4?: string;
  atk_scale4?: string;
  atb_final?: string;
  atb_trigger?: string;
  atk_scale_final?: string;
  atk_scale_rush?: string;
  poise_final?: string;
  poise_rush?: string;
  atk_scale_layer?: string;
  usp_layer?: string;
  atk_scale_tick?: string;
  maxcnt?: string;
  usp_extra?: string;
  atk_scale_extra?: string;
  atk_scale_display?: string;
  atb_1?: string;
  atb_2?: string;
  atb_3?: string;
  atb_4?: string;
  atb_sp?: string;
  atk_scale_1ex?: string;
  atk_scale_2ex?: string;
  atk_scale_display_ex?: string;
  atb_max?: string;
  atb_up?: string;
  atk_scale_lance?: string;
  atk_scale_lance_ult?: string;
  poise_lance?: string;
  poise_lance_ult?: string;
  lance_duration?: string;
  lance_duration_ult?: string;
  pulse_resist_down_duration?: string;
  pulse_resist_down_rate?: string;
  airborne_coefficient?: string;
  airborne_initial?: string;
  poise_start?: string;
  airborne_duration?: string;
  atk_scale_pre?: string;
  crush_multi?: string;
  atk_scale_end?: string;
  atk_scale_loop?: string;
  atb_return_base?: string;
  dmg_reduce?: string;
  heal_scale?: string;
  heal_scale_loop?: string;
  heal_static_value?: string;
  heal_static_value_loop?: string;
  trigger_hp_ratio?: string;
  forst_allow_count?: string;
  atk_scale_plus?: string;
  atk_scale_plus_fail?: string;
  poise_extra_bullet?: string;
  poise_extra_bullet_fail?: string;
  poise_first_bullet?: string;
  poise_first_bullet_display?: string;
  poise_display?: string;
  atk_up?: string;
  buff_duration?: string;
  heal_value?: string;
  will_up?: string;
  wisd_max?: string;
  wisd_up?: string;
  atb_display?: string;
  rate?: string;
  taken_dmg?: string;
  shield_base?: string;
  shield_def_rate?: string;
  shield_duration?: string;
  weak_duration?: string;
  weak_scale?: string;
  attack_poise?: string;
  boom_up?: string;
  atk_scale_add_1?: string;
  atk_scale_add_2?: string;
  atk_scale_add_3?: string;
  atk_scale_add_4?: string;
}

interface Rarity {
  key: string;
  value: string;
}
