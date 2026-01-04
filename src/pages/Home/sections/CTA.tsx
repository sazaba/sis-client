import React from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

const REVEAL_TRANSITION = { duration: 0.35, ease: "easeOut" } as const;

export default function CTA() {
  const reduce = useReducedMotion();

  return (
    <section id="contacto" className="px-6">
      <div className="mx-auto max-w-6xl py-12 sm:py-16">
        <LazyMotion features={domAnimation}>
          <m.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={REVEAL_TRANSITION}
            className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035]"
          >
            {/* Background (GPU-friendly) */}
            <div className="pointer-events-none absolute inset-0">
              {/* En móvil: blur menor. En sm+: vuelve a blur fuerte */}
              <div className="absolute -top-24 -left-24 h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-cyan-500/14 blur-2xl sm:blur-3xl" />
              <div className="absolute -bottom-28 -right-24 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-fuchsia-500/12 blur-2xl sm:blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-zinc-950/55" />
            </div>

            <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              {/* Left */}
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

                <div className="mt-5 flex flex-wrap gap-2">
                  <MiniTag>24–48h respuesta</MiniTag>
                  <MiniTag>Accionable</MiniTag>
                  <MiniTag>Trazable</MiniTag>
                </div>
              </div>

              {/* Right */}
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 rounded-[26px] bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-70 blur-xl sm:blur-2xl" />

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
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field name="name" placeholder="Nombre" autoComplete="name" />
                      <Field
                        name="phone"
                        placeholder="WhatsApp"
                        autoComplete="tel"
                        inputMode="tel"
                        type="tel"
                      />
                    </div>

                    <Field
                      name="company"
                      placeholder="Empresa (opcional)"
                      autoComplete="organization"
                    />

                    <div className="mt-1 grid gap-3 sm:grid-cols-2">
                      {/* Botones sin Framer (más rápido en móvil) */}
                      <button
                        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition
                                   hover:opacity-95 active:scale-[0.98] active:translate-y-[1px]"
                        type="submit"
                      >
                        Solicitar
                      </button>

                      <a
                        href="#features"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white
                                   transition hover:bg-white/10 active:scale-[0.99]"
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
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}

/* --------- tiny components (memoized) --------- */

const Field = React.memo(function Field({
  name,
  placeholder,
  autoComplete,
  type = "text",
  inputMode,
}: {
  name: string;
  placeholder: string;
  autoComplete?: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <input
      name={name}
      autoComplete={autoComplete}
      placeholder={placeholder}
      type={type}
      inputMode={inputMode}
      className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-zinc-500 outline-none transition
                 focus:border-white/20 focus:bg-white/10"
    />
  );
});

const MiniTag = React.memo(function MiniTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
      {children}
    </span>
  );
});
