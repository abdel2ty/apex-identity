"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function AuthoritySection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="authority" ref={ref} className="section-padding bg-apex-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-apex-gold/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-16 lg:mb-0 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-apex-gold/50" />
              <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.authority.label}</span>
            </div>
            <h2 className={`text-apex-white mb-6 ${lang === "en" ? "font-serif text-4xl md:text-5xl font-light leading-tight" : "text-3xl md:text-4xl font-bold leading-snug"}`}>
              {t.authority.headline}
            </h2>

            <div className="hidden lg:block mt-16">
              <div className="text-[120px] font-bold leading-none text-apex-gold/5 select-none">
                A
              </div>
            </div>
          </motion.div>

          {/* Right: Points */}
          <div className="space-y-6">
            {t.authority.points.map((point: { title: string; desc: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === "ar" ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex gap-6 p-6 border border-apex-border hover:border-apex-gold/20 bg-apex-card hover:bg-[#131320] transition-all duration-400"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 border border-apex-gold/30 flex items-center justify-center group-hover:border-apex-gold/60 transition-colors duration-300">
                    <div className="w-2 h-2 bg-apex-gold/50 rotate-45 group-hover:bg-apex-gold transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <h3 className={`text-apex-white mb-2 ${lang === "en" ? "text-lg font-medium" : "text-lg font-bold"}`}>
                    {point.title}
                  </h3>
                  <p className={`text-apex-silver text-sm ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
