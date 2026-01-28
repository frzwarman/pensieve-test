import { Pokemon } from '@/types/pokemon';
import Image from 'next/image';
import Link from 'next/link';

export function PokemonCard({
  pokemon,
  onCompare,
  selected,
}: {
  pokemon: Pokemon;
  onCompare: () => void;
  selected: boolean;
}) {
  return (
    <div
      onClick={onCompare}
      className={`border rounded p-3 cursor-pointer ${selected ? 'ring-2 ring-blue-500' : ''
        }`}
    >
      <Link href={`/pokemon/${pokemon.id}`}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="mx-auto"
          width={96}
          height={96}
        />
      </Link>
      <h3 className="text-center capitalize font-bold">
        {pokemon.name}
      </h3>
      <p className="text-sm text-center">
        EXP: {pokemon.base_experience}
      </p>
    </div>
  );
}
