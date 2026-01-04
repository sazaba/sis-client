export default function Hero() {
  return (
      <section
      id="hero"
      className="relative px-6 overflow-hidden bg-zinc-950"
      style={{ paddingTop: "var(--nav-h, 76px)" }} // 👈 exacto al pixel
    >
      {/* 🌿 Glow verde decorativo */}
      <div className="pointer-events-none absolute inset-0">
        {/* Mancha verde principal */}
        <div className="absolute -top-32 left-1/2 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-500/25 blur-3xl" />
        {/* Refuerzo lateral */}
        <div className="absolute -top-40 -left-32 h-[360px] w-[360px] rounded-full bg-emerald-400/20 blur-3xl" />
        {/* Fade inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="relative mx-auto max-w-6xl pb-14 sm:pb-16 pt-10 sm:pt-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            SIS · Seguridad y Salud en el Trabajo
          </p>

          <h1 className="font-heading mt-5 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-white font-semibold">
            Gestión del SG-SST clara, ordenada
            <br className="hidden sm:block" />
            y con evidencia real.
          </h1>

          <p className="mt-6 max-w-xl font-body text-base sm:text-lg leading-relaxed text-zinc-300">
            Acompañamos a las empresas en la implementación, seguimiento y mejora
            del Sistema de Gestión en Seguridad y Salud en el Trabajo, cumpliendo
            con la normativa y fortaleciendo la prevención.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
            >
              Solicitar asesoría
            </a>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              Conocer servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
