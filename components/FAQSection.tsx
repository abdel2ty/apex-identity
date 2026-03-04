"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function FAQSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="section-padding bg-apex-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-apex-gold/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.faq.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2 className={`text-apex-white ${lang === "en" ? "font-serif text-4xl md:text-5xl font-light" : "text-3xl md:text-4xl font-bold"}`}>
            {t.faq.headline}
          </h2>
        </motion.div>

        <div className="space-y-2">
          {t.faq.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="border border-apex-border hover:border-apex-gold/20 transition-colors duration-300 bg-apex-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left group"
                aria-expanded={open === i}
              >
                <span className={`text-apex-white group-hover:text-apex-gold transition-colors duration-200 pr-6 ${lang === "ar" ? "text-base font-semibold text-right" : "text-base font-medium"}`}>
                  {item.q}
                </span>
                <div className={`flex-shrink-0 w-6 h-6 border border-apex-border flex items-center justify-center transition-all duration-300 ${open === i ? "border-apex-gold/40 rotate-45" : ""}`}>
                  <svg className="w-3 h-3 text-apex-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-apex-border/50 pt-4">
                      <p className={`text-apex-silver ${lang === "ar" ? "leading-loose text-base" : "leading-relaxed text-base"}`}>
                        {item.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
