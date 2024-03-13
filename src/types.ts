export interface Pokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

type StatName =
  | "hp"
  | "attack"
  | "defense"
  | "speed"
  | "special-attack"
  | "special-defense";

export interface Stat {
  base_stat: number;
  effort: number;
  stat: { name: StatName; url: string };
}

export interface Pokemon {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { slot: number; type: { name: PokemonType; url: string } }[];
  id: number;
  stats: Stat[];
  abilities: Ability[];
  cries: { latest: string; legacy: string };
}

interface Short {
  name: string;
  url: string;
}

export interface Ability {
  ability: Short;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonAbility {
  id: number;
  name: string;
  names: { name: string; language: Short }[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: Short;
  }[];
}

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "eletric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy"
  | "stellar";
