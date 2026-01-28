'use client';

import { useEffect, useState } from 'react';
import { getPokemon } from '@/usecases/getPokemon';
import { PokemonList } from '@/components/PokemonList';
import { Pokemon } from '@/types/pokemon';

export function PokemonListContainer() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemon()
      .then(setPokemon)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return <PokemonList pokemon={pokemon} />;
}
