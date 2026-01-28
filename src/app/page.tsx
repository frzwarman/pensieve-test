import { PokedexContainer } from '@/containers/Pokedex.container';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
      <PokedexContainer />
    </main>
  );
}
