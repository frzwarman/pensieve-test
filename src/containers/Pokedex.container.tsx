'use client';

import { useMemo, useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { PokemonCard } from '@/components/PokemonCard';
import Image from 'next/image';

const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export function PokedexContainer({ pokemon, search, sort }: { pokemon: Pokemon[], search: string, sort: 'name' | 'exp' }) {
  const [compare, setCompare] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);

  const [types, setTypes] = useState<string[]>([]);

  const pageSize = 40;

  // Reset page when filters change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, sort, types]);

  const filtered = useMemo(() => {
    let result = pokemon;

    // Search
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Type filter
    if (types.length) {
      result = result.filter(p =>
        p.types?.some(t => types.includes(t.type.name))
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === 'exp') return b.base_experience - a.base_experience;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [pokemon, search, types, sort]);

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const toggleCompare = (p: Pokemon) => {
    setCompare(prev =>
      prev.find(x => x.id === p.id)
        ? prev.filter(x => x.id !== p.id)
        : prev.length < 2
          ? [...prev, p]
          : prev
    );
  };

  const toggleType = (type: string) => {
    setTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="space-y-6">

      {/* Controls */}
      <div className="grid gap-4">
        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 justify-around">
          {ALL_TYPES.map(type => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`
                px-3 py-1 rounded-full text-xs capitalize transition
                ${types.includes(type)
                  ? 'bg-black text-white'
                  : 'bg-white/70 hover:bg-white'}
              `}
            >
              {type}
            </button>
          ))}
        </div>


      </div>

      {/* Compare Panel */}
      {compare.length === 2 && (
        <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl">
          {compare.map(p => (
            <div key={p.id} className="text-center">
              <Image
                src={p.sprites?.front_default ?? ''}
                alt={p.name}
                width={128}
                height={128}
                className="mx-auto"
              />
              <h3 className="mt-2 text-lg font-heading capitalize">{p.name}</h3>
              <div className="text-sm text-muted space-y-1 mt-1">
                <p>EXP: <strong>{p.base_experience}</strong></p>
                <p>Height: {p.height}</p>
                <p>Weight: {p.weight}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {paginated.map(p => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            selected={!!compare.find(x => x.id === p.id)}
            onCompare={() => toggleCompare(p)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 pt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-lg disabled:opacity-50"
        >
          ← Prev
        </button>

        <span className="text-sm text-muted">
          Page <strong>{page}</strong> / {Math.ceil(filtered.length / pageSize)}
        </span>

        <button
          disabled={page * pageSize >= filtered.length}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-lg disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
