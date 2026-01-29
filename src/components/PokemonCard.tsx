import Image from 'next/image';
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';
import { TYPE_COLORS } from '@/constants/theme';

export function PokemonCard({ pokemon, }: {
  pokemon: Pokemon;
}) {
  const mainType = pokemon.types?.[0]?.type.name ?? 'normal';
  const bg = TYPE_COLORS[mainType] ?? TYPE_COLORS.normal;

  const bgImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const isDark = mainType === 'dark' || mainType === 'ghost';

  return (
    <article
      className={`
        group relative overflow-hidden rounded-3xl p-4 cursor-pointer
        bg-linear-to-br ${bg}
        shadow-soft-lg transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
        ${isDark ? 'text-white' : 'text-black'}
      `}
    >
      <div
        className="
          absolute inset-0 bg-center bg-no-repeat bg-contain
          opacity-[0.04]
          transition-opacity duration-300
          group-hover:opacity-100
        "
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />

      <Link
        href={`/pokemon/${pokemon.id}`}
        className="relative block text-center transition-opacity duration-300 group-hover:opacity-0"
      >
        <div className="mx-auto w-28 h-28 flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            width={112}
            height={112}
            priority={false}
          />
        </div>

        <h3 className="mt-2 text-center font-heading text-base capitalize">
          {pokemon.name}
        </h3>
        <p className={`text-sm text-center mt-1 ${isDark ? 'text-white/80' : 'text-muted'}`}>
          EXP {pokemon.base_experience}
        </p>
      </Link>
    </article>
  );
}
