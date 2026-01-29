export const getPokemonDetail = async (id: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch pokemon detail');

  return res.json();
};
