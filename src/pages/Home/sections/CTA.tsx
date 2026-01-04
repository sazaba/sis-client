import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="contacto" className="px-6">
      <div className="mx-auto max-w-6xl py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035]"
        >
          {/* Background (lightweight) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/14 blur-3xl" />
            <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-zinc-950/55" />
          </div>

          <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            {/* Left (short copy) */}
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                Diagnóstico rápido
              </p>

              <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-white leading-[1.08]">
                Te decimos qué falta y cómo cerrarlo con evidencia.
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-300">
                Plan claro, prioridades y soporte listo para auditoría. Sin vueltas.
              </p>

              {/* compact proof */}
              <div className="mt-5 flex flex-wrap gap-2">
                <MiniTag>24–48h respuesta</MiniTag>
                <MiniTag>Accionable</MiniTag>
                <MiniTag>Trazable</MiniTag>
              </div>
            </div>

            {/* Right (compact form) */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[26px] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70 blur-2xl" />

              <div className="relative rounded-[22px] border border-white/10 bg-zinc-950/35 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-base sm:text-lg font-semibold tracking-[-0.01em] text-white">
                    Agenda tu asesoría
                  </h3>
                  <span className="h-2 w-2 rounded-full bg-white/70 opacity-70" />
                </div>

                <p className="mt-2 text-xs sm:text-sm text-zinc-400">
                  Déjanos tus datos y te contactamos por WhatsApp.
                </p>

                <div className="pointer-events-none mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <form
                  className="mt-4 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    // conecta a tu backend / whatsapp / email
                  }}
                >
                  {/* 2 cols desde sm para que no se vea eterno */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field name="name" placeholder="Nombre" autoComplete="name" />
                    <Field name="phone" placeholder="WhatsApp" autoComplete="tel" />
                  </div>

                  <Field
                    name="company"
                    placeholder="Empresa (opcional)"
                    autoComplete="organization"
                  />

                  <div className="mt-1 grid gap-3 sm:grid-cols-2">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:opacity-95"
                      type="submit"
                    >
                      Solicitar
                    </motion.button>

                    <a
                      href="#features"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      Ver servicios
                    </a>
                  </div>

                  <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                    Sin spam. Solo contacto para agendar.
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="pointer-events-none relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

/* --------- tiny components (minimal) --------- */

function Field({
  name,
  placeholder,
  autoComplete,
}: {
  name: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <input
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-white/20 focus:bg-white/10"
    />
  );
}

function MiniTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
      {children}
    </span>
  );
}
