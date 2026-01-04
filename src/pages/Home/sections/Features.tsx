import React, { useMemo, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

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
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const floaty = (delay = 0): Variants => ({
  initial: { y: 0, rotate: 0, opacity: 1 },
  animate: {
    y: [0, -5, 0],
    rotate: [0, 1.1, 0],
    opacity: 1,
    transition: { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay },
  },
});

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function accentMap(accent: Accent) {
  switch (accent) {
    case "cyan":
      return {
        glow: "bg-cyan-500/16",
        ring: "group-hover:ring-cyan-400/25",
        chip: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100",
        icon: "text-cyan-200",
        stroke: "from-cyan-500/30 via-white/10 to-fuchsia-500/25",
        spot: "rgba(34,211,238,0.26)",
        underline: "from-cyan-300/70 via-white/20 to-transparent",
      };
    case "fuchsia":
      return {
        glow: "bg-fuchsia-500/16",
        ring: "group-hover:ring-fuchsia-400/25",
        chip: "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100",
        icon: "text-fuchsia-200",
        stroke: "from-fuchsia-500/30 via-white/10 to-cyan-500/25",
        spot: "rgba(232,121,249,0.24)",
        underline: "from-fuchsia-300/70 via-white/20 to-transparent",
      };
    case "emerald":
      return {
        glow: "bg-emerald-500/14",
        ring: "group-hover:ring-emerald-400/25",
        chip: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
        icon: "text-emerald-200",
        stroke: "from-emerald-500/30 via-white/10 to-cyan-500/25",
        spot: "rgba(52,211,153,0.22)",
        underline: "from-emerald-300/70 via-white/20 to-transparent",
      };
    case "amber":
      return {
        glow: "bg-amber-500/14",
        ring: "group-hover:ring-amber-400/25",
        chip: "border-amber-400/20 bg-amber-500/10 text-amber-100",
        icon: "text-amber-200",
        stroke: "from-amber-500/30 via-white/10 to-fuchsia-500/25",
        spot: "rgba(251,191,36,0.2)",
        underline: "from-amber-300/70 via-white/20 to-transparent",
      };
    case "violet":
      return {
        glow: "bg-violet-500/14",
        ring: "group-hover:ring-violet-400/25",
        chip: "border-violet-400/20 bg-violet-500/10 text-violet-100",
        icon: "text-violet-200",
        stroke: "from-violet-500/30 via-white/10 to-cyan-500/25",
        spot: "rgba(167,139,250,0.22)",
        underline: "from-violet-300/70 via-white/20 to-transparent",
      };
  }
}

/* ---------------- ICONS ---------------- */

const IconShieldPlus: FeatureItem["Icon"] = ({ className = "", accent = "cyan" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <motion.circle
        cx="50"
        cy="14"
        r="6"
        fill="currentColor"
        className={a.icon}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.9}
      />
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
      <path
        d="M22 10h20"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/85"
        strokeLinecap="round"
      />
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
      <motion.path
        d="M20 28l3 3 6-6"
        stroke="currentColor"
        strokeWidth="2.6"
        className={a.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.95}
      />
      <path
        d="M32 28h12"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/70"
        strokeLinecap="round"
      />
      <motion.circle
        cx="46"
        cy="38"
        r="4.8"
        fill="currentColor"
        className={a.icon}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.9}
      />
      <path
        d="M20 44h24"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/70"
        strokeLinecap="round"
      />
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
      <motion.path
        d="M54 26v16"
        stroke="currentColor"
        strokeWidth="2.4"
        className={a.icon}
        strokeLinecap="round"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.95}
      />
      <motion.circle
        cx="54"
        cy="44"
        r="4.2"
        fill="currentColor"
        className={a.icon}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.9}
      />
    </svg>
  );
};

