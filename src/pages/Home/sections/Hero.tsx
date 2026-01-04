export default function Hero() {
  return (
    <section
      className="
        px-6
        pt-[72px]   /* 👈 altura del navbar (ajusta a 64/72/80 según tu header) */
        pb-16 sm:pb-20
        bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent
      "
    >
      <div className="mx-auto max-w-6xl py-14 sm:py-16">
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
