import { IPokemon } from "./IPokemon";

export interface IPokemons {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string; data: IPokemon }[];
}