const IconPeopleNodes: FeatureItem["Icon"] = ({ className = "", accent = "amber" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M40.8 30.2a8 8 0 1 0-8-8 8 8 0 0 0 8 8Z"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/80"
      />
      <path
        d="M20.5 31.6a6.5 6.5 0 1 0-6.5-6.5 6.5 6.5 0 0 0 6.5 6.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/75"
      />
      <path
        d="M28 56v-3c0-6 4.9-10.8 10.8-10.8h2.3C47 42.2 52 47 52 53v3"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/70"
        strokeLinecap="round"
      />
      <path
        d="M12 56v-2.6c0-5 4-9.1 9.1-9.1h1.4"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/70"
        strokeLinecap="round"
      />
      <motion.circle
        cx="50"
        cy="14"
        r="3.5"
        fill="currentColor"
        className={a.icon}
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        opacity={0.9}
      />
      <motion.circle
        cx="14"
        cy="14"
        r="2.8"
        fill="currentColor"
        className={a.icon}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        opacity={0.85}
      />
      <path
        d="M17 16.4 28 24M47 16.4 36 24"
        stroke="currentColor"
        strokeWidth="2.2"
        className={a.icon}
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
};

const IconRadar: FeatureItem["Icon"] = ({ className = "", accent = "violet" }) => {
  const a = accentMap(accent);
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 56c13.3 0 24-10.7 24-24S45.3 8 32 8 8 18.7 8 32s10.7 24 24 24Z"
        stroke="currentColor"
        strokeWidth="2.4"
        className="text-white/80"
      />
      <path
        d="M32 18v14l10 10"
        stroke="currentColor"
        strokeWidth="2.6"
        className={a.icon}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M32 8c13.3 0 24 10.7 24 24"
        stroke="currentColor"
        strokeWidth="2.4"
        className={a.icon}
        strokeLinecap="round"
        initial={{ pathLength: 0.2, opacity: 0.35 }}
        animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.25, 0.75, 0.25] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <path
        d="M22 32h20"
        stroke="currentColor"
        strokeWidth="2.2"
        className="text-white/50"
        strokeLinecap="round"
      />
      <path
        d="M32 22v20"
        stroke="currentColor"
        strokeWidth="2.2"
        className="text-white/50"
        strokeLinecap="round"
      />
    </svg>
  );
};

/* ---------------- WOW Card (interactive) ---------------- */

