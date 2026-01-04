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

export default function Features() {
  return (
    <section id="features" className="px-4">
      <div className="mx-auto max-w-5xl py-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Un SG-SST que sí funciona
        </h2>

        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          Acompañamiento técnico, ejecución real y evidencia verificable.
        </p>

        <ul className="mt-6 grid gap-3">
          {ITEMS.map((it) => (
            <li
              key={it.title}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="font-semibold text-white text-sm">
                {it.title}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                {it.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
