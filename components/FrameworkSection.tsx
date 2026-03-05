"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

type Phase = {
  number: string;
  title: string;
  subtitle?: string;
  desc: string;
  outcome: string;
};

export default function FrameworkSection() {
  const { t, lang } = useLanguage();
  const phases = t.framework.phases as Phase[];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="system"
      ref={sectionRef}
      className="bg-apex-black relative overflow-hidden"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large ambient number watermark — decorative */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[28vw] font-black text-apex-gold/[0.025] leading-none select-none pointer-events-none"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        ™
      </div>

      {/* ── Header */}
      <div className="section-padding pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-7xl mx-auto px-6 lg:px-8"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">
              {t.framework.label}
            </span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2
            className={`text-apex-white mb-5 ${
              lang === "en"
                ? "font-serif text-4xl md:text-5xl lg:text-6xl font-light"
                : "text-3xl md:text-4xl lg:text-5xl font-bold"
            }`}
          >
            {t.framework.headline}
          </h2>
          <p
            className={`text-apex-silver max-w-2xl mx-auto ${
              lang === "ar" ? "leading-loose text-lg" : "leading-relaxed text-lg"
            }`}
          >
            {t.framework.subheadline}
          </p>
        </motion.div>
      </div>

      {/* ── Timeline track */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        {/* Horizontal line */}
        <div className="hidden lg:block absolute top-[88px] left-8 right-8 h-px bg-apex-gold/10">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-apex-gold/60 to-apex-gold/20"
            style={{ width: lineWidth }}
          />
        </div>

        {/* Phases grid */}
        <div className="grid lg:grid-cols-4 gap-0 lg:gap-0">
          {phases.map((phase, i) => (
            <PhaseBlock
              key={i}
              phase={phase}
              index={i}
              total={phases.length}
              lang={lang}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseBlock({
  phase,
  index,
  lang,
  flip,
}: {
  phase: Phase;
  index: number;
  total: number;
  lang: string;
  flip: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ${
        flip ? "lg:flex-col-reverse" : "lg:flex-col"
      } lg:px-6 first:pl-0 last:pr-0`}
    >
      {/* ── Top content block */}
      <motion.div
        initial={{ opacity: 0, y: flip ? -24 : 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 ${flip ? "lg:pt-10" : "lg:pb-10"}`}
      >
        <div className="group relative bg-apex-card border border-apex-border hover:border-apex-gold/30 transition-all duration-500 overflow-hidden p-7">
          {/* Gold shimmer top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Watermark number */}
          <div
            aria-hidden
            className="absolute -bottom-4 -right-2 text-[5.5rem] font-black leading-none text-apex-gold/[0.055] select-none pointer-events-none transition-all duration-500 group-hover:text-apex-gold/[0.09]"
          >
            {phase.number}
          </div>

          {/* Phase tag */}
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-5 h-5 border border-apex-gold/30 flex items-center justify-center bg-apex-black/60 flex-shrink-0">
              <span className="text-apex-gold/70 font-mono text-[9px]">{phase.number}</span>
            </div>
            {phase.subtitle && (
              <span className="text-apex-silver/40 text-[10px] tracking-[0.25em] uppercase">
                {phase.subtitle}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`text-apex-white mb-3 relative ${
              lang === "en"
                ? "font-serif text-xl lg:text-2xl font-medium"
                : "text-xl lg:text-2xl font-bold"
            }`}
          >
            {phase.title}
          </h3>

          {/* Desc */}
          <p
            className={`text-apex-silver text-sm relative ${
              lang === "ar" ? "leading-loose" : "leading-relaxed"
            }`}
          >
            {phase.desc}
          </p>
        </div>

        {/* Outcome strip */}
        <motion.div
          initial={{ opacity: 0, x: flip ? 10 : -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.13 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 flex items-start gap-2.5 px-4 py-3 border-l-2 border-apex-gold/40 bg-apex-gold/[0.04]"
        >
          <svg
            className="w-3 h-3 text-apex-gold mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
          <p
            className={`text-apex-gold/70 text-[12.5px] ${
              lang === "ar" ? "leading-loose" : "leading-relaxed"
            }`}
          >
            {phase.outcome}
          </p>
        </motion.div>
      </motion.div>

      {/* ── Node dot on the timeline (desktop only) */}
      <div className="hidden lg:flex items-center justify-center h-[calc(88px+1px)] relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.13 + 0.1, type: "spring", stiffness: 200 }}
          className="relative z-10 w-4 h-4 rounded-full border-2 border-apex-gold/60 bg-apex-black flex items-center justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-apex-gold/80" />
          {/* Pulse */}
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            className="absolute inset-0 rounded-full bg-apex-gold/20"
          />
        </motion.div>
      </div>

      {/* ── Connector line (mobile) */}
      <div className="lg:hidden flex justify-center my-4">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.13 + 0.3 }}
          className="w-px h-8 bg-gradient-to-b from-apex-gold/40 to-transparent origin-top"
        />
      </div>
    </div>
  );
}