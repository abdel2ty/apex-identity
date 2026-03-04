"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

// ─── Master feature list (order matters — shown in all cards) ───────────────
// EN → AR mapping so we show the right label per language
const ALL_FEATURES_EN = [
  "Comprehensive Career Identity Audit",
  "ATS-Optimized, High-Impact CV",
  "LinkedIn Authority Profile Optimization",
  "Market Positioning Strategy",
  "Custom Personal Professional Website",
  "Portfolio System Engineering",
  "Interview Positioning Kit",
  "Recruiter Attraction Strategy",
  "LinkedIn Content Strategy (30-Day Blueprint)",
  "AI Interview Simulation",
  "Salary Positioning Strategy",
  "6-Month Career Growth Roadmap",
  "30 Days Priority Support",
];

const ALL_FEATURES_AR = [
  "تدقيق الهوية المهنية الشامل",
  "سيرة ذاتية متوافقة مع ATS وعالية الأثر",
  "تحسين ملف LinkedIn للسلطة المهنية",
  "استراتيجية التموضع في السوق",
  "موقع مهني شخصي مخصص",
  "هندسة منظومة بورتفوليو",
  "حزمة التموضع في المقابلات",
  "استراتيجية جذب المُوظِّفين",
  "استراتيجية محتوى LinkedIn (خطة ٣٠ يوم)",
  "محاكاة مقابلات بالذكاء الاصطناعي",
  "استراتيجية تموضع الراتب",
  "خارطة طريق النمو المهني لـ ٦ أشهر",
  "دعم أولوي لمدة ٣٠ يوماً",
];

// Which features each package INCLUDES (by index in the master list above)
const PACKAGE_INCLUDES = [
  // Foundation — first 4
  new Set([0, 1, 2, 3]),
  // Pro — first 8
  new Set([0, 1, 2, 3, 4, 5, 6, 7]),
  // Elite — all 13
  new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
];

export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const allFeatures = lang === "ar" ? ALL_FEATURES_AR : ALL_FEATURES_EN;

  return (
    <section id="services" ref={ref} className="section-padding bg-apex-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-apex-gold/3 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.services.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2 className={`text-apex-white mb-4 ${lang === "en" ? "font-serif text-4xl md:text-5xl lg:text-6xl font-light" : "text-3xl md:text-4xl lg:text-5xl font-bold"}`}>
            {t.services.headline}
          </h2>
          <p className={`text-apex-silver max-w-xl mx-auto ${lang === "ar" ? "leading-loose text-lg" : "leading-relaxed text-lg"}`}>
            {t.services.subheadline}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:items-stretch">
          {t.services.packages.map((pkg, i) => (
            <PackageCard
              key={i}
              pkg={pkg}
              index={i}
              inView={inView}
              popular={pkg.popular}
              lang={lang}
              cta={t.services.cta}
              badge={t.services.popular_badge}
              allFeatures={allFeatures}
              included={PACKAGE_INCLUDES[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  index,
  inView,
  popular,
  lang,
  cta,
  badge,
  allFeatures,
  included,
}: {
  pkg: { name: string; name_ar: string; ideal: string; transformation: string; features: string[]; popular?: boolean };
  index: number;
  inView: boolean;
  popular?: boolean;
  lang: string;
  cta: string;
  badge: string;
  allFeatures: string[];
  included: Set<number>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group flex flex-col h-full"
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1 bg-apex-gold text-apex-black text-xs font-bold tracking-[0.2em] uppercase">
            {badge}
          </div>
        </div>
      )}

      <div
        className={`relative p-8 lg:p-10 flex flex-col h-full transition-all duration-500 ${
          popular
            ? "border-animated bg-apex-card overflow-hidden"
            : "bg-apex-card border border-apex-border hover:border-apex-gold/20"
        }`}
      >
        {popular && <div className="absolute inset-0 bg-apex-gold/3 pointer-events-none" />}

        <div className="relative flex flex-col flex-1">
          {/* Package name */}
          <div className="mb-6">
            <h3 className={`text-apex-white mb-1 ${lang === "en" ? "font-serif text-3xl font-medium" : "text-xl font-bold"}`}>
              {lang === "ar" ? pkg.name_ar : pkg.name}
            </h3>
            <p className="text-apex-silver/60 text-sm">{pkg.ideal}</p>
          </div>

          <div className={`h-px mb-6 ${popular ? "bg-apex-gold/30" : "bg-apex-border"}`} />

          {/* Transformation */}
          <div className="mb-6 p-4 bg-apex-black/40">
            <p className={`text-apex-gold/80 text-sm ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
              {pkg.transformation}
            </p>
          </div>

          {/* Full master feature list — unavailable ones are faded + strikethrough */}
          <ul className="space-y-3 mb-8 flex-1">
            {allFeatures.map((feature, fi) => {
              const isIncluded = included.has(fi);
              return (
                <li
                  key={fi}
                  className={`flex items-start gap-3 transition-all duration-200 ${
                    isIncluded ? "" : "opacity-[0.28]"
                  }`}
                >
                  {/* Icon */}
                  <div className="mt-[3px] flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    {isIncluded ? (
                      <svg className={`w-4 h-4 ${popular ? "text-apex-gold" : "text-apex-gold/70"}`} viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-apex-silver/50" viewBox="0 0 12 12" fill="none">
                        <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[15.5px] leading-snug ${
                      isIncluded
                        ? "text-apex-silver"
                        : "text-apex-silver/40 line-through decoration-apex-silver/25"
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="#apply"
          className={`relative block text-center py-3.5 px-6 text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden mt-auto ${
            popular
              ? "bg-apex-gold text-apex-black hover:bg-apex-gold-light"
              : "border border-apex-gold/40 text-apex-gold hover:bg-apex-gold/10"
          }`}
        >
          {cta}
        </a>
      </div>
    </motion.div>
  );
}