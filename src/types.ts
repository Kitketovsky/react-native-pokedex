export interface Pokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
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
