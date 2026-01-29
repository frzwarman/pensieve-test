type PokemonRestDetail = {
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export const getPokemonRestDetail = async (
  id: number
): Promise<PokemonRestDetail> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Failed to fetch REST pokemon detail');
  return res.json();
};
