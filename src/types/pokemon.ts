export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  search: string;
  sort: string;

  // REST
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

export type Encounter = {
  location_area: { name: string };
};

export type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  evolution_chain: { url: string };

  capture_rate: number;
  growth_rate: { name: string };
  base_happiness: number;
};

export type TypeDamage = {
  double_damage_from: { name: string }[];
  half_damage_from: { name: string }[];
  no_damage_from: { name: string }[];
};
