import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          {/* Logo circular */}
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]">
            <img
              src="/logosis.jpg"
              alt="SIS Riesgos Laborales"
              className="h-full w-full object-contain"
            />
          </span>

          {/* Texto */}
          <span className="text-sm font-semibold tracking-tight text-white">
            SIS <span className="text-zinc-400">Riesgos Laborales</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 sm:flex">
          <a className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#features">
            Contenido
          </a>
          <a className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#bonos">
            Bonos
          </a>
          <a className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#testimonios">
            Testimonios
          </a>
          <a className="text-sm font-medium text-zinc-400 hover:text-white transition-colors" href="#faq">
            FAQ
          </a>

          <NavLink
            to="/"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90 transition"
          >
            Comprar ahora
          </NavLink>
        </nav>

        {/* Mobile */}
        <button className="sm:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition">
          Menú
        </button>
      </div>
    </header>
  );
}
