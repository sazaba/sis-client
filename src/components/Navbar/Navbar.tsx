import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ✅ ESC para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ Bloquea scroll del body cuando está abierto (mejor UX móvil)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ✅ Cierra al cambiar tamaño a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]">
            <img
              src="/logosis.jpg"
              alt="SIS Riesgos Laborales"
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </span>

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

        {/* Mobile button */}
        <button
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="sm:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition active:scale-[0.98]"
        >
          <span className="mr-2">Menú</span>
          <HamburgerIcon open={open} />
        </button>
      </div>

      {/* ✅ Mobile Menu (Ultra premium, ultra light) */}
      {/* Overlay */}
      <div
        className={[
          "sm:hidden fixed inset-0 z-40",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div
          className={[
            "absolute inset-0 bg-black/60",
            "transition-opacity duration-200 ease-out",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={close}
        />
      </div>

      {/* Panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={[
          "sm:hidden fixed left-0 right-0 top-0 z-50",
          "pt-[76px] px-4 pb-6", // ⬅️ separa del header fijo
          "transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
          "will-change-transform transform-gpu",
          open ? "translate-y-0" : "-translate-y-[110%]",
        ].join(" ")}
        style={{
          // ✅ panel "glass" premium pero liviano (sin blur pesado interno)
          background:
            "linear-gradient(180deg, rgba(9,9,11,0.92) 0%, rgba(9,9,11,0.78) 60%, rgba(9,9,11,0.70) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-zinc-400">
              Navegación
            </span>

            <button
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition active:scale-[0.98]"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          {/* Items */}
          <div className="mt-4 grid gap-2">
            <MobileItem href="#features" label="Contenido" onPick={close} />
            <MobileItem href="#bonos" label="Bonos" onPick={close} />
            <MobileItem href="#testimonios" label="Testimonios" onPick={close} />
            <MobileItem href="#faq" label="FAQ" onPick={close} />
          </div>

          {/* CTA */}
          <div className="mt-5 grid gap-3">
            <NavLink
              to="/"
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 hover:opacity-95 transition active:scale-[0.99]"
            >
              Comprar ahora
            </NavLink>

            <a
              href="#contacto"
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition active:scale-[0.99]"
            >
              Solicitar asesoría
            </a>
          </div>

          {/* Footer hint */}
          <p className="mt-4 text-xs text-zinc-500">
            Tip: toca fuera del panel o presiona <span className="text-zinc-300">ESC</span> para cerrar.
          </p>
        </div>
      </div>
    </header>
  );
}

function MobileItem({
  href,
  label,
  onPick,
}: {
  href: string;
  label: string;
  onPick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onPick}
      className={[
        "group flex items-center justify-between",
        "rounded-2xl border border-white/10 bg-white/[0.04]",
        "px-4 py-4",
        "transition active:scale-[0.99] hover:bg-white/[0.07]",
      ].join(" ")}
    >
      <span className="text-sm font-semibold text-white">{label}</span>
      <span className="text-zinc-400 group-hover:text-white transition">→</span>
    </a>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative inline-flex h-4 w-5 items-center justify-center">
      <span
        className={[
          "absolute h-[2px] w-5 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-y-0 rotate-45" : "-translate-y-[6px] rotate-0",
        ].join(" ")}
      />
      <span
        className={[
          "absolute h-[2px] w-5 rounded-full bg-white transition-opacity duration-150",
          open ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute h-[2px] w-5 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-y-0 -rotate-45" : "translate-y-[6px] rotate-0",
        ].join(" ")}
      />
    </span>
  );
}
