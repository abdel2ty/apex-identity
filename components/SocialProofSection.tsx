"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function SocialProofSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Triple the array so we always have a full loop with no visual seam
  const items = [...t.social_proof.testimonials, ...t.social_proof.testimonials, ...t.social_proof.testimonials];
  const isRTL = lang === "ar";

  return (
    <section ref={ref} className="section-padding bg-apex-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-apex-gold/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.social_proof.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2 className={`text-apex-white ${lang === "en" ? "font-serif text-4xl md:text-5xl font-light" : "text-3xl md:text-4xl font-bold"}`}>
            {t.social_proof.headline}
          </h2>
        </motion.div>
      </div>

      {/* Full-bleed infinite scroll — no gaps, faded sides */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0A0F 0%, #0A0A0F 20%, transparent 100%)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0A0F 0%, #0A0A0F 20%, transparent 100%)" }}
        />

        {/* Scrolling track — CSS animation for perfectly smooth loop */}
        <div
          className={`flex gap-5 ${isRTL ? "testimonial-track-rtl" : "testimonial-track-ltr"}`}
          style={{ width: "max-content" }}
        >
          {items.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              testimonial={testimonial}
              lang={lang}
              verify={t.social_proof.verify}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  lang,
  verify,
}: {
  testimonial: { name: string; role: string; story: string; result: string; link: string };
  lang: string;
  verify: string;
}) {
  return (
    <div
      className="group relative bg-apex-card border border-apex-border p-8 hover:border-apex-gold/20 transition-all duration-500 flex flex-col flex-shrink-0"
      style={{ width: "380px" }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-6 right-6 h-px bg-apex-gold/20 group-hover:bg-apex-gold/40 transition-colors duration-500" />

      {/* Quote mark */}
      <div className="text-apex-gold/20 text-5xl font-serif leading-none mb-4">"</div>

      {/* Story */}
      <p className={`text-apex-silver flex-1 mb-6 ${lang === "ar" ? "leading-loose text-base" : "leading-relaxed text-base"}`}>
        {testimonial.story}
      </p>

      {/* Result badge */}
      <div className="mb-6 px-4 py-2.5 bg-apex-gold/10 border border-apex-gold/20 text-center">
        <span className="text-apex-gold text-sm font-semibold">{testimonial.result}</span>
      </div>

      {/* Client info */}
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-apex-white text-sm font-semibold ${lang === "ar" ? "" : "font-sans"}`}>
            {testimonial.name}
          </p>
          <p className="text-apex-silver/60 text-xs mt-0.5">{testimonial.role}</p>
        </div>
        <a
          href={testimonial.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-1.5 text-apex-silver/40 hover:text-apex-gold text-xs tracking-wide transition-colors duration-200"
        >
          {verify}
          <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
