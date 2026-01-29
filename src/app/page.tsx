'use client'

import { PokemonListContainer } from '@/containers/PokemonListContainer';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'name' | 'exp'>('name');

  return (
    <main>
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-5xl font-heading tracking-tighter bg-linear-to-b from-red-500 to-blue-500 bg-clip-text text-transparent">
          Pokédex
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            placeholder="Search Pokémon…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <select
            value={sort}
            onChange={e => setSort(e.target.value as 'name' | 'exp')}
            className="rounded-xl px-4 py-2 bg-white/70 backdrop-blur-md border border-white/40 shadow-soft-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="name">Sort by Name</option>
            <option value="exp">Sort by EXP</option>
          </select>
        </div>
      </header>


      <section>
        <PokemonListContainer search={search} sort={sort} />
      </section>
    </main>
  );
}