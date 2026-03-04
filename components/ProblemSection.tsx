"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

type ProblemItem = {
  title: string;
  desc: string;
};

export default function ProblemSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items: ProblemItem[] = t.problem.items; // تحديد النوع هنا

  return (
    <section id="problem" ref={ref} className="section-padding bg-apex-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-apex-gold/3 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.problem.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className={`text-apex-white mb-6 max-w-3xl mx-auto ${
              lang === "en"
                ? "font-serif text-4xl md:text-5xl lg:text-6xl font-light italic"
                : "text-3xl md:text-4xl lg:text-5xl font-bold"
            }`}
          >
            {t.problem.headline}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className={`text-apex-silver max-w-2xl mx-auto ${lang === "ar" ? "text-lg leading-loose" : "text-lg leading-relaxed"}`}
          >
            {t.problem.subheadline}
          </motion.p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <ProblemCard key={i} title={item.title} desc={item.desc} index={i} inView={inView} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemCard({
  title,
  desc,
  index,
  inView,
  lang,
}: {
  title: string;
  desc: string;
  index: number;
  inView: boolean;
  lang: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-apex-card p-10 lg:p-12 hover:bg-[#131320] transition-colors duration-500 relative overflow-hidden"
    >
      {/* Corner accent */}
      <div className="absolute top-0 left-0 w-16 h-px bg-apex-gold/50" />
      <div className="absolute top-0 left-0 h-16 w-px bg-apex-gold/50" />

      <div className="mb-6">
        <span className="text-apex-gold/40 text-xs tracking-[0.4em] font-mono">
          0{index + 1}
        </span>
      </div>

      <h3
        className={`text-apex-white mb-4 ${lang === "en" ? "text-xl font-medium" : "text-xl font-bold"}`}
      >
        {title}
      </h3>
      <p className={`text-apex-silver ${lang === "ar" ? "leading-loose text-base" : "leading-relaxed text-base"}`}>
        {desc}
      </p>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-apex-gold/0 group-hover:bg-apex-gold/30 transition-all duration-500" />
    </motion.div>
  );
}
