import React, { use } from 'react'
import { useNavigate } from 'react-router-dom';
const Hero = () => {

  const navigate = useNavigate();

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-16 pt-20 pb-16"
      style={{ background: "#0d1b2a" }}
    >
      {/* Background watermark */}
      <span
        className="absolute -right-4 bottom-4 text-white/[0.025] pointer-events-none select-none leading-none"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "180px" }}
      >
        SNAPCART
      </span>

      {/* Eyebrow */}
      <div className="flex items-center gap-2.5 mb-7">
        <span className="w-5 h-px bg-white/25" />
        <span className="text-[11px] tracking-[0.22em] uppercase text-white/35 font-light">
          New Arrivals — SS25
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-white leading-[0.95] tracking-wide m-0"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(64px, 10vw, 108px)",
        }}
      >
        Style That
        <br />
        <span className="text-white/[0.18]">Moves</span> Fast.
      </h1>

      {/* Subtitle */}
      <p className="text-white/40 text-sm font-light leading-relaxed max-w-sm mt-7 mb-11 tracking-wide">
        Curated fashion for every mood. Shop the latest drops — minimal effort,
        maximum look.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate('/Products')}
          className="bg-white text-[#0d1b2a] text-[11px] font-medium tracking-[0.1em] uppercase px-8 py-[14px] rounded-sm hover:opacity-85 transition-all duration-200 hover:-translate-y-px"
        >
          Shop Now
        </button>
        <button
          onClick={() => navigate('/collections')}
          className="bg-transparent text-white/40 text-[11px] font-normal tracking-[0.1em] uppercase px-7 py-[13px] rounded-sm border border-white/10 hover:border-white/30 hover:text-white/70 transition-all duration-200"
        >
          View Collections
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-10 mt-16 pt-8 border-t border-white/[0.06]">
        {[
          { num: "2K+", label: "Styles" },
          { num: "48H", label: "Delivery" },
          { num: "100%", label: "Secure" },
        ].map((s) => (
          <div key={s.label}>
            <p
              className="text-white/85 text-[28px] leading-none tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {s.num}
            </p>
            <p className="text-[10px] tracking-[0.16em] uppercase text-white/25 mt-1.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;