export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      {/* subtle divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="px-6">
        <div className="mx-auto max-w-6xl py-10 sm:py-12">
          {/* Main row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Brand */}
            <div className="max-w-md">
              <p className="text-sm font-semibold tracking-tight text-white">
                SIS <span className="text-zinc-400">Riesgos Laborales</span>
              </p>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                SG-SST claro, ejecutable y con evidencia lista para auditoría.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contacto"
                className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 transition hover:opacity-90"
              >
                Agendar asesoría
              </a>

              <a
                href="#features"
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              © {year} SIS Riesgos Laborales
            </p>

            <div className="flex gap-5 text-xs text-zinc-500">
              <a href="#legal" className="hover:text-white transition-colors">
                Términos
              </a>
              <a href="#legal" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#contacto" className="hover:text-white transition-colors">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
