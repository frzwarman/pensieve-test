type Species = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  habitat: { name: string } | null;
  generation: { name: string };
  capture_rate: number;
  base_happiness: number;
};

export const getPokemonSpecies = async (id: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch pokemon species');

  return res.json();
};

