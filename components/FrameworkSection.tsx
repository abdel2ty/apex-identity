"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

// تعريف type لكل phase
type Phase = {
  number: string;
  title: string;
  subtitle?: string;
  desc: string;
  outcome: string;
};

export default function FrameworkSection() {
  const { t, lang } = useLanguage();

  // تأكيد TypeScript إن phases هو Phase[]
  const phases = t.framework.phases as Phase[];

  return (
    <section id="system" className="bg-apex-black relative">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(201,168,76,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <div className="section-padding pb-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-7xl mx-auto px-6 lg:px-8 -mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.framework.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2 className={`text-apex-white mb-5 ${lang === "en" ? "font-serif text-4xl md:text-5xl lg:text-6xl font-light" : "text-3xl md:text-4xl lg:text-5xl font-bold"}`}>
            {t.framework.headline}
          </h2>
          <p className={`text-apex-silver max-w-2xl mx-auto ${lang === "ar" ? "leading-loose text-lg" : "leading-relaxed text-lg"}`}>
            {t.framework.subheadline}
          </p>
        </motion.div>
      </div>

      {/* Sticky cards */}
      <div>
        {phases.map((phase: Phase, i: number) => (
          <StickyCard key={i} phase={phase} index={i} total={phases.length} lang={lang} />
        ))}
        <div className="h-[20vh]" />
      </div>
    </section>
  );
}

function StickyCard({
  phase,
  index,
  total,
  lang,
}: {
  phase: Phase;
  index: number;
  total: number;
  lang: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.4, 1], [1, 1 - (total - index - 1) * 0.018]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, index < total - 1 ? 0.75 : 1]);

  return (
    <div
      ref={ref}
      className="sticky px-6 lg:px-8 pb-5"
      style={{ top: `${88 + index * 20}px`, zIndex: 10 + index }}
    >
      <motion.div style={{ scale, opacity }} className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="bg-apex-card border border-apex-border relative overflow-hidden"
        >
          {/* Thin gold top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-apex-gold/30 to-transparent" />

          <div className="p-8 lg:p-10">
            <div className="flex items-start gap-7">
              <div className="flex-shrink-0 w-12 h-12 border border-apex-gold/25 flex items-center justify-center bg-apex-black/50">
                <span className="text-apex-gold/80 font-mono text-sm font-semibold">{phase.number}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`text-apex-white mb-3 ${lang === "en" ? "font-serif text-xl lg:text-2xl font-medium" : "text-xl lg:text-2xl font-bold"}`}>
                  {phase.title}
                </h3>
                <p className={`text-apex-silver text-sm lg:text-base mb-6 ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
                  {phase.desc}
                </p>

                <div className="flex items-start gap-3 px-4 py-3 bg-apex-black/50 border-l-2 border-apex-gold/35">
                  <svg className="w-3.5 h-3.5 text-apex-gold mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className={`text-apex-gold/70 text-sm ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
                    {phase.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
