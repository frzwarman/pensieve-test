'use client';

import { useEffect, useState } from 'react';
import { getPokemon } from '@/usecases/getPokemon';
import { getPokemonRestDetail } from '@/usecases/getPokemonRestDetail';
import { LoadingGrid } from '@/components/LoadingSkeleton';
import { Pokemon } from '@/types/pokemon';
import { PokedexContainer } from './Pokedex.container';

export function PokemonListContainer({ search, sort, setSearch, types, setTypes }: {
  search: string, sort: 'name' | 'exp', setSearch: React.Dispatch<React.SetStateAction<string>>, types: string[], setTypes: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const gqlPokemon = await getPokemon();

      const enriched = await Promise.all(
        gqlPokemon.map(async (p) => {
          const rest = await getPokemonRestDetail(p.id);

          return {
            ...p,
            sprites: rest.sprites,
            types: rest.types,
          };
        })
      );

      setPokemon(enriched);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <LoadingGrid />;
  if (!pokemon.length)
    return <p className="text-center text-sm text-muted">No Pokémon found.</p>;

  return <PokedexContainer pokemon={pokemon} search={search} sort={sort} setSearch={setSearch} types={types} setTypes={setTypes} />;
}
