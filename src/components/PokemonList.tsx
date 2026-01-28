import { Pokemon } from "@/types/pokemon";

export function PokemonList({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <ul className="space-y-2">
      {pokemon.map((p) => (
        <li
          key={p.id}
          className="rounded border p-3 capitalize"
        >
          <div className="font-semibold">{p.name}</div>
          <div className="text-sm text-gray-500">
            EXP: {p.base_experience} · H: {p.height} · W: {p.weight}
          </div>
        </li>
      ))}
    </ul>
  );
}
