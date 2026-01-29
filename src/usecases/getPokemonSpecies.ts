

export const getPokemonSpecies = async (id: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch pokemon species');

  return res.json();
};

