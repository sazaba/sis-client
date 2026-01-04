"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// ✅ IMPORTS (Vite los resuelve como string URL)
import evidenciaImg from "../../../gallery/evidencia.webp";
import inspeccionesImg from "../../../gallery/inspecciones.webp";
import planTrabajoImg from "../../../gallery/plan-trabajo.webp";
import comitesImg from "../../../gallery/comites.webp";
import capacitacionImg from "../../../gallery/capacitacion.webp";

type Slide = {
  title: string;
  desc: string;
  src: string;
  tag?: string;
};

export default function GalleryCarousel() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: "Evidencia organizada",
        desc: "Soportes listos para auditoría: trazables, consistentes y fáciles de verificar.",
        src: evidenciaImg,
        tag: "Documentación",
      },
      {
        title: "Inspecciones con criterios",
        desc: "Hallazgos claros + plan de acción con cierre verificable y evidencia fotográfica.",
        src: inspeccionesImg,
        tag: "Inspecciones",
      },
      {
        title: "Plan de trabajo con seguimiento",
        desc: "Actividades, responsables y estado en un solo lugar. Avance visible y medible.",
        src: planTrabajoImg,
        tag: "Planeación",
      },
      {
        title: "Comités sin improvisación",
        desc: "Actas, compromisos, seguimiento y reportes ejecutivos sin perder trazabilidad.",
        src: comitesImg,
        tag: "COPASST / CCL",
      },
      {
        title: "Capacitación con soporte",
        desc: "Asistencia, evaluación, materiales y evidencias por tema. Todo respaldado.",
        src: capacitacionImg,
        tag: "Cultura",
      },
    ],
    []
  );

  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setI((v) => (v + 1) % slides.length);

  // Preload del siguiente (reduce tirones en mobile)
  useEffect(() => {
    const nextIdx = (i + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIdx].src;
  }, [i, slides]);

  // Autoplay
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => next(), 4200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover]);

  return (
    <section id="galeria" className="px-6">
      <div className="mx-auto max-w-6xl py-16 sm:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            Evidencias / Casos
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl leading-[1.08] tracking-[-0.02em] text-white font-semibold">
            Lo que entregamos se ve (y se audita)
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
            Un vistazo a cómo se ve el sistema cuando está bien armado: orden, trazabilidad y soportes consistentes.
          </p>
        </div>

        {/* Frame: MUY LIGHT (sin blur, sin grid background) */}
        <div
          className="relative mt-10 overflow-hidden rounded-[22px] border border-white/10 bg-zinc-950/35"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onTouchStart={() => setHover(true)}
          onTouchEnd={() => setHover(false)}
        >
          <div className="relative p-3 sm:p-4">
            <SwipeDeck
              index={i}
              slides={slides}
              onPrev={prev}
              onNext={next}
              onHold={(v) => setHover(v)}
            />

            {/* Controls */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Ir al slide ${idx + 1}`}
                    className={[
                      "h-2.5 rounded-full border border-white/10 transition",
                      idx === i ? "w-8 bg-white/60" : "w-2.5 bg-white/15 hover:bg-white/25",
                    ].join(" ")}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="inline-flex h-10 items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  ← Anterior
                </button>

                <button
                  onClick={next}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 hover:opacity-95 transition"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/**
 * SwipeDeck (ultra light)
 * - renderiza 1 slide visible
 * - “capa” de transición con translate3d
 * - swipe táctil sin framer
 */
function SwipeDeck({
  index,
  slides,
  onPrev,
  onNext,
  onHold,
}: {
  index: number;
  slides: Slide[];
  onPrev: () => void;
  onNext: () => void;
  onHold: (v: boolean) => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const startX = useRef(0);
  const dx = useRef(0);
  const dragging = useRef(false);

  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);

  const thresholdPx = useRef(70);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      thresholdPx.current = Math.max(60, w * 0.14);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const onPointerDown = (e: React.PointerEvent) => {
    if (!wrapRef.current) return;
    dragging.current = true;
    setAnimating(false);
    onHold(true);

    startX.current = e.clientX;
    dx.current = 0;
    setOffset(0);

    // Captura pointer para consistencia en mobile
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dx.current = e.clientX - startX.current;

    // Limita arrastre para que no “rompa” FPS en mobile
    const limited = clamp(dx.current, -220, 220);
    setOffset(limited);
  };

  const settle = (dir: "next" | "prev" | "stay") => {
    if (!wrapRef.current) return;
    const w = wrapRef.current.getBoundingClientRect().width;

    setAnimating(true);

    if (dir === "next") {
      // anima hacia izquierda y luego cambia slide
      setOffset(-w);
      window.setTimeout(() => {
        setAnimating(false);
        setOffset(0);
        onNext();
      }, 220);
      return;
    }

    if (dir === "prev") {
      setOffset(w);
      window.setTimeout(() => {
        setAnimating(false);
        setOffset(0);
        onPrev();
      }, 220);
      return;
    }

    // volver al centro
    setOffset(0);
    window.setTimeout(() => setAnimating(false), 220);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    onHold(false);

    const t = thresholdPx.current;

    if (dx.current < -t) settle("next");
    else if (dx.current > t) settle("prev");
    else settle("stay");
  };

  const s = slides[index];

  return (
    <div ref={wrapRef} className="relative overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
      <div
        className={[
          "will-change-transform select-none touch-pan-y",
          animating ? "transition-transform duration-200 ease-[cubic-bezier(.22,1,.36,1)]" : "",
        ].join(" ")}
        style={{
          transform: `translate3d(${offset}px, 0, 0)`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <SlideCard slide={s} />
      </div>

      {/* hint */}
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-white/80">
        Desliza ↔
      </div>
    </div>
  );
}

function SlideCard({ slide }: { slide: Slide }) {
  return (
    <div className="grid md:grid-cols-[1.12fr_0.88fr]">
      {/* Imagen */}
      <div className="relative">
        <div className="relative aspect-square md:aspect-auto md:min-h-[420px] bg-black/10">
          <img
            src={slide.src}
            alt={slide.title}
            className="h-full w-full object-contain p-2 sm:p-3 md:p-4"
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {slide.tag && (
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-white/85">
                {slide.tag}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Texto */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white">
          {slide.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
          {slide.desc}
        </p>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
        <p className="mt-4 text-xs sm:text-sm text-zinc-400">
          Evidencia real, ordenada y lista para auditoría.
        </p>
      </div>
    </div>
  );
}
