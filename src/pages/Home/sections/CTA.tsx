import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="contacto" className="px-6">
      <div className="mx-auto max-w-6xl py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04]"
        >
          {/* Background (premium) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />
            <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-cyan-500/16 blur-3xl" />
            <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/14 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/50" />
          </div>

          {/* Content */}
          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
            {/* Left: Offer / Copy */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Badge */}
                <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                  Asesoría inicial • Diagnóstico rápido
                </p>

                {/* Headline */}
                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl leading-[1.06]">
                  Te decimos exactamente qué falta para cumplir (y cómo cerrarlo con evidencia).
                </h2>

                {/* Subcopy */}
                <p className="mt-4 text-base leading-relaxed text-zinc-300">
                  Revisamos tu estado actual del SG-SST y te proponemos un plan accionable con
                  prioridades, responsables y soportes. Sin humo: lo que se ejecuta, se mide y se demuestra.
                </p>

                {/* Mini list (value) */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <ValueItem title="Checklist real" desc="Hallazgos claros y prioridades por impacto." />
                  <ValueItem title="Plan de cierre" desc="Responsables, fechas y verificación." />
                  <ValueItem title="Evidencia lista" desc="Documentos y soportes consistentes." />
                  <ValueItem title="Rumbo claro" desc="Qué hacer primero, segundo y tercero." />
                </div>

                {/* Chips */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Inspecciones", "Capacitaciones", "Comités", "Documentación", "Plan de trabajo"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm text-zinc-400">
                  Si ya tienes documentos, los revisamos y ajustamos para que queden consistentes y listos para auditoría.
                </p>
              </div>

              {/* Micro proof row */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <ProofMini kpi="24–48h" label="Respuesta" />
                <ProofMini kpi="100%" label="Trazable" />
                <ProofMini kpi="0 humo" label="Accionable" />
              </div>
            </div>

            {/* Right: Form (ultra premium) */}
            <div className="relative">
              {/* outer glow */}
              <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70 blur-2xl" />

              <div className="relative h-full rounded-[28px] border border-white/10 bg-zinc-950/40 p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] text-white">
                      Agenda tu asesoría
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      Déjanos tus datos y te contactamos para agendar y entender tu necesidad.
                    </p>
                  </div>

                  {/* Decorative dot */}
                  <motion.span
                    aria-hidden="true"
                    className="mt-1 h-2 w-2 rounded-full bg-white/70"
                    animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.45, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Divider */}
                <div className="pointer-events-none mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <form
                  className="mt-5 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // conecta a tu backend / whatsapp / email
                  }}
                >
                  <Field label="Nombre" name="name" placeholder="Tu nombre" autoComplete="name" />
                  <Field label="WhatsApp" name="phone" placeholder="+57 3XX XXX XXXX" autoComplete="tel" />
                  <Field
                    label="Empresa (opcional)"
                    name="company"
                    placeholder="Nombre de la empresa"
                    autoComplete="organization"
                  />

                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:opacity-95"
                      type="submit"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent animate-[shimmer_2.4s_infinite]" />
                      Solicitar asesoría
                    </motion.button>

                    <a
                      href="#features"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      Ver servicios
                    </a>
                  </div>

                  <p className="mt-2 text-xs text-zinc-500">
                    Al enviar, aceptas ser contactado para fines de asesoría. No spam.
                  </p>
                </form>

                {/* bottom micro accent */}
                <div className="pointer-events-none mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="mt-4 text-xs text-zinc-500">
                  Tip: Si ya cuentas con Plan de Trabajo, Matriz y Actas, tráelas. Te damos un diagnóstico más rápido.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="pointer-events-none relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* shimmer keyframes */}
          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(120%); }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- small components ---------------- */

function Field({
  label,
  name,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-semibold text-zinc-300">{label}</span>
      <input
        className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-white/20 focus:bg-white/10 transition"
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
      />
    </label>
  );
}

function ValueItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-white">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-zinc-400">{desc}</p>
    </div>
  );
}

function ProofMini({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-white">{kpi}</p>
      <p className="mt-1 text-xs text-zinc-400">{label}</p>
    </div>
  );
}
  