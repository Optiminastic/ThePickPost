// Deterministic, generative pastel cover tiles — one per list, seeded by slug.
// Mirrors the playful colour-block artwork in the reference design with zero
// external image dependencies. Shows the "TOP N" rank so the grid reads as a
// wall of listicles at a glance.

const PASTELS: { bg: string; shapes: string[] }[] = [
  { bg: "#f6d9c6", shapes: ["#e8552f", "#2f3a8f", "#f4b860", "#ffffff"] },
  { bg: "#cfe0d6", shapes: ["#2f8f6b", "#e8552f", "#1c1c1c", "#f4b860"] },
  { bg: "#d6def0", shapes: ["#2f3a8f", "#e85a9c", "#5ec3d6", "#ffffff"] },
  { bg: "#f3d6e2", shapes: ["#e85a9c", "#2f3a8f", "#f4b860", "#ffffff"] },
  { bg: "#efe6c4", shapes: ["#c79a2f", "#2f8f6b", "#e8552f", "#1c1c1c"] },
  { bg: "#d3e7ee", shapes: ["#2f7fb0", "#e8552f", "#f4b860", "#ffffff"] },
  { bg: "#e3dcef", shapes: ["#6b4fb0", "#e85a9c", "#5ec3d6", "#ffffff"] },
  { bg: "#f4ddc2", shapes: ["#e8772f", "#2f3a8f", "#2f8f6b", "#ffffff"] },
];

/** Tiny deterministic hash → 0..1 generator seeded by a string. */
function seeded(slug: string) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function CoverTile({
  slug,
  count,
  className = "",
  showRank = true,
}: {
  slug: string;
  count: number;
  className?: string;
  showRank?: boolean;
}) {
  const rand = seeded(slug);
  const palette = PASTELS[Math.floor(rand() * PASTELS.length)];
  const variant = Math.floor(rand() * 3);
  const pick = () => palette.shapes[Math.floor(rand() * palette.shapes.length)];

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={count ? `Cover artwork for a top ${count} list` : "Cover artwork"}
    >
      <rect width="300" height="300" fill={palette.bg} />

      {variant === 0 &&
        // Stacked rounded pills
        Array.from({ length: 5 }).map((_, i) => {
          const w = 60 + rand() * 150;
          const h = 22 + rand() * 26;
          const x = rand() * (300 - w);
          const y = 30 + i * 50 + rand() * 8;
          return (
            <rect key={i} x={x} y={y} width={w} height={h} rx={h / 2} fill={pick()} opacity={0.85} />
          );
        })}

      {variant === 1 &&
        // Floating circles
        Array.from({ length: 6 }).map((_, i) => {
          const cx = 40 + rand() * 220;
          const cy = 40 + rand() * 220;
          const rr = 18 + rand() * 52;
          return <circle key={i} cx={cx} cy={cy} r={rr} fill={pick()} opacity={0.85} />;
        })}

      {variant === 2 &&
        // Rotated squares
        Array.from({ length: 5 }).map((_, i) => {
          const s = 40 + rand() * 90;
          const x = rand() * (300 - s);
          const y = rand() * (300 - s);
          const r = rand() * 90;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={s}
              height={s}
              rx="8"
              fill={pick()}
              opacity={0.85}
              transform={`rotate(${r} ${x + s / 2} ${y + s / 2})`}
            />
          );
        })}

      {showRank && (
        <g>
          <text
            x="20"
            y="270"
            fontFamily="var(--font-fraunces), serif"
            fontSize="26"
            fontWeight="600"
            fill="#141414"
            opacity="0.92"
          >
            TOP {count}
          </text>
        </g>
      )}
    </svg>
  );
}
