import React, { memo, useMemo } from "react";
import {
  motion,
  type Variants,
  useReducedMotion,
  LazyMotion,
  domAnimation,
} from "framer-motion";

type Accent = "cyan" | "fuchsia" | "emerald" | "amber" | "violet";

type FeatureItem = {
  title: string;
  desc: string;
  points: string[];
  chips: string[];
  Icon: React.FC<{ className?: string; accent?: Accent }>;
  accent: Accent;
  featured?: boolean;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const ACCENTS: Record<
  Accent,
  {
    glow: string;
    chip: string;
    icon: string;
    stroke: string;
    underline: string;
  }
> = {
  cyan: {
    glow: "bg-cyan-500/12",
    chip: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100",
    icon: "text-cyan-200",
    stroke: "from-cyan-500/30 via-white/10 to-fuchsia-500/25",
    underline: "from-cyan-300/70 via-white/20 to-transparent",
  },
  fuchsia: {
    glow: "bg-fuchsia-500/12",
    chip: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100",
    icon: "text-fuchsia-200",
    stroke: "from-fuchsia-500/30 via-white/10 to-cyan-500/25",
    underline: "from-fuchsia-300/70 via-white/20 to-transparent",
  },
  emerald: {
    glow: "bg-emerald-500/10",
    chip: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    icon: "text-emerald-200",
    stroke: "from-emerald-500/30 via-white/10 to-cyan-500/25",
    underline: "from-emerald-300/70 via-white/20 to-transparent",
  },
  amber: {
    glow: "bg-amber-500/10",
    chip: "border-amber-400/20 bg-amber-500/10 text-amber-100",
    icon: "text-amber-200",
    stroke: "from-amber-500/30 via-white/10 to-fuchsia-500/25",
    underline: "from-amber-300/70 via-white/20 to-transparent",
  },
  violet: {
    glow: "bg-violet-500/10",
    chip: "border-violet-400/20 bg-violet-500/10 text-violet-100",
    icon: "text-violet-200",
    stroke: "from-violet-500/30 via-white/10 to-cyan-500/25",
    underline: "from-violet-300/70 via-white/20 to-transparent",
  },
};

function accentMap(accent: Accent) {
  return ACCENTS[accent];
}

/* ---------------- ICONS (sin animaciones pesadas) ---------------- */

const IconShieldPlus: FeatureItem["Icon"] = ({ className = "", accent = "cyan" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <circle cx="50" cy="14" r="6" fill="currentColor" className={a.icon} opacity={0.9} />
      <path
        d="M32 8 52 16v15.2c0 12-8.2 20.8-20 24C20.2 52 12 43.2 12 31.2V16L32 8Z"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/85"
        strokeLinejoin="round"
      />
      <path
        d="M24.8 32.4 30 37.6 41 26.6"
        stroke="currentColor"
        strokeWidth="2.6"
        className="text-white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 12v4m-2-2h4"
        stroke="currentColor"
        strokeWidth="2.2"
        className={a.icon}
        strokeLinecap="round"
        opacity={0.95}
      />
    </svg>
  );
};

const IconChecklist: FeatureItem["Icon"] = ({ className = "", accent = "fuchsia" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M22 10h20" stroke="currentColor" strokeWidth="2.4" className="text-white/85" strokeLinecap="round" />
      <path
        d="M24.2 8.8c.4-1.9 2-3.3 4.1-3.3h7.4c2.1 0 3.7 1.4 4.1 3.3"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/85"
        strokeLinecap="round"
      />
      <path
        d="M18 14h28a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/75"
      />
      <path
        d="M20 28l3 3 6-6"
        stroke="currentColor"
        strokeWidth="2.6"
        className={a.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      />
      <path d="M32 28h12" stroke="currentColor" strokeWidth="2.4" className="text-white/70" strokeLinecap="round" />
      <circle cx="46" cy="38" r="4.8" fill="currentColor" className={a.icon} opacity={0.85} />
      <path d="M20 44h24" stroke="currentColor" strokeWidth="2.4" className="text-white/70" strokeLinecap="round" />
    </svg>
  );
};

const IconCap: FeatureItem["Icon"] = ({ className = "", accent = "emerald" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 14 10 24l22 10 22-10-22-10Z"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/80"
        strokeLinejoin="round"
      />
      <path
        d="M18 28v12c0 2.2 1.2 4.2 3.1 5.4 3.2 1.9 7.2 3.1 10.9 3.1s7.7-1.2 10.9-3.1c1.9-1.2 3.1-3.2 3.1-5.4V28"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/75"
        strokeLinecap="round"
      />
      <path d="M54 26v16" stroke="currentColor" strokeWidth="2.4" className={a.icon} strokeLinecap="round" opacity={0.95} />
      <circle cx="54" cy="44" r="4.2" fill="currentColor" className={a.icon} opacity={0.85} />
    </svg>
  );
};

const IconPeopleNodes: FeatureItem["Icon"] = ({ className = "", accent = "amber" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M40.8 30.2a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z" stroke="currentColor" strokeWidth="2.4" className="text-white/80" />
      <path d="M20.5 31.6a6.5 6.5 0 1 0-6.5-6.5 6.5 6.5 0 0 0 6.5 6.5Z" stroke="currentColor" strokeWidth="2.4" className="text-white/75" />
      <path
        d="M28 56v-3c0-6 4.9-10.8 10.8-10.8h2.3C47 42.2 52 47 52 53v3"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/70"
        strokeLinecap="round"
      />
      <path d="M12 56v-2.6c0-5 4-9.1 9.1-9.1h1.4" stroke="currentColor" strokeWidth="2.4" className="text-white/70" strokeLinecap="round" />
      <circle cx="50" cy="14" r="3.5" fill="currentColor" className={a.icon} opacity={0.85} />
      <circle cx="14" cy="14" r="2.8" fill="currentColor" className={a.icon} opacity={0.75} />
      <path d="M17 16.4 28 24M47 16.4 36 24" stroke="currentColor" strokeWidth="2.2" className={a.icon} strokeLinecap="round" opacity="0.85" />
    </svg>
  );
};

const IconRadar: FeatureItem["Icon"] = ({ className = "", accent = "violet" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M32 56c13.3 0 24-10.7 24-24S45.3 8 32 8 8 18.7 8 32s10.7 24 24 24Z" stroke="currentColor" strokeWidth="2.4" className="text-white/80" />
      <path d="M32 18v14l10 10" stroke="currentColor" strokeWidth="2.6" className={a.icon} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 32h20" stroke="currentColor" strokeWidth="2.2" className="text-white/50" strokeLinecap="round" />
      <path d="M32 22v20" stroke="currentColor" strokeWidth="2.2" className="text-white/50" strokeLinecap="round" />
    </svg>
  );
};

/* ---------------- UTIL: clamp sin plugin ---------------- */
const clamp2 =
  "overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]";
const clamp3 =
  "overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]";

/* ---------------- CARDS ultra ligeras (sin mousemove/state) ---------------- */

const SimpleCard = memo(function SimpleCard({
  accent,
  featured,
  children,
  className = "",
}: {
  accent: Accent;
  featured?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const a = accentMap(accent);

  return (
    <div
      className={[
        "group relative h-full overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] p-5 sm:p-6",
        "transition-transform duration-200 will-change-transform",
        "hover:-translate-y-1 hover:bg-white/[0.05]",
        className,
      ].join(" ")}
    >
      {/* glow (solo CSS) */}
      <div className={`pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl opacity-70 ${a.glow}`} />
      <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/10" />

      {featured && (
        <div className="pointer-events-none absolute inset-0 rounded-[22px] p-px opacity-60">
          <div className={`h-full w-full rounded-[21px] bg-gradient-to-r ${a.stroke}`} />
        </div>
      )}

      <div className="relative">{children}</div>
    </div>
  );
});

const FeatureSpotlight = memo(function FeatureSpotlight({
  item,
}: {
  item: FeatureItem;
}) {
  const a = accentMap(item.accent);

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
      <div className={`pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full blur-3xl ${a.glow}`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

      <div className="relative grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              Destacado
            </span>
            {item.chips.slice(0, 2).map((c) => (
              <span
                key={c}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${a.chip}`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white leading-[1.12]">
              {item.title}
            </h3>
            <div className={`mt-3 h-px w-28 bg-gradient-to-r ${a.underline}`} />
          </div>

          {/* desc corto + clamp en móvil */}
          <p className={`mt-4 text-sm sm:text-base leading-relaxed text-zinc-300 ${clamp3}`}>
            {item.desc}
          </p>

          {/* bullets: en móvil solo 2 */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {item.points.slice(0, 4).map((p) => (
              <li key={p} className="flex gap-3 text-sm text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                <span className={`leading-6 ${clamp2}`}>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* visual simple (sin floaty) */}
        <div className="relative">
          <div className="relative mx-auto grid aspect-square w-full max-w-[300px] place-items-center rounded-[22px] border border-white/10 bg-white/5">
            <div className={`pointer-events-none absolute -inset-10 rounded-[26px] blur-3xl ${a.glow}`} />
            <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-white/10" />
            <item.Icon className="h-20 w-20 sm:h-24 sm:w-24" accent={item.accent} />
          </div>
        </div>
      </div>
    </div>
  );
});

const FeatureCard = memo(function FeatureCard({
  item,
}: {
  item: FeatureItem;
}) {
  const a = accentMap(item.accent);

  return (
    <SimpleCard accent={item.accent}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <item.Icon className="h-7 w-7" accent={item.accent} />
        </div>

        {/* en móvil: máximo 1 chip, en sm+: 2 */}
        <div className="flex flex-wrap justify-end gap-2">
          {item.chips.slice(0, 1).map((c) => (
            <span
              key={c}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${a.chip} sm:hidden`}
            >
              {c}
            </span>
          ))}
          {item.chips.slice(0, 2).map((c) => (
            <span
              key={c}
              className={`hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${a.chip}`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className={`font-heading text-lg font-semibold tracking-[-0.02em] leading-tight text-white ${clamp2}`}>
          {item.title}
        </h3>
        <div className={`mt-3 h-px w-16 bg-gradient-to-r ${a.underline}`} />
      </div>

      {/* desc más corto + clamp */}
      <p className={`mt-3 text-sm leading-6 text-zinc-300 ${clamp2}`}>
        {item.desc}
      </p>

      {/* bullets: 1 en móvil, 2 en sm+ */}
      <ul className="mt-4 space-y-2 text-sm text-zinc-400">
        {item.points.slice(0, 1).map((p) => (
          <li key={p} className="flex gap-3 sm:hidden">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
            <span className={`leading-6 ${clamp2}`}>{p}</span>
          </li>
        ))}
        {item.points.slice(0, 2).map((p) => (
          <li key={p} className="hidden sm:flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
            <span className={`leading-6 ${clamp2}`}>{p}</span>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </SimpleCard>
  );
});

const ProofPill = memo(function ProofPill({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-white">
        {title}
      </p>
      <p className={`mt-1 text-sm leading-relaxed text-zinc-400 ${clamp2}`}>
        {desc}
      </p>
    </div>
  );
});

/* ---------------- DATA (fuera del render pesado) ---------------- */

const ITEMS: FeatureItem[] = [
  {
    title: "Cumplimiento SG-SST con evidencia",
    desc: "Documentos + plan anual + soportes listos para auditoría. Todo trazable y fácil de verificar.",
    points: ["Plan anual y seguimiento", "Evidencia y control de versiones", "Indicadores y mejora"],
    chips: ["Decreto 1072", "Res. 0312", "Auditoría"],
    Icon: IconShieldPlus,
    accent: "cyan",
    featured: true,
  },
  {
    title: "Inspecciones y plan de acción",
    desc: "Hallazgos claros, responsables y cierre verificable para reducir incidentes.",
    points: ["Checklists por riesgo", "Foto + evidencia", "Cierre controlado"],
    chips: ["Hallazgos", "Cierre", "Trazabilidad"],
    Icon: IconChecklist,
    accent: "fuchsia",
  },
  {
    title: "Capacitación con soporte",
    desc: "Ejecución real: contenidos, asistencia, evaluación y evidencias por tema.",
    points: ["Priorización por riesgos", "Materiales + evaluación", "Refuerzo de hábitos"],
    chips: ["Plan anual", "Evidencia", "Cultura"],
    Icon: IconCap,
    accent: "emerald",
  },
  {
    title: "COPASST / CCL sin improvisación",
    desc: "Actas, compromisos y cronograma con trazabilidad y reportes ejecutivos.",
    points: ["Actas estándar", "Seguimiento compromisos", "Informes y control"],
    chips: ["Actas", "Compromisos", "Seguimiento"],
    Icon: IconPeopleNodes,
    accent: "amber",
  },
  {
    title: "Riesgos e indicadores",
    desc: "Priorización de lo crítico + KPIs para decidir con datos y actuar a tiempo.",
    points: ["Matriz y priorización", "KPIs de cumplimiento", "Control de acciones"],
    chips: ["Matriz", "KPIs", "Control"],
    Icon: IconRadar,
    accent: "violet",
  },
];

/* ---------------- SECTION ---------------- */

export default function Features() {
  const reduceMotion = useReducedMotion();

  const { spotlight, rest } = useMemo(() => {
    const spot = ITEMS.find((i) => i.featured) ?? ITEMS[0];
    return { spotlight: spot, rest: ITEMS.filter((i) => i.title !== spot.title) };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section id="features" className="px-6">
        <div className="mx-auto max-w-6xl py-14 sm:py-20">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-3xl"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
              Qué hace SIS
            </p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl leading-[1.08] tracking-[-0.02em] text-white font-semibold">
              Un SG-SST que se entiende, se ejecuta y se sostiene
            </h2>
            <p className={`mt-4 text-base sm:text-lg leading-relaxed text-zinc-300 ${clamp3}`}>
              Acompañamiento técnico + control de ejecución + evidencia organizada para que el
              cumplimiento sea real y verificable.
            </p>
          </motion.div>

          {/* Spotlight */}
          <div className="mt-8 sm:mt-10">
            <FeatureSpotlight item={spotlight} />
          </div>

          {/* Grid */}
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((it, idx) => (
              <motion.div
                key={it.title}
                variants={fadeUp}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "show"}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: reduceMotion ? 0 : 0.02 * idx }}
                className="h-full"
              >
                <FeatureCard item={it} />
              </motion.div>
            ))}
          </div>

          {/* Proof */}
          <div className="mt-8 sm:mt-10 grid gap-3 sm:grid-cols-3">
            <ProofPill title="Evidencia lista" desc="Soportes organizados y auditables." />
            <ProofPill title="Ejecución controlada" desc="Fechas, responsables y cierre real." />
            <ProofPill title="Sistema sostenible" desc="Se mantiene en el tiempo, sin improvisar." />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
