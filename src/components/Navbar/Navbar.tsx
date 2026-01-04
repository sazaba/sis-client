import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { href: "#hero", label: "Inicio" },
  { href: "#galeria", label: "Galería" },
  { href: "#features", label: "Servicios" },
  { href: "#cta", label: "Contacto" },
];

export default function Navbar() {
  const headerRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  // ✅ Medir altura real del navbar y guardarla en CSS var
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setVar = () => {
      const h = Math.round(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };

    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  // ✅ ESC para cerrar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ Bloquea scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ✅ Cierra al cambiar a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);
  const toggle = () => setOpen((v) => !v);

  // ✅ Smooth scroll + compensa el navbar con la CSS var real
  const go = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    close();

    const navH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-h") || "76",
      10
    );

    const top = el.getBoundingClientRect().top + window.scrollY - (isNaN(navH) ? 76 : navH);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-zinc-950"
      >
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
            {NAV_ITEMS.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={go(it.href)}
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
              >
                {it.label}
              </a>
            ))}

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
      </header>

      {/* ✅ FULLSCREEN MOBILE MENU (100% viewport, sin transparencias) */}
      <div
        id="mobile-menu"
        className={[
          "sm:hidden fixed inset-0 z-[60]",
          "transform-gpu will-change-transform",
          "transition-[opacity,transform] duration-200 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none",
        ].join(" ")}
        style={{
          // ✅ fondo sólido premium (sin transparencias)
          background:
            "radial-gradient(900px 500px at 50% -10%, rgba(16,185,129,0.18) 0%, rgba(9,9,11,1) 52%), linear-gradient(180deg, rgba(9,9,11,1) 0%, rgba(9,9,11,1) 100%)",
        }}
      >
        {/* Top bar del menú */}
        <div className="px-6 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 overflow-hidden">
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
            </div>

            <button
              onClick={close}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white hover:bg-white/10 transition active:scale-[0.98]"
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Links */}
        <div className="px-6 pt-6">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Navegación</p>

          <div className="mt-4 grid gap-3">
            {NAV_ITEMS.map((it) => (
              <a
                key={it.href}
                href={it.href}
                onClick={go(it.href)}
                className="group flex items-center justify-between rounded-2xl border border-white/12 bg-white/[0.06] px-5 py-5 transition active:scale-[0.99] hover:bg-white/[0.09]"
              >
                <span className="text-base font-semibold text-white">{it.label}</span>
                <span className="text-zinc-300 group-hover:text-white transition">→</span>
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-6 grid gap-3">
            <NavLink
              to="/"
              onClick={close}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-zinc-950 hover:opacity-95 transition active:scale-[0.99]"
            >
              Comprar ahora
            </NavLink>

            <a
              href="#cta"
              onClick={go("#cta")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition active:scale-[0.99]"
            >
              Solicitar asesoría
            </a>
          </div>

          <p className="mt-5 text-xs text-zinc-500">
            Toca <span className="text-zinc-300">✕</span> o presiona{" "}
            <span className="text-zinc-300">ESC</span> para cerrar.
          </p>
        </div>
      </div>
    </>
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
