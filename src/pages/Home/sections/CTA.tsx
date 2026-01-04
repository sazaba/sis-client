import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section id="contacto" className="px-6">
      <div className="mx-auto max-w-6xl py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[26px] border border-white/10 bg-zinc-950/80"
        >
          {/* DECORATIVO DESKTOP */}
          <div
            data-mobile="off"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
          </div>

          <div
            data-mobile="simple"
            className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* Copy */}
            <div>
              <p className="text-xs font-semibold text-zinc-400">
                Diagnóstico SG-SST
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl font-semibold text-white leading-tight">
                Te decimos exactamente qué falta y cómo cerrarlo
              </h2>

              <p className="mt-3 text-sm sm:text-base text-zinc-400">
                Sin vueltas. Sin humo. Con evidencia verificable.
              </p>

              <div className="mt-4 flex gap-2 flex-wrap">
                <Tag>24–48h</Tag>
                <Tag>Accionable</Tag>
                <Tag>Trazable</Tag>
              </div>
            </div>

            {/* Form */}
            <form className="grid gap-3">
              <Input placeholder="Nombre" />
              <Input placeholder="WhatsApp" />
              <Input placeholder="Empresa (opcional)" />

              <button className="h-11 rounded-full bg-white text-sm font-semibold text-zinc-950">
                Solicitar asesoría
              </button>

              <p className="text-[11px] text-zinc-500">
                Solo contacto para agendar. No spam.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none focus:border-white/20"
    />
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-300">
      {children}
    </span>
  );
}
