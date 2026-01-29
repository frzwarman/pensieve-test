import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ===== TYPES ===== */

type PokemonDetail = {
  sprites: { front_default: string };
  cries: { latest: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

type PokemonSpecies = {
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
};

type EvolutionNode = {
  species: { name: string; url: string };
  evolves_to: EvolutionNode[];
};

type Props = {
  name: string;
  detail: PokemonDetail;
  species: PokemonSpecies;
  evolutions: EvolutionNode[];
};

/* ===== CONSTANTS ===== */

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-300',
  psychic: 'bg-purple-400',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-500',
  dark: 'bg-gray-700 text-white',
  fairy: 'bg-pink-300',
  fighting: 'bg-orange-500',
  flying: 'bg-sky-300',
  poison: 'bg-violet-400',
  ground: 'bg-amber-600',
  rock: 'bg-stone-500',
  bug: 'bg-lime-400',
  ghost: 'bg-indigo-700 text-white',
  steel: 'bg-slate-400',
  normal: 'bg-gray-300',
};

export function PokemonDetailView({
  name,
  detail,
  species,
  evolutions,
}: Props) {
  const router = useRouter();

  const flavor =
    species.flavor_text_entries.find(f => f.language.name === 'en')
      ?.flavor_text.replace(/\f/g, ' ') ?? 'No description available.';

  const strongestStat = detail.stats.reduce((a, b) =>
    b.base_stat > a.base_stat ? b : a
  );

  return (
    <main className="max-w-4xl mx-auto space-y-12 p-4">

      <button
        onClick={() => router.back()}
        className="
          inline-flex items-center gap-2
          px-4 py-2 rounded-full
          bg-white/70 backdrop-blur-md
          border border-white/40
          shadow-soft-lg
          hover:bg-white/90 transition
        "
      >
        ← Back
      </button>

      <section className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
          <Image
            src={detail.sprites.front_default}
            alt={name}
            width={192}
            height={192}
            className="relative z-10"
          />
        </div>

        <div className="text-center sm:text-left space-y-3">
          <h1 className="text-4xl font-heading capitalize">{name}</h1>

          <div className="flex justify-center sm:justify-start gap-2">
            {detail.types.map(t => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded-full text-sm capitalize ${TYPE_COLORS[t.type.name]}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <p className="italic text-muted max-w-md">“{flavor}”</p>

          <div className="flex justify-center sm:justify-start gap-3 pt-2">
            <Link
              // eslint-disable-next-line react-hooks/purity
              href={`/pokemon/${Math.floor(Math.random() * 151) + 1}`}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-white"
            >
              🎲 Random
            </Link>

            <button
              onClick={() => {
                const audio = new Audio(detail.cries.latest);
                audio.play();
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 cursor-pointer"
            >
              🔊 Cry
            </button>

            <Link
              href={`/compare/${name}`}
              className="px-4 py-2 rounded-xl bg-red-500 text-white"
            >
              ⚔️ Compare
            </Link>
          </div>

        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-heading">Combat Info</h2>

        <div className="space-y-3">
          {detail.stats.map(s => (
            <div key={s.stat.name} className="flex items-center gap-3">
              <span className="w-24 capitalize text-sm">{s.stat.name}</span>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500"
                  style={{ width: `${(s.base_stat / 200) * 100}%` }}
                />
              </div>
              <span>{s.base_stat}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
          💡 Strongest stat: <strong>{strongestStat.stat.name}</strong>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-heading">World Info</h2>

        <div>
          <h3 className="font-medium mb-2">Evolution Chain</h3>
          <div className="flex gap-6 flex-wrap">
            {evolutions.map(e => {
              const evoId = e.species.url.split('/').slice(-2)[0];
              return (
                <Link
                  key={e.species.name}
                  href={`/pokemon/${evoId}`}
                  className="text-center"
                >
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`}
                    alt={e.species.name}
                    width={96}
                    height={96}
                  />
                  <p className="capitalize">{e.species.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
