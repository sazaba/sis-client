export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      {/* top glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="px-6">
        <div className="mx-auto max-w-6xl py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="text-sm font-semibold text-white tracking-tight font-sans">
                SIS <span className="text-zinc-400">Riesgos Laborales</span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Consultoría y acompañamiento en Seguridad y Salud en el Trabajo
                (SG-SST). Evidencia, trazabilidad y cumplimiento normativo.
              </p>

              <div className="mt-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
                SG-SST • Inspecciones • Capacitaciones • Comités
              </div>
            </div>

            {/* Servicios */}
            <div>
              <h3 className="text-sm font-semibold text-white">Servicios</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li>
                  <a className="hover:text-white transition-colors" href="#features">
                    Implementación SG-SST
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#features">
                    Inspecciones y verificaciones
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#features">
                    Capacitaciones SST
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#features">
                    Soporte a comités (COPASST/CCL)
                  </a>
                </li>
              </ul>
            </div>

            {/* Recursos */}
            <div>
              <h3 className="text-sm font-semibold text-white">Recursos</h3>
              <ul className="mt-4 space-y-3 text-sm text-zinc-400">
                <li>
                  <a className="hover:text-white transition-colors" href="#faq">
                    Preguntas frecuentes
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#contenido">
                    Metodología
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#testimonios">
                    Casos / Testimonios
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition-colors" href="#contacto">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-sm font-semibold text-white">Hablemos</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Agenda una demo o solicita una asesoría inicial. Respuesta rápida
                y enfoque técnico.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
                >
                  Agendar demo
                </a>

                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  Solicitar asesoría
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-zinc-500">
              © {year} SIS Riesgos Laborales. Todos los derechos reservados.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500">
              <a className="hover:text-white transition-colors" href="#legal">
                Términos
              </a>
              <a className="hover:text-white transition-colors" href="#legal">
                Privacidad
              </a>
              <a className="hover:text-white transition-colors" href="#contacto">
                Soporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
