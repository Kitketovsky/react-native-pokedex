type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "speed"
  | "special-attack"
  | "special-defense";

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: StatName; url: string };
}
