'use client';

import { useEffect, useState } from 'react';
import { getPokemon } from '@/usecases/getPokemon';
import { Pokemon } from '@/types/pokemon';
import { PokemonCard } from '@/components/PokemonCard';
import Image from 'next/image';

export function PokedexContainer() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const [compare, setCompare] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 40;

  useEffect(() => {
    getPokemon().then(setPokemon);
  }, []);

  let filtered = pokemon.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );


  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (sort === 'exp')
    filtered = [...filtered].sort(
      (a, b) => b.base_experience - a.base_experience
    );

  if (sort === 'name')
    filtered = [...filtered].sort((a, b) =>
      a.name.localeCompare(b.name)
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

  return (
    <div>
      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search"
          className="border p-2 rounded w-full"
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={e => setSort(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="exp">Base EXP</option>
        </select>
      </div>

      {/* Compare */}
      {compare.length === 2 && (
        <div className="grid grid-cols-2 gap-4 p-4 border rounded bg-gray-50 mb-4">
          {compare.map(p => (
            <div key={p.id} className="text-center">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                alt={p.name}
                width={120}
                height={120}
              />
              <h3 className="capitalize font-bold">{p.name}</h3>
              <p>EXP: {p.base_experience}</p>
              <p>Height: {p.height}</p>
              <p>Weight: {p.weight}</p>
            </div>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paginated.map(p => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            selected={!!compare.find(x => x.id === p.id)}
            onCompare={() => toggleCompare(p)}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={page * pageSize >= filtered.length}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
