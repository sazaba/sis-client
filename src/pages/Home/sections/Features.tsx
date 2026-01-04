import { memo } from "react";

type FeatureItem = {
  title: string;
  desc: string;
};

const ITEMS: FeatureItem[] = [
  {
    title: "Cumplimiento SG-SST",
    desc: "Documentos, plan anual y soportes listos para auditoría.",
  },
  {
    title: "Inspecciones",
    desc: "Hallazgos claros, responsables y cierre verificable.",
  },
  {
    title: "Capacitación",
    desc: "Plan anual con asistencia, evaluación y evidencia.",
  },
  {
    title: "COPASST / CCL",
    desc: "Actas, compromisos y seguimiento real.",
  },
  {
    title: "Riesgos e indicadores",
    desc: "Priorización y KPIs para decisiones oportunas.",
  },
];

const FeatureCard = memo(function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <li className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-5 ring-1 ring-white/5 transition-colors hover:bg-white/[0.07]">
      {/* subtle top sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-70" />

      {/* tiny accent dot */}
      <div className="relative flex items-start gap-3">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-white/70 opacity-70" />

        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[-0.01em] text-white">
            {title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            {desc}
          </p>
        </div>
      </div>

      {/* bottom divider */}
      <div className="pointer-events-none mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </li>
  );
});

export default function Features() {
  return (
    <section id="features" className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Qué hace SIS
          </p>

          <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white">
            Un SG-SST que sí funciona
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
            Acompañamiento técnico, ejecución real y evidencia verificable.
          </p>
        </div>

        <ul className="mt-7 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <FeatureCard key={it.title} title={it.title} desc={it.desc} />
          ))}
        </ul>

        {/* micro proof row (lightweight, optional but premium) */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <ProofMini kpi="Evidencia lista" label="Soportes auditables y trazables." />
          <ProofMini kpi="Cierre real" label="Acciones con responsable y verificación." />
          <ProofMini kpi="Sostenible" label="No es cumplir una vez: se mantiene." />
        </div>
      </div>
    </section>
  );
}

function ProofMini({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
      <p className="text-sm font-semibold text-white">{kpi}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </div>
  );
}
