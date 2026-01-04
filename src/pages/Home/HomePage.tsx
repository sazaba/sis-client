import Hero from "./sections/Hero";
import Features from "./sections/Features";
import CTA from "./sections/CTA";
import GalleryCarousel from "./sections/GalleryCarousel";
// (luego podrás agregar Testimonios, FAQ, etc.)

export default function HomePage() {
  return (
    <div className="relative">
      {/* Background premium */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* base */}
        <div className="absolute inset-0 bg-zinc-950" />

        {/* aurora blobs */}
        <div className="absolute -top-24 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-10 -left-32 h-[420px] w-[520px] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-52 -right-40 h-[460px] w-[560px] rounded-full bg-fuchsia-500/15 blur-3xl" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

        {/* vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950" />
      </div>

      {/* contenido */}
      <Hero />
      <GalleryCarousel/>
      
      <Features />
      
      <CTA />
    </div>
  );
}
