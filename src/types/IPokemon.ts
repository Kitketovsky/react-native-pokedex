import { IPokemonStat } from "./IPokemonStat";
import { IPokemonType } from "./IPokemonType";

export interface IPokemon {
  sprites: {
    back_default: string;
    back_female: string | null;
    back_shiny_default: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: {
      home: {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: { slot: number; type: { name: IPokemonType; url: string } }[];
  id: number;
  stats: IPokemonStat[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  cries: { latest: string; legacy: string };
}
