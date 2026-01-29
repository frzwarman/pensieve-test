'use client';

import { useMemo, useState, useEffect } from 'react';
import { Pokemon } from '@/types/pokemon';
import { PokemonCard } from '@/components/PokemonCard';
import Image from 'next/image';

const ALL_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

export function PokedexContainer({
  pokemon,
  search,
  sort,
  setSearch
}: {
  pokemon: Pokemon[];
  search: string;
  sort: 'name' | 'exp';
  setSearch: React.Dispatch<React.SetStateAction<string>>
}) {
  const [page, setPage] = useState(1);
  const [types, setTypes] = useState<string[]>([]);

  const pageSize = 40;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search, sort, types]);

  const filtered = useMemo(() => {
    let result = pokemon;

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (types.length) {
      result = result.filter(p =>
        p.types?.some(t => types.includes(t.type.name))
      );
    }

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

  const toggleType = (type: string) => {
    setTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const resetFilters = () => {
    setTypes([]);
    setSearch('')
  };

  return (
    <div className="space-y-8">

      <div
        className="
          sticky top-4 z-20
          rounded-xl
          bg-white/80 backdrop-blur-lg
          shadow-lg
          border border-white/40
          p-4
          space-y-4
        "
      >
        <p className="text-sm text-gray-600">
          Showing{' '}
          <strong>
            {types.length ? types.join(' + ') : 'All types'}
          </strong>{' '}
          ({filtered.length} results)
        </p>

        <div className="grid gap-4">
          <div className="sm:hidden flex justify-end">
            <div className="relative w-full">
              <select
                value={types[0] ?? ''}
                onChange={e =>
                  setTypes(e.target.value ? [e.target.value] : [])
                }
                aria-label="Filter by type"
                className="
                  appearance-none w-full
                  rounded-full
                  px-4 py-2 pr-10
                  bg-white/70 backdrop-blur-md
                  border border-white/40
                  shadow-soft-lg
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent
                  cursor-pointer
                  capitalize
                "
              >
                <option value="">All Types</option>
                {ALL_TYPES.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>

              <svg
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="hidden sm:flex flex-wrap gap-3 justify-around">
            {ALL_TYPES.map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`
                  rounded-full capitalize transition
                  px-3 py-1 text-xs
                  focus:outline-none focus:ring-2 focus:ring-accent
                  ${types.includes(type)
                    ? 'bg-black text-white'
                    : 'bg-white/70 hover:bg-white'}
                `}
              >
                {type}
              </button>
            ))}
          </div>

          {types.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={resetFilters}
                className="
                  text-sm px-3 py-1
                  rounded-full
                  bg-red-500 text-white
                  hover:bg-red-600
                  focus:outline-none focus:ring-2 focus:ring-red-300
                "
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <Image
            src="/pokemon-not-found.webp"
            alt="No Pokémon found"
            width={240}
            height={240}
            className="
    mx-auto
    rounded-full
    animate-ping
    opacity-10
  "
          />
          <p className="text-lg font-semibold">No Pokémon found</p>
          <p className="text-gray-500">
            Try adjusting or clearing your filters.
          </p>
          <button
            onClick={resetFilters}
            className="
              px-4 py-2 rounded-full
              bg-blue-500 text-white
              hover:bg-blue-600
            "
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {paginated.map(p => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 p-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-lg disabled:opacity-50"
            >
              ←
            </button>

            <span className="text-sm text-muted">
              Page <strong>{page}</strong> /{' '}
              {Math.ceil(filtered.length / pageSize)}
            </span>

            <button
              disabled={page * pageSize >= filtered.length}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-lg disabled:opacity-50"
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
