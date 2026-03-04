"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function ComparisonTable() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="section-padding bg-apex-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apex-gold/3 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.comparison.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2 className={`text-apex-white ${lang === "en" ? "font-serif text-4xl md:text-5xl font-light" : "text-3xl md:text-4xl font-bold"}`}>
            {t.comparison.headline}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-hidden border border-apex-border"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-apex-card border-b border-apex-border">
            <div className="p-5 lg:p-6" />
            <div className="p-5 lg:p-6 border-x border-apex-border text-center">
              <p className="text-apex-silver/60 text-xs md:text-sm tracking-wide">{t.comparison.col_typical}</p>
            </div>
            <div className="p-5 lg:p-6 text-center bg-apex-gold/5">
              <p className="text-apex-gold text-xs md:text-sm tracking-wide font-semibold">{t.comparison.col_apex}</p>
            </div>
          </div>

          {/* Rows */}
          {t.comparison.rows.map((row: { feature: string; typical: string; apex: string }, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className="grid grid-cols-3 border-b border-apex-border/50 last:border-b-0 hover:bg-apex-card/50 transition-colors duration-200"
            >
              <div className="p-5 lg:p-6">
                <span className={`text-apex-white text-sm ${lang === "ar" ? "font-medium" : ""}`}>{row.feature}</span>
              </div>
              <div className="p-5 lg:p-6 border-x border-apex-border/50 text-center flex items-center justify-center">
                <span className="text-apex-silver/50 text-sm">{row.typical}</span>
              </div>
              <div className="p-5 lg:p-6 text-center flex items-center justify-center bg-apex-gold/3">
                <span className="text-apex-gold text-sm font-medium">{row.apex}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
