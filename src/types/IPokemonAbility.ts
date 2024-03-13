export interface IPokemonAbility {
  id: number;
  name: string;
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
}
