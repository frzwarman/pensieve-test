import { GET_POKEMON } from '@/graphql/queries/getPokemon';
import { Pokemon, PokemonGameIndex } from '@/types/pokemon';

type GraphQLResponse = {
  data: {
    pokemongameindex: PokemonGameIndex[];
  };
};

export const getPokemon = async (): Promise<Pokemon[]> => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_POKEMON.loc?.source.body,
    }),
    cache: 'no-store',
  });

  const json: GraphQLResponse = await res.json();

  const all = json.data.pokemongameindex.flatMap(
    (x) => x.pokemon
  );

  return Array.from(
    new Map(all.map((p) => [p.id, p])).values()
  );
};
