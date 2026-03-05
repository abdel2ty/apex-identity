"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Icons per problem
const IconInvisible = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" strokeLinecap="round" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" strokeLinecap="round" />
    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
  </svg>
);
const IconUndervalued = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 17l-2 2M16 17l2 2" strokeLinecap="round" />
  </svg>
);
const IconPositioning = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
    <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" strokeLinecap="round" />
  </svg>
);
const IconCV = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
  </svg>
);

const ICONS = [<IconInvisible />, <IconUndervalued />, <IconPositioning />, <IconCV />];

type ProblemItem = {
  title: string;
  desc: string;
};

export default function ProblemSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const items: ProblemItem[] = t.problem.items;

  return (
    <section
      id="problem"
      ref={ref}
      className="section-padding bg-apex-dark relative overflow-hidden"
    >
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
            className={`text-apex-silver max-w-2xl mx-auto ${
              lang === "ar" ? "text-lg leading-loose" : "text-lg leading-relaxed"
            }`}
          >
            {t.problem.subheadline}
          </motion.p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <ProblemCard
              key={i}
              title={item.title}
              desc={item.desc}
              index={i}
              inView={inView}
              lang={lang}
              icon={ICONS[i]}
              isActive={activeCard === i}
              onHover={() => setActiveCard(i)}
              onLeave={() => setActiveCard(null)}
            />
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
  icon,
  isActive,
  onHover,
  onLeave,
}: {
  title: string;
  desc: string;
  index: number;
  inView: boolean;
  lang: string;
  icon: React.ReactNode;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative flex flex-col cursor-default"
    >
      <div
        className={`relative flex flex-col flex-1 p-8 lg:p-10 transition-all duration-500 bg-apex-card border ${
          isActive
            ? "border-apex-gold/40 shadow-[0_0_40px_-8px_rgba(212,175,55,0.15)]"
            : "border-apex-border hover:border-apex-gold/20"
        }`}
      >
        {isActive && <div className="absolute inset-0 bg-apex-gold/[0.02] pointer-events-none" />}

        {/* Top row: index tag + icon */}
        <div className="flex items-start justify-between mb-5">
          <span
            className={`text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 font-mono transition-all duration-300 ${
              isActive
                ? "bg-apex-gold/15 text-apex-gold border border-apex-gold/30"
                : "bg-apex-white/5 text-apex-silver/50 border border-apex-border"
            }`}
          >
            0{index + 1}
          </span>
          <div
            className={`transition-colors duration-300 ${
              isActive ? "text-apex-gold" : "text-apex-silver/30 group-hover:text-apex-gold/50"
            }`}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`text-apex-white mb-4 ${
            lang === "en" ? "text-xl font-medium" : "text-xl font-bold"
          }`}
        >
          {title}
        </h3>

        {/* Desc */}
        <p
          className={`text-apex-silver ${
            lang === "ar" ? "leading-loose text-base" : "leading-relaxed text-base"
          }`}
        >
          {desc}
        </p>

        {/* Bottom hover line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-apex-gold/0 group-hover:bg-apex-gold/30 transition-all duration-500" />
      </div>
    </motion.div>
  );
}