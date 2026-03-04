"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function CTASection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="apply" ref={ref} className="section-padding bg-apex-dark relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-apex-gold/8 rounded-full blur-[100px]" />
      </div>

      {/* Top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-apex-gold/40 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-5 py-2 border border-apex-gold/40 bg-apex-gold/8">
              <div className="w-1.5 h-1.5 bg-apex-gold rounded-full" />
              <span className="text-apex-gold text-xs tracking-[0.3em] uppercase font-medium">{t.cta.badge}</span>
            </div>
          </div>

          <h2 className={`text-apex-white mb-6 ${lang === "en" ? "font-serif text-4xl md:text-5xl lg:text-6xl font-light" : "text-3xl md:text-4xl lg:text-5xl font-bold"}`}>
            {t.cta.headline}
          </h2>

          <p className={`text-apex-silver max-w-2xl mx-auto mb-12 ${lang === "ar" ? "leading-loose text-lg" : "leading-relaxed text-lg"}`}>
            {t.cta.subheadline}
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-6">
            <a
              href="https://wa.me/201012857997?text=مرحبًا،%20حابب%20احجز%20جلسه%20استشارية%20مع%20فريق%20Apex%20Identity."
              target="_blank"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-apex-gold text-apex-black font-semibold text-base tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.03] glow-gold"
            >
              <span className="relative z-10">{t.cta.cta}</span>
              <svg className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${lang === "ar" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-apex-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
            </a>
            <p className="text-apex-silver/50 text-sm">{t.cta.note}</p>
          </div>
        </motion.div>

        {/* Decorative lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute -bottom-5 inset-x-0 h-px bg-gradient-to-r from-transparent via-apex-gold/30 to-transparent"
        />
      </div>
    </section>
  );
}
