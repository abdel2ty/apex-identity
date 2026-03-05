"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.5 } },
  },
  item: {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  },
};

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let raf: number;
    const COUNT = Math.min(90, Math.floor((W * H) / 14000));
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number; alphaDir: number };
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.3, alpha: Math.random() * 0.5 + 0.1, alphaDir: Math.random() > 0.5 ? 1 : -1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(201,168,76,${(1 - dist / 100) * 0.07})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaDir * 0.004;
        if (p.alpha > 0.6 || p.alpha < 0.05) p.alphaDir *= -1;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  useEffect(() => { const cleanup = init(); return cleanup; }, [init]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" aria-hidden="true" />;
}

function AuroraLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute -top-20 left-[10%] w-[70%] h-[55%] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.02) 50%, transparent 80%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.08, 1], x: [0, 30, 0], y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[20%] right-[-5%] w-[50%] h-[60%] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, rgba(139,111,46,0.02) 50%, transparent 80%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.12, 1], x: [0, -20, 0], y: [0, 30, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
      <motion.div className="absolute bottom-[-10%] left-[25%] w-[50%] h-[40%] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)", filter: "blur(70px)" }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
    </div>
  );
}

function GeometricLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-fine" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C9A84C" strokeWidth="0.5" />
          </pattern>
          <pattern id="grid-coarse" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M 300 0 L 0 0 0 300" fill="none" stroke="#C9A84C" strokeWidth="1" />
          </pattern>
          <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
            <stop offset="30%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-fine)" />
        <rect width="100%" height="100%" fill="url(#grid-coarse)" />
        <rect width="100%" height="100%" fill="url(#vignette)" />
      </svg>
    </div>
  );
}

function OrbitingRings() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" aria-hidden="true">
      <motion.div className="absolute w-[700px] h-[700px] border border-apex-gold/[0.025] rounded-full"
        animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-apex-gold/15 rotate-45" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-apex-gold/10 rotate-45" />
      </motion.div>
      <motion.div className="absolute w-[480px] h-[480px] border border-apex-gold/[0.025] rounded-full"
        animate={{ rotate: -360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-apex-gold/12 rotate-45" />
        <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-apex-gold/10 rotate-45" />
      </motion.div>
      <motion.div className="absolute w-[300px] h-[300px] border border-apex-gold/[0.03] rounded-full"
        animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} />
    </div>
  );
}

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // ── Parallax layers — each moves at a different speed, nothing fades out
  const bgDeepY   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);  // grid — slowest
  const bgMidY    = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);  // aurora + rings
  const bgNearY   = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);  // particles
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);   // content — barely moves
  const scanY     = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);  // scan line — fastest

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-apex-black">

      {/* Layer 1 — Grid (deepest, slowest) */}
      <motion.div style={{ y: bgDeepY }} className="absolute inset-0">
        <GeometricLines />
      </motion.div>

      {/* Layer 2 — Aurora glow */}
      <motion.div style={{ y: bgMidY }} className="absolute inset-0">
        <AuroraLayer />
      </motion.div>

      {/* Layer 3 — Orbiting rings */}
      <motion.div style={{ y: bgMidY }} className="absolute inset-0">
        <OrbitingRings />
      </motion.div>

      {/* Layer 4 — Particles (nearer) */}
      <motion.div style={{ y: bgNearY }} className="absolute inset-0">
        <ParticleCanvas />
      </motion.div>

      {/* Layer 5 — Scan line (fastest, creates motion sense) */}
      <motion.div style={{ y: scanY }} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-gold/20 to-transparent"
          animate={{ y: ["0vh", "100vh"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />
      </motion.div>

      {/* Top edge */}
      <div className="absolute top-0 inset-x-0 h-48 pointer-events-none z-10"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 0%, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.6) 40%, transparent 100%)" }} />

      {/* Content — moves least, stays crisp and readable throughout scroll */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={stagger.item} className="inline-flex items-center mb-10">
            <motion.div
              className="flex items-center gap-3 px-5 py-2 border border-apex-gold/25 bg-apex-gold/5 backdrop-blur-sm"
              animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 20px rgba(201,168,76,0.12)", "0 0 0px rgba(201,168,76,0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div className="w-1.5 h-1.5 bg-apex-gold rounded-full"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-apex-gold text-xs tracking-[0.3em] uppercase font-medium">{t.hero.badge}</span>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={stagger.item} className="mb-6">
            <h1 className={`leading-[1.05] ${lang === "en" ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic" : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"}`}>
              <span className="block text-apex-white/95 mb-3">{t.hero.headline1}</span>
              <span className="block text-gold-gradient">{t.hero.headline2}</span>
            </h1>
          </motion.div>

          {/* Divider */}
          <motion.div variants={stagger.item} className="flex items-center justify-center gap-4 mb-8">
            <motion.div className="h-px bg-gradient-to-r from-transparent to-apex-gold/40" initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2, delay: 1 }} />
            <div className="w-1 h-1 bg-apex-gold/50 rotate-45" />
            <motion.div className="h-px bg-gradient-to-l from-transparent to-apex-gold/40" initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 1.2, delay: 1 }} />
          </motion.div>

          {/* Subheadline */}
          <motion.p variants={stagger.item} className={`text-apex-silver text-lg md:text-xl max-w-2xl mx-auto mb-12 ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={stagger.item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a href="#apply"
              className="group relative px-8 py-4 bg-apex-gold text-apex-black font-semibold text-sm tracking-wide overflow-hidden"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)", "0 0 25px rgba(201,168,76,0.25)", "0 0 0px rgba(201,168,76,0)"] }}
              transition={{ boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}>
              <span className="relative z-10">{t.hero.cta_primary}</span>
              <motion.div className="absolute inset-0 bg-apex-gold-light" initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.3 }} style={{ originX: 0 }} />
            </motion.a>
            <motion.a href="#system"
              className="px-8 py-4 border border-apex-border text-apex-silver hover:text-apex-white hover:border-apex-gold/40 text-sm tracking-wide transition-colors duration-300"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {t.hero.cta_secondary}
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-56 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(5,5,7,1) 0%, rgba(5,5,7,0.85) 30%, rgba(5,5,7,0.4) 65%, transparent 100%)" }} />

    </section>
  );
}