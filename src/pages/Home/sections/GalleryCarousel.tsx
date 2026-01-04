"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";

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

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [vw, setVw] = useState(0);

  // ✅ MotionValue para mover el track con mejor FPS
  const x = useMotionValue(0);

  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setI((v) => (v + 1) % slides.length);

  // ✅ Medimos ancho real del viewport
  useEffect(() => {
    if (!viewportRef.current) return;
    const el = viewportRef.current;

    const update = () => setVw(el.getBoundingClientRect().width);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  // ✅ Animación optimizada al cambiar slide / resize
  const goTo = (idx: number, instant = false) => {
    const target = -idx * vw;
    x.stop?.();

    animate(x, target, {
      type: "tween",
      duration: instant ? 0 : 0.24, // ⚡ más rápida
      ease: [0.22, 1, 0.36, 1],
    });
  };

  useEffect(() => {
    if (!vw) return;
    // en resize mejor instant para evitar saltos raros
    goTo(i, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vw]);

  useEffect(() => {
    if (!vw) return;
    goTo(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  // ✅ Autoplay (un poco más ágil)
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => next(), 4200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hover, slides.length]);

  // ✅ Umbral swipe más natural
  const swipeThreshold = Math.max(60, vw * 0.14);

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
            Un vistazo a cómo se ve el sistema cuando está bien armado: orden,
            trazabilidad y soportes consistentes.
          </p>
        </div>

        {/* Frame */}
        <div
          className="relative mt-10 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.035]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* Background premium (menos pesado para rendimiento) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-zinc-950/55" />
            <div className="absolute -top-24 left-1/2 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -top-28 -left-28 h-[380px] w-[420px] rounded-full bg-cyan-500/14 blur-3xl" />
            <div className="absolute -bottom-28 -right-28 h-[380px] w-[460px] rounded-full bg-fuchsia-500/12 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:84px_84px]" />
          </div>

          <div className="relative p-2 sm:p-3">
            {/* Viewport */}
            <div ref={viewportRef} className="overflow-hidden">
              {/* Track */}
              <motion.div
                className="flex transform-gpu"
                drag="x"
                dragElastic={0.06}
                dragMomentum={false}
                onDragStart={() => setHover(true)}
                onDragEnd={(_, info) => {
                  // al soltar, reactivamos hover=false para que autoplay siga
                  setHover(false);

                  if (info.offset.x < -swipeThreshold) next();
                  if (info.offset.x > swipeThreshold) prev();
                  // si no superó el threshold, vuelve al slide actual
                  if (Math.abs(info.offset.x) <= swipeThreshold) goTo(i);
                }}
                style={{ x, willChange: "transform" }}
              >
                {slides.map((s, idx) => (
                  <div
                    key={s.title}
                    className="shrink-0 w-full"
                    style={{ width: vw ? `${vw}px` : "100%" }}
                  >
                    <Card slide={s} active={idx === i} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Controls */}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                  className="relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-white px-4 text-sm font-semibold text-zinc-950 hover:opacity-95 transition"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent animate-[shimmer_2.1s_infinite]" />
                  Siguiente →
                </button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-120%); }
              100% { transform: translateX(120%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function Card({ slide, active }: { slide: Slide; active: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-zinc-950/35">
      <div className="grid md:grid-cols-[1.15fr_0.85fr]">
        {/* Media */}
        <div className="relative overflow-hidden">
          <div className="relative aspect-square md:aspect-auto md:min-h-[420px]">
            {/* Fondo blur más ligero (mejor FPS) */}
            <div
              className="absolute inset-0 scale-105 blur-md opacity-20"
              style={{
                backgroundImage: `url(${slide.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <img
              src={slide.src}
              alt={slide.title}
              className={[
                "relative z-[1] h-full w-full object-contain p-2 sm:p-3 md:p-4",
                "transition-transform duration-200",
                active ? "scale-[1.03]" : "scale-100",
              ].join(" ")}
              loading="lazy"
              decoding="async"
              draggable={false}
            />

            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-zinc-950/35 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-[2] ring-1 ring-white/10" />

            {slide.tag && (
              <div className="absolute left-3 top-3 z-[3]">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                  {slide.tag}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Copy */}
        <div className="relative p-4 sm:p-5 md:p-6">
          <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-white">
            {slide.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
            {slide.desc}
          </p>

          <div className="mt-4 h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
          <p className="mt-4 text-xs sm:text-sm text-zinc-400">
            Desliza para ver más evidencias del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
