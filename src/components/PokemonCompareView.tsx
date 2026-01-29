import Image from 'next/image';
import { useMemo } from 'react';

type Stat = {
  base_stat: number;
  stat: { name: string };
};

type PokemonDetail = {
  name: string;
  sprites: { front_default: string };
  stats: Stat[];
  types: { type: { name: string } }[];
};

const MAX_STAT = 200;

const BACKGROUNDS = [
  '/pokemon-field-1.jpg',
  '/pokemon-field-2.jpg',
  '/pokemon-field-3.jpg',
];

function normalizeStats(stats: Stat[]) {
  return stats.map(s => s.base_stat / MAX_STAT);
}

function getTotal(stats: Stat[]) {
  return stats.reduce((sum, s) => sum + s.base_stat, 0);
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function radarPath(values: number[], size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 16;
  const step = (Math.PI * 2) / values.length;

  return (
    values
      .map((v, i) => {
        const angle = step * i - Math.PI / 2;
        const { x, y } = polarToCartesian(cx, cy, r * v, angle);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ') + ' Z'
  );
}

export function PokemonCompareView({
  a,
  b,
}: {
  a: PokemonDetail;
  b: PokemonDetail;
}) {
  const aTotal = getTotal(a.stats);
  const bTotal = getTotal(b.stats);
  const winner =
    aTotal > bTotal ? a.name : bTotal > aTotal ? b.name : 'Draw';

  const aNorm = normalizeStats(a.stats);
  const bNorm = normalizeStats(b.stats);

  const background = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl">

      <Image
        src={background}
        alt="Battle background"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 p-4 sm:p-6 space-y-6 text-white">

        <div className="
  flex flex-col items-center gap-4
  sm:grid sm:grid-cols-3 sm:gap-2 sm:items-center sm:text-center
">

          <div>
            <Image
              src={a.sprites.front_default}
              alt={a.name}
              width={120}
              height={120}
              className="
  mx-auto drop-shadow-xl
  w-40 h-40
  sm:w-24 sm:h-24
  md:w-36 md:h-36
"
            />
            <h2 className="capitalize font-bold text-sm text-center sm:text-base">
              {a.name} 🔵
            </h2>
            <p className="text-xs opacity-80 text-center capitalize">
              {a.types.map(t => t.type.name).join(', ')}
            </p>
          </div>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 300 300"
              className="
                w-50 h-50
                sm:w-32 sm:h-32
                md:w-44 md:h-44
              "
            >
              {[0.2, 0.4, 0.6, 0.8, 1].map((v, i) => (
                <circle
                  key={i}
                  cx={150}
                  cy={150}
                  r={(150 - 16) * v}
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                />
              ))}

              {a.stats.map((_, i) => {
                const angle =
                  (Math.PI * 2 / a.stats.length) * i - Math.PI / 2;
                const { x, y } = polarToCartesian(150, 150, 134, angle);
                return (
                  <line
                    key={i}
                    x1={150}
                    y1={150}
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.2)"
                  />
                );
              })}

              <path
                d={radarPath(aNorm, 300)}
                fill="rgba(59,130,246,0.45)"
                stroke="rgb(59,130,246)"
              />

              <path
                d={radarPath(bNorm, 300)}
                fill="rgba(239,68,68,0.45)"
                stroke="rgb(239,68,68)"
              />
            </svg>
          </div>

          <div>
            <Image
              src={b.sprites.front_default}
              alt={b.name}
              width={120}
              height={120}
              className="
  mx-auto drop-shadow-xl
  w-40 h-40
  sm:w-24 sm:h-24
  md:w-36 md:h-36
"
            />
            <h2 className="capitalize font-bold text-sm text-center sm:text-base">
              {b.name} 🛑
            </h2>
            <p className="text-xs opacity-80 text-center capitalize">
              {b.types.map(t => t.type.name).join(', ')}
            </p>
          </div>

        </div>

        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-yellow-400 text-black font-bold text-sm shadow-lg capitalize">
            🏆 Winner: {winner}
          </span>
        </div>

        <div className="space-y-3 text-sm">
          {a.stats.map((s, i) => {
            const bStat = b.stats[i];
            const aWin = s.base_stat > bStat.base_stat;
            const bWin = bStat.base_stat > s.base_stat;

            return (
              <div
                key={s.stat.name}
                className="grid grid-cols-3 items-center gap-3"
              >
                <div className={`text-right ${aWin ? 'font-bold text-green-400' : ''}`}>
                  {s.base_stat}
                </div>

                <div className="space-y-1">
                  <div className="text-center text-xs capitalize opacity-80">
                    {s.stat.name}
                  </div>
                  <div className="flex h-2 bg-white/20 rounded overflow-hidden">
                    <div
                      className="bg-blue-500"
                      style={{ width: `${(s.base_stat / MAX_STAT) * 100}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${(bStat.base_stat / MAX_STAT) * 100}%` }}
                    />
                  </div>
                </div>

                <div className={`text-left ${bWin ? 'font-bold text-green-400' : ''}`}>
                  {bStat.base_stat}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
