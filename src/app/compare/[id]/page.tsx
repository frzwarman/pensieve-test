'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getPokemon } from '@/usecases/getPokemon';
import { getPokemonDetail } from '@/usecases/getPokemonDetail';
import { PokemonCompareView } from '@/components/PokemonCompareView';
import { Home, Repeat, StepBack } from 'lucide-react';

type PokemonDetail = {
  id: number;
  name: string;
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
};

export default function ComparePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [first, setFirst] = useState<PokemonDetail | null>(null);
  const [second, setSecond] = useState<PokemonDetail | null>(null);
  const [list, setList] = useState<{ id: number; name: string }[]>([]);
  const [search, setSearch] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const pokemons = await getPokemon();
      setList(pokemons);

      const match = pokemons.find(
        p => p.id === Number(id) || p.name === id
      );
      if (!match) return;

      const detail = await getPokemonDetail(match.id);
      setFirst({ ...detail, name: match.name });
    };

    load();
  }, [id]);

  const filteredList = list.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      <div className="flex flex-row justify-between items-center gap-3 pt-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 rounded-full bg-white/70 backdrop-blur border shadow hover:bg-white cursor-pointer"
        >
          <StepBack />
        </button>

        <div className="flex flex-row gap-3">
          <button
            onClick={() => {
              setSecond(null);
              setSelectedName('');
            }}
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-600 text-3xl"
          >
            <Repeat />
          </button>

          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 rounded-full bg-slate-600 text-white hover:bg-slate-700 text-3xl"
          >
            <Home />
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center font-heading">
        Pokémon Comparison
      </h1>

      {!second && (
        <div className="max-w-md mx-auto space-y-2 relative">

          <button
            onClick={() => setOpen(o => !o)}
            className="w-full rounded-full px-4 py-2 border shadow bg-white text-left capitalize"
          >
            {selectedName || 'Select Pokémon to compare'}
          </button>

          {open && (
            <div className="absolute z-20 w-full mt-1 rounded-xl border bg-white shadow max-h-60 overflow-y-auto">

              <input
                autoFocus
                placeholder="Search Pokémon…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-3 py-2 border-b outline-none"
              />

              {filteredList.map(p => (
                <button
                  key={p.id}
                  onClick={async () => {
                    const detail = await getPokemonDetail(p.id);
                    setSecond({ ...detail, name: p.name });
                    setSelectedName(p.name);
                    setOpen(false);
                    setSearch('');
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 capitalize"
                >
                  {p.name}
                </button>
              ))}

              {filteredList.length === 0 && (
                <p className="p-3 text-sm text-gray-500">No Pokémon found</p>
              )}
            </div>
          )}
        </div>
      )}

      {first && second && (
        <>
          <PokemonCompareView a={first} b={second} />
        </>
      )}
    </div>
  );
}