function WowCard({
  accent,
  featured = false,
  children,
  className = "",
}: {
  accent: Accent;
  featured?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const a = useMemo(() => accentMap(accent), [accent]);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const px = (x / r.width) * 2 - 1;
    const py = (y / r.height) * 2 - 1;

    setPos({ x, y, active: true });
    setTilt({
      ry: clamp(px * 6, -6, 6),
      rx: clamp(-py * 4.5, -4.5, 4.5),
    });
  }

  function onLeave() {
    setPos((p) => ({ ...p, active: false }));
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        "group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-7",
        "ring-1 ring-transparent transition-all duration-300",
        "hover:-translate-y-1 hover:bg-white/[0.06] hover:shadow-[0_26px_120px_-70px_rgba(0,0,0,0.98)]",
        a.ring,
        className,
      ].join(" ")}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(460px circle at ${pos.x}px ${pos.y}px, ${a.spot}, transparent 55%)`,
          opacity: pos.active ? 1 : 0,
        }}
      />

      {/* glow blob */}
      <div
        className={`pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${a.glow}`}
      />

      {/* sheen */}
      <div
        className="pointer-events-none absolute -inset-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.14) 50%, transparent 65%)",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
        }}
      />

      {/* featured border */}
      {featured && (
        <div className="pointer-events-none absolute inset-0 rounded-[28px] p-px opacity-60">
          <div className={`h-full w-full rounded-[27px] bg-gradient-to-r ${a.stroke}`} />
        </div>
      )}

      {/* sparkles */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-6 top-6 h-1.5 w-1.5 rounded-full bg-white/70"
        animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.45, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute right-7 bottom-7 h-1.5 w-1.5 rounded-full bg-white/60"
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.35, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* base ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10" />

      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------------- NEW: spotlight + bento components ---------------- */

function FeatureSpotlight({ item }: { item: FeatureItem }) {
  const a = accentMap(item.accent);

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
      {/* premium background */}
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute -top-28 -right-28 h-96 w-96 rounded-full blur-3xl ${a.glow}`} />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        {/* Left */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
              Destacado
            </span>

            {item.chips.map((c) => (
              <span
                key={c}
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${a.chip}`}
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white leading-[1.12]">
              {item.title}
            </h3>
            <div className={`mt-3 h-px w-28 bg-gradient-to-r ${a.underline}`} />
          </div>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
            {item.desc}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {item.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-zinc-300">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                <span className="leading-6">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right visual */}
        <div className="relative">
          <motion.div
            variants={floaty(0.25)}
            initial="initial"
            animate="animate"
            className="relative mx-auto grid aspect-square w-full max-w-[320px] place-items-center rounded-[26px] border border-white/10 bg-white/5"
          >
            <div className={`pointer-events-none absolute -inset-10 rounded-[30px] blur-3xl ${a.glow}`} />
            <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-white/10" />

            <item.Icon className="h-24 w-24" accent={item.accent} />

            <motion.span
              className="pointer-events-none absolute left-8 top-8 h-1.5 w-1.5 rounded-full bg-white/70"
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="pointer-events-none absolute right-10 bottom-10 h-1.5 w-1.5 rounded-full bg-white/60"
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.35, 1] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ item }: { item: FeatureItem }) {
  const a = accentMap(item.accent);

  return (
    <WowCard accent={item.accent} className="h-full rounded-[24px] p-6 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <item.Icon className="h-7 w-7" accent={item.accent} />
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {item.chips.slice(0, 2).map((c) => (
            <span
              key={c}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${a.chip}`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] leading-tight text-white">
          {item.title}
        </h3>
        <div className={`mt-3 h-px w-20 bg-gradient-to-r ${a.underline}`} />
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-300">{item.desc}</p>

      <ul className="mt-5 space-y-2 text-sm text-zinc-400">
        {item.points.slice(0, 2).map((p) => (
          <li key={p} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
            <span className="leading-6">{p}</span>
          </li>
        ))}
      </ul>

      <div className="pointer-events-none mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </WowCard>
  );
}

function ProofPill({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-white">
        {title}
      </p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}

/* ---------------- SECTION ---------------- */

export default function Features() {
  const items: FeatureItem[] = [
    {
      title: "Cumplimiento SG-SST con evidencia",
      desc: "Organizamos el sistema para que sea verificable: estructura documental, plan de trabajo, indicadores y soportes listos para auditoría.",
      points: [
        "Política, objetivos, plan anual y seguimiento",
        "Indicadores, desviaciones y mejora continua",
        "Evidencias organizadas y control de versiones",
      ],
      chips: ["Decreto 1072", "Res. 0312", "Auditoría"],
      Icon: IconShieldPlus,
      accent: "cyan",
      featured: true,
    },
    {
      title: "Inspecciones y planes de acción",
      desc: "Criterios claros, evidencia, responsables y cierre controlado para reducir incidentes y cumplir con lo planificado.",
      points: [
        "Listas por riesgo: locativo, eléctrico, mecánico…",
        "Registro de hallazgos con soporte fotográfico",
        "Cierre y verificación de acciones",
      ],
      chips: ["Hallazgos", "Trazabilidad", "Cierre"],
      Icon: IconChecklist,
      accent: "fuchsia",
    },
    {
      title: "Capacitación y cultura preventiva",
      desc: "Plan anual con ejecución real: contenidos, evaluación, asistencia y soportes. Refuerzos conductuales para hábitos seguros.",
      points: [
        "Priorización por matriz de peligros",
        "Materiales, evaluación y asistencia",
        "Refuerzos: orden, limpieza y autocuidado",
      ],
      chips: ["Plan anual", "Evaluación", "Evidencia"],
      Icon: IconCap,
      accent: "emerald",
    },
    {
      title: "Comités COPASST / CCL",
      desc: "Actas, compromisos y seguimiento sin improvisación. Control del cronograma, trazabilidad y reportes ejecutivos.",
      points: [
        "Actas con estructura estándar",
        "Seguimiento a compromisos y cronogramas",
        "Informes y rendición de cuentas",
      ],
      chips: ["Actas", "Compromisos", "Seguimiento"],
      Icon: IconPeopleNodes,
      accent: "amber",
    },
    {
      title: "Gestión de riesgos e indicadores",
      desc: "Priorizamos lo crítico y lo hacemos medible: matriz de peligros, seguimiento a indicadores y alertas para decisiones oportunas.",
      points: [
        "Priorización por impacto y exposición",
        "KPIs: cumplimiento, incidentes, cierre de acciones",
        "Tablero de seguimiento y control",
      ],
      chips: ["Matriz", "KPIs", "Control"],
      Icon: IconRadar,
      accent: "violet",
    },
  ];

  const spotlight = items.find((i) => i.featured) ?? items[0];
  const rest = items.filter((i) => i.title !== spotlight.title);

  return (
    <section id="features" className="px-6">
      <div className="mx-auto max-w-6xl py-16 sm:py-20">
        {/* Header editorial */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            Qué hace SIS
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl leading-[1.08] tracking-[-0.02em] text-white font-semibold">
            Un SG-SST que se entiende, se ejecuta y se sostiene
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
            Acompañamiento técnico + control de ejecución + evidencia organizada para que el
            cumplimiento sea real (y verificable).
          </p>
        </motion.div>

        {/* Spotlight */}
        <div className="mt-10">
          <FeatureSpotlight item={spotlight} />
        </div>

        {/* Bento grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((it, idx) => (
            <motion.div
              key={it.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.03 * idx }}
              className="h-full"
            >
              <FeatureCard item={it} />
            </motion.div>
          ))}
        </div>

        {/* Proof row */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <ProofPill title="Evidencia lista" desc="Soportes organizados, trazables y auditables." />
          <ProofPill title="Ejecución controlada" desc="Responsables, fechas y cierre verificable." />
          <ProofPill title="Sistema sostenible" desc="No es “hacer por cumplir”: se mantiene en el tiempo." />
        </div>
      </div>
    </section>
  );
}
