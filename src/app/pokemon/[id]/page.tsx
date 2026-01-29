'use client';

import { useEffect, useState, use } from 'react';
import { getPokemon } from '@/usecases/getPokemon';
import { getPokemonDetail } from '@/usecases/getPokemonDetail';
import { getPokemonSpecies } from '@/usecases/getPokemonSpecies';
import { getEvolutionChain } from '@/usecases/getEvolutionChain';
import { PokemonDetailView } from '@/components/PokemonDetailView';

/* ===== TYPES ===== */

type PokemonDetail = {
  sprites: { front_default: string };
  cries: { latest: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  evolution_chain: { url: string };
};

type EvolutionNode = {
  species: { name: string; url: string };
  evolves_to: EvolutionNode[];
};

type EvolutionChain = {
  chain: EvolutionNode;
};

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params correctly
  const { id } = use(params);

  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolution, setEvolution] = useState<EvolutionChain | null>(null);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      const pokemons = await getPokemon();
      const pokemon = pokemons.find(p => p.id === Number(id));
      if (!pokemon) return;

      setName(pokemon.name);

      const detailData = await getPokemonDetail(pokemon.id);
      const speciesData = await getPokemonSpecies(pokemon.id);
      const evolutionData = await getEvolutionChain(
        speciesData.evolution_chain.url
      );

      setDetail(detailData);
      setSpecies(speciesData);
      setEvolution(evolutionData);
    };

    load();
  }, [id]); // ✅ now safe

  if (!detail || !species || !evolution) {
    return <p className="text-center mt-10">Loading Pokémon…</p>;
  }

  const evolutions: EvolutionNode[] = [];
  let chain: EvolutionNode | undefined = evolution.chain;

  while (chain) {
    evolutions.push(chain);
    chain = chain.evolves_to[0];
  }

  return (
    <PokemonDetailView
      name={name}
      detail={detail}
      species={species}
      evolutions={evolutions}
    />
  );
}
