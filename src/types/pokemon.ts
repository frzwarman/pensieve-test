export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  search: string;
  sort: string;

  // added from REST
  sprites?: {
    front_default: string;
  };
  types?: {
    type: {
      name: string;
    };
  }[];
};


export type PokemonGameIndex = {
  pokemon: Pokemon[];
};
