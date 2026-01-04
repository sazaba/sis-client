export default function CTA() {
  return (
    <section id="contacto" className="px-4">
      <div className="mx-auto max-w-5xl py-10">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 sm:p-8">
          {/* Copy */}
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-zinc-400">
              Diagnóstico rápido SG-SST
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white leading-tight">
              Te decimos qué falta y cómo cerrarlo
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Plan claro, prioridades y evidencia lista para auditoría.
            </p>
          </div>

          {/* Form */}
          <form
            className="mt-5 grid gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              placeholder="Nombre"
              className="h-11 rounded-xl bg-white/5 px-4 text-sm text-white outline-none"
            />
            <input
              placeholder="WhatsApp"
              className="h-11 rounded-xl bg-white/5 px-4 text-sm text-white outline-none"
            />
            <input
              placeholder="Empresa (opcional)"
              className="h-11 rounded-xl bg-white/5 px-4 text-sm text-white outline-none"
            />

            <button className="h-11 rounded-full bg-white text-sm font-semibold text-zinc-950">
              Solicitar asesoría
            </button>

            <p className="text-[11px] text-zinc-500">
              Sin spam. Solo contacto para agendar.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
