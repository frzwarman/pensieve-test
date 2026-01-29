'use client'

import { PokemonListContainer } from '@/containers/PokemonListContainer';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') ?? '';
  const initialSort = (searchParams.get('sort') as 'name' | 'exp') ?? 'name';
  const initialTypes =
    searchParams.get('types')?.split(',').filter(Boolean) ?? [];

  const [types, setTypes] = useState<string[]>(initialTypes);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<'name' | 'exp'>(initialSort);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    if (types.length) params.set('types', types.join(','));

    router.replace(`/?${params.toString()}`);
  }, [search, sort, types, router]);

  return (
    <main>
      <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <Image src="/pokedex-logo.png" alt="Pokédex" width={240} height={60} />

        <div className="flex flex-row gap-3 w-full sm:w-auto">
          <input
            placeholder="Search Pokémon…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              flex-1 rounded-full px-4 py-2
              bg-white/70 backdrop-blur-md
              border border-white/40
              shadow-soft-lg
              focus:outline-none focus:ring-2 focus:ring-accent
            "
          />

          <div className="relative w-28">
            <select
              value={sort}
              onChange={e => setSort(e.target.value as 'name' | 'exp')}
              className="
                appearance-none w-full
                rounded-full px-4 py-4 pr-9
                bg-white/70 backdrop-blur-md
                border border-white/40
                shadow-soft-lg text-sm
                focus:outline-none focus:ring-2 focus:ring-accent
                cursor-pointer
              "
            >
              <option value="name">Name</option>
              <option value="exp">EXP</option>
            </select>

            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600"
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
      </header>

      <section>
        <PokemonListContainer search={search} sort={sort} setSearch={setSearch} types={types} setTypes={setTypes} />
      </section>
    </main>
  );
}
