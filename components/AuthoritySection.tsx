"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function AuthoritySection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isAr = lang === "ar";

  return (
    <section
      id="authority"
      ref={ref}
      className="section-padding bg-apex-black relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-apex-gold/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-start">

          {/* ── Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16 lg:mb-0 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-apex-gold/50" />
              <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.authority.label}</span>
            </div>

            <h2 className={`text-apex-white mb-6 ${
              isAr
                ? "text-3xl md:text-4xl font-bold leading-snug"
                : "font-serif text-4xl md:text-5xl font-light leading-tight"
            }`}>
              {t.authority.headline}
            </h2>

            {/* Watermark — bigger, more atmospheric */}
            <div className="hidden lg:block mt-20 select-none pointer-events-none">
              <span className={`text-[160px] font-black leading-none text-apex-gold/[0.06] ${
                isAr ? "" : "font-serif italic"
              }`}>
                {isAr ? "أ" : "A"}
              </span>
            </div>
          </motion.div>

          {/* ── Right: Points */}
          <div className="space-y-4">
            {t.authority.points.map((point: { title: string; desc: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isAr ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex gap-6 p-7 lg:p-8 border border-apex-border bg-apex-card
                  hover:border-apex-gold/30 hover:bg-[#131320]
                  hover:shadow-[0_0_40px_-10px_rgba(201,168,76,0.12)]
                  transition-all duration-500 cursor-default"
              >
                {/* Animated accent line on the leading edge */}
                <div className={`absolute top-0 bottom-0 w-px
                  bg-apex-gold/0 group-hover:bg-apex-gold/40
                  transition-all duration-500
                  ${isAr ? "right-0" : "left-0"}`}
                />

                {/* Diamond icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-9 h-9 border border-apex-gold/25 flex items-center justify-center
                    group-hover:border-apex-gold/60 group-hover:bg-apex-gold/5
                    transition-all duration-400">
                    <div className="w-2.5 h-2.5 bg-apex-gold/40 rotate-45
                      group-hover:bg-apex-gold group-hover:scale-110
                      transition-all duration-300" />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className={`text-apex-white mb-3 ${
                    isAr ? "text-lg font-bold" : "text-lg font-semibold"
                  }`}>
                    {point.title}
                  </h3>
                  <p className={`text-apex-silver/65 group-hover:text-apex-silver/90 transition-colors duration-300 ${
                    isAr ? "text-sm leading-loose" : "text-sm leading-relaxed"
                  }`}>
                    {point.desc}
                  </p>
                </div>

                {/* Index — subtle corner label */}
                <span className={`absolute top-4 text-[10px] font-mono
                  text-apex-silver/15 group-hover:text-apex-gold/30
                  transition-colors duration-300
                  ${isAr ? "left-4" : "right-4"}`}>
                  {(i + 1).toString().padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}