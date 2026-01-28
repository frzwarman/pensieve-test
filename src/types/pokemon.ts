export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
};

export type PokemonGameIndex = {
  pokemon: Pokemon[];
};