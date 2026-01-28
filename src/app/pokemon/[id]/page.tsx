import { getPokemon } from '@/usecases/getPokemon';
import Image from 'next/image';

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemons = await getPokemon();
  const numericId = Number(id);

  const pokemon = pokemons.find(p => p.id === numericId);

  if (!pokemon) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold">Pokemon not found</h1>
        <p>Requested ID: {id}</p>
        <p>Loaded: {pokemons.length} pokemons</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-4">
        {pokemon.name}
      </h1>

      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
        width={160}
        height={160}
      />

      <div className="mt-4 space-y-2">
        <p>Base EXP: {pokemon.base_experience}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>
    </main>
  );
}
