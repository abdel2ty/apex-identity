"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function FAQSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);
  const isAr = lang === "ar";

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding bg-apex-black relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Ambient glow — far corner, barely visible */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-apex-gold/[0.025] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-apex-gold/[0.018] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative">

        {/* ── Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.faq.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>

          <h2 className={`text-apex-white ${isAr ? "text-3xl md:text-4xl font-bold" : "font-serif text-4xl md:text-5xl font-light"}`}>
            {t.faq.headline}
          </h2>
        </motion.div>

        {/* ── FAQ Items */}
        <div>
          {t.faq.items.map((item: { q: string; a: string }, i: number) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Top hairline */}
                <div className={`h-px transition-all duration-500 ${isOpen ? "bg-apex-gold/35" : "bg-apex-border/70"}`} />

                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start gap-6 py-7 group text-start"
                  aria-expanded={isOpen}
                >
                  {/* Index number */}
                  <span
                    className={`flex-shrink-0 font-serif text-[11px] tracking-[0.2em] mt-[3px] transition-colors duration-300 ${
                      isOpen ? "text-apex-gold" : "text-apex-silver/25 group-hover:text-apex-gold/50"
                    }`}
                  >
                    {num}
                  </span>

                  {/* Question text */}
                  <span
                    className={`flex-1 transition-colors duration-300 ${
                      isAr ? "text-[16px] font-semibold leading-relaxed" : "text-[16px] font-medium leading-snug"
                    } ${isOpen ? "text-apex-white" : "text-apex-silver/80 group-hover:text-apex-white"}`}
                  >
                    {item.q}
                  </span>

                  {/* Toggle mark — minimal dash/cross */}
                  <div
                    className={`flex-shrink-0 mt-[2px] w-5 h-5 flex items-center justify-center transition-all duration-400 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      className={`transition-colors duration-300 ${isOpen ? "text-apex-gold" : "text-apex-silver/30 group-hover:text-apex-gold/60"}`}
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                    >
                      <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`pb-8 ${isAr ? "pe-0 ps-11" : "ps-11 pe-7"}`}>
                        {/* Gold left/right rule on answer */}
                        <div className={`flex gap-5 ${isAr ? "flex-row-reverse" : ""}`}>
                          <div className="w-px self-stretch bg-apex-gold/20 flex-shrink-0" />
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: 0.08 }}
                            className={`text-apex-silver/70 ${isAr ? "text-[15px] leading-loose" : "text-[15px] leading-relaxed"}`}
                          >
                            {item.a}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Final bottom hairline */}
          <div className="h-px bg-apex-border/70" />
        </div>

      </div>
    </section>
  );
}