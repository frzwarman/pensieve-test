export async function getPokemonEncounters(id: number) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`);
  if (!res.ok) throw new Error('Failed to fetch encounters');
  return res.json();
}
