"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

// ─── Icons
const IconCV = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.4">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="2" width="20" height="20" rx="3" />
    <path d="M7 10v7M7 7v.5M12 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M12 10v7" strokeLinecap="round" />
  </svg>
);
const IconWeb = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.4">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" strokeLinecap="round" />
  </svg>
);
const IconPortfolio = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="7" width="20" height="15" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M12 12v4M10 14h4" strokeLinecap="round" />
  </svg>
);
const IconInterview = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.4">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8M8 13h5" strokeLinecap="round" />
  </svg>
);
const IconRoadmap = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.4">
    <path d="M3 17l4-10 5 6 3-4 6 8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="21" cy="17" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// ─── Individual services data
const SERVICES_EN = [
  { icon: <IconCV />, tag: "Document", name: "ATS-Optimized CV", desc: "A strategically engineered resume that passes ATS filters and compels hiring managers to act — not just read.", deliverables: ["ATS keyword audit & integration", "Achievement-led narrative", "Visual hierarchy redesign", "2 revision rounds"], duration: "1–2 days" },

  { icon: <IconLinkedIn />, tag: "Profile", name: "LinkedIn Authority Profile", desc: "Transform your LinkedIn from a digital tombstone into a 24/7 opportunity magnet that speaks directly to your target market.", deliverables: ["Headline & summary rewrite", "Experience repositioning", "Skills & endorsements strategy", "SEO optimization"], duration: "2–3 days" },

  { icon: <IconWeb />, tag: "Website", name: "Personal Professional Website", desc: "A custom-built personal brand hub that establishes undeniable authority and differentiates you from every other candidate.", deliverables: ["Custom domain setup", "Portfolio & about pages", "Contact & lead capture", "Mobile-first design"], duration: "3–5 days" },

  { icon: <IconPortfolio />, tag: "Presentation", name: "Portfolio / Case Study Deck", desc: "A high-impact presentation that turns your experience into a compelling story investors, clients, and employers can't ignore.", deliverables: ["Story architecture", "Visual case studies", "Metrics & impact framing", "PDF + slide formats"], duration: "3–5 days" },

  { icon: <IconInterview />, tag: "Coaching", name: "Interview Kit + AI Simulation", desc: "A battle-tested interview system — strategic answer frameworks, personalized story bank, and live AI practice sessions.", deliverables: ["STAR method training", "Top 30 Q&A bank", "3 AI simulation sessions", "Offer negotiation prep"], duration: "7–10 days" },

  { icon: <IconRoadmap />, tag: "Strategy", name: "6-Month Career Roadmap", desc: "A precision-mapped growth plan with milestones, target companies, skill gaps, and a month-by-month execution framework.", deliverables: ["Market opportunity analysis", "Skill gap roadmap", "Target company list", "Monthly milestone plan"], duration: "Delivered in 3 days" },
];

const SERVICES_AR = [
  { icon: <IconCV />, tag: "وثيقة", name: "سيرة ذاتية متوافقة مع ATS", desc: "سيرة ذاتية مُهندَسة استراتيجياً تتخطى فلاتر ATS وتجبر مديري التوظيف على التصرف — لا مجرد القراءة.", deliverables: ["تدقيق ودمج كلمات ATS المفتاحية", "سرد قائم على الإنجازات", "إعادة تصميم التسلسل البصري", "جولتان للمراجعة"], duration: "١–٢ يوم" },

  { icon: <IconLinkedIn />, tag: "ملف", name: "ملف LinkedIn للسلطة المهنية", desc: "حوّل LinkedIn من شاهد قبر رقمي إلى مغناطيس فرص يعمل ٢٤/٧ ويخاطب سوقك المستهدف مباشرة.", deliverables: ["إعادة كتابة العنوان والملخص", "إعادة تموضع الخبرات", "استراتيجية المهارات والتوصيات", "تحسين SEO"], duration: "٢–٣ أيام" },

  { icon: <IconWeb />, tag: "موقع", name: "موقع مهني شخصي", desc: "مركز علامة شخصية مخصص يُثبت سلطة لا يمكن إنكارها ويميزك عن كل مرشح آخر.", deliverables: ["إعداد النطاق المخصص", "صفحات البورتفوليو والتعريف", "نموذج تواصل وجذب عملاء", "تصميم mobile-first"], duration: "٣–٥ أيام" },

  { icon: <IconPortfolio />, tag: "عرض", name: "بورتفوليو / عرض دراسات حالة", desc: "عرض تقديمي عالي الأثر يحوّل خبراتك إلى قصة مقنعة لا يستطيع المستثمرون والعملاء وأصحاب العمل تجاهلها.", deliverables: ["هندسة القصة السردية", "دراسات حالة بصرية", "إطار الأرقام والأثر", "صيغتا PDF والشرائح"], duration: "٣–٥ أيام" },

  { icon: <IconInterview />, tag: "تدريب", name: "حزمة المقابلات + محاكاة AI", desc: "نظام مقابلات مُجرَّب — أطر إجابات استراتيجية، بنك قصص شخصي، وجلسات تدريب مباشرة بالذكاء الاصطناعي.", deliverables: ["تدريب على منهج STAR", "بنك ٣٠ سؤال وإجابة", "٣ جلسات محاكاة AI", "إعداد تفاوض على العرض"], duration: "٧–١٠ أيام" },

  { icon: <IconRoadmap />, tag: "استراتيجية", name: "خارطة طريق مهنية لـ ٦ أشهر", desc: "خطة نمو مُعدَّة بدقة تشمل مراحل، شركات مستهدفة، فجوات مهارية، وإطار تنفيذ شهري.", deliverables: ["تحليل الفرص السوقية", "خارطة الفجوات المهارية", "قائمة الشركات المستهدفة", "خطة مراحل شهرية"], duration: "تُسلَّم في ٣ أيام" },
];

// ─── Packages feature list
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

const PACKAGE_INCLUDES = [
  new Set([0, 1, 2, 3]),
  new Set([0, 1, 2, 3, 4, 5, 6, 7]),
  new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
];

type ServicePackage = {
  name: string;
  name_ar?: string;
  ideal: string;
  transformation: string;
  features: string[];
  popular?: boolean;
};

// ── Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const tabContent = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

// ────────────────────────────────────────────────────────
export default function ServicesSection() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [tab, setTab] = useState<"packages" | "individual">("packages");
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const allFeatures = lang === "ar" ? ALL_FEATURES_AR : ALL_FEATURES_EN;
  const packages: ServicePackage[] = t.services.packages;
  const services = lang === "ar" ? SERVICES_AR : SERVICES_EN;
  const isAr = lang === "ar";

  const tabs = [
  {
    id: "packages" as const,
    label: isAr ? "الباقات الكاملة" : "Full Packages",
    sub: isAr ? "منظومة متكاملة" : "Complete system",
  },
  {
    id: "individual" as const,
    label: isAr ? "الخدمات الفردية" : "Individual Services",
    sub: isAr ? "اختر ما يناسبك" : "Choose what you need",
  },
];

  return (
    <section
      id="services"
      ref={ref}
      className="section-padding bg-apex-dark relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-apex-gold/[0.028] rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">

        {/* ── Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-apex-gold/50" />
            <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">{t.services.label}</span>
            <div className="h-px w-12 bg-apex-gold/50" />
          </div>
          <h2 className={`text-apex-white mb-4 ${isAr ? "text-3xl md:text-4xl lg:text-5xl font-bold" : "font-serif text-4xl md:text-5xl lg:text-6xl font-light"}`}>
            {t.services.headline}
          </h2>
          <p className={`text-apex-silver max-w-xl mx-auto ${isAr ? "leading-loose text-lg" : "leading-relaxed text-lg"}`}>
            {t.services.subheadline}
          </p>
        </motion.div>

        {/* ── Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="relative flex bg-apex-card border border-apex-border p-1 gap-1">
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-1 bottom-1 bg-apex-gold/10 border border-apex-gold/25"
              layout
              layoutId="tab-indicator"
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              style={{
                width: "calc(50% - 2px)",
                left: tab === (isAr ? "individual" : "packages") ? "4px" : "calc(50% - 2px)",
              }}
            />
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative z-10 flex flex-col items-center px-8 py-3 transition-all duration-300 min-w-[160px] ${
                  tab === t.id ? "text-apex-white" : "text-apex-silver/50 hover:text-apex-silver"
                }`}
              >
                <span className="text-sm font-medium tracking-wide">{t.label}</span>
                <span className={`text-[10px] tracking-[0.2em] mt-0.5 transition-colors duration-300 ${tab === t.id ? "text-apex-gold/70" : "text-apex-silver/30"}`}>
                  {t.sub}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Tab content */}
        <AnimatePresence mode="wait">
          {tab === "packages" ? (
            <motion.div
              key="packages"
              variants={tabContent}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Packages grid */}
              <div className="grid lg:grid-cols-3 gap-6 lg:items-stretch">
                {packages.map((pkg, i) => (
                  <PackageCard
                    key={i}
                    pkg={pkg}
                    index={i}
                    inView={inView}
                    popular={pkg.popular}
                    lang={lang}
                    cta={t.services.cta ?? ""}
                    badge={t.services.popular_badge ?? ""}
                    allFeatures={allFeatures}
                    included={PACKAGE_INCLUDES[i]}
                  />
                ))}
              </div>

              {/* Nudge to individual */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center"
              >
                <p className="text-apex-silver/40 text-sm">
                  {isAr ? "لا تحتاج الباقة الكاملة؟" : "Don't need the full package?"}{" "}
                  <button
                    onClick={() => setTab("individual")}
                    className="text-apex-gold/60 hover:text-apex-gold underline underline-offset-4 transition-colors duration-200"
                  >
                    {isAr ? "اختر خدمة واحدة فقط" : "Pick a single service"}
                  </button>
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="individual"
              variants={tabContent}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Individual services grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    onMouseEnter={() => setActiveCard(i)}
                    onMouseLeave={() => setActiveCard(null)}
                    className="group relative flex flex-col cursor-default"
                  >
                    <div
                      className={`relative flex flex-col flex-1 p-7 transition-all duration-500 bg-apex-card border ${
                        activeCard === i
                          ? "border-apex-gold/40 shadow-[0_0_40px_-8px_rgba(212,175,55,0.15)]"
                          : "border-apex-border hover:border-apex-gold/20"
                      }`}
                    >
                      {/* Tag + icon */}
                      <div className="flex items-start justify-between mb-5">
                        <span className={`text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 transition-all duration-300 ${
                          activeCard === i
                            ? "bg-apex-gold/15 text-apex-gold border border-apex-gold/30"
                            : "bg-apex-white/5 text-apex-silver/50 border border-apex-border"
                        }`}>
                          {service.tag}
                        </span>
                        <div className={`transition-colors duration-300 ${activeCard === i ? "text-apex-gold" : "text-apex-silver/30 group-hover:text-apex-gold/50"}`}>
                          {service.icon}
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className={`text-apex-white mb-3 ${isAr ? "text-xl font-bold" : "font-serif text-2xl font-medium"}`}>
                        {service.name}
                      </h3>

                      {/* Desc */}
                      <p className={`text-apex-silver/70 text-[14.5px] mb-6 flex-1 ${isAr ? "leading-loose" : "leading-relaxed"}`}>
                        {service.desc}
                      </p>

                      {/* Divider */}
                      <div className={`h-px mb-5 transition-all duration-300 ${activeCard === i ? "bg-apex-gold/20" : "bg-apex-border"}`} />

                      {/* Deliverables */}
                      <div className="mb-5">
                        <p className="text-apex-silver/40 text-[11px] tracking-[0.2em] uppercase mb-3">
                          {isAr ? "المخرجات" : "Deliverables"}
                        </p>
                        <ul className="space-y-2">
                          {service.deliverables.map((d, di) => (
                            <li key={di} className="flex items-start gap-2.5">
                              <svg className={`w-3.5 h-3.5 mt-[3px] flex-shrink-0 transition-colors duration-300 ${activeCard === i ? "text-apex-gold" : "text-apex-gold/40"}`} viewBox="0 0 14 14" fill="none">
                                <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="text-apex-silver/60 text-[13.5px] leading-snug">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Duration + CTA */}
                      <div className="flex items-center justify-between mt-auto gap-4">
                        <div>
                          <span className="text-apex-silver/35 text-[10px] tracking-[0.2em] uppercase block mb-0.5">
                            {isAr ? "المدة" : "Timeline"}
                          </span>
                          <span className="text-apex-silver/70 text-[13px]">{service.duration}</span>
                        </div>
                        <a href="#apply" className={`text-[12.5px] font-semibold tracking-wide px-4 py-2.5 transition-all duration-300 whitespace-nowrap ${
                          activeCard === i
                            ? "bg-apex-gold text-apex-black"
                            : "border border-apex-gold/30 text-apex-gold/70 hover:bg-apex-gold/10 hover:border-apex-gold/50 hover:text-apex-gold"
                        }`}>
                          {isAr ? "اطلب هذه الخدمة" : "Request This Service"}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Nudge to packages */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center"
              >
                <p className="text-apex-silver/40 text-sm">
                  {isAr ? "تريد المنظومة الكاملة؟" : "Want the complete system?"}{" "}
                  <button
                    onClick={() => setTab("packages")}
                    className="text-apex-gold/60 hover:text-apex-gold underline underline-offset-4 transition-colors duration-200"
                  >
                    {isAr ? "استكشف الباقات الكاملة" : "Explore full packages"}
                  </button>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// Package Card
// ─────────────────────────────────────────
function PackageCard({
  pkg, index, inView, popular, lang, cta, badge, allFeatures, included,
}: {
  pkg: ServicePackage; index: number; inView: boolean; popular?: boolean;
  lang: string; cta: string; badge: string; allFeatures: string[]; included: Set<number>;
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

      <div className={`relative p-8 lg:p-10 flex flex-col h-full transition-all duration-500 ${
        popular ? "border-animated bg-apex-card overflow-hidden" : "bg-apex-card border border-apex-border hover:border-apex-gold/20"
      }`}>
        {popular && <div className="absolute inset-0 bg-apex-gold/3 pointer-events-none" />}

        <div className="relative flex flex-col flex-1">
          <div className="mb-6">
            <h3 className={`text-apex-white mb-1 ${lang === "en" ? "font-serif text-3xl font-medium" : "text-xl font-bold"}`}>
              {lang === "ar" ? pkg.name_ar ?? pkg.name : pkg.name}
            </h3>
            <p className="text-apex-silver/60 text-sm">{pkg.ideal}</p>
          </div>

          <div className={`h-px mb-6 ${popular ? "bg-apex-gold/30" : "bg-apex-border"}`} />

          <div className="mb-6 p-4 bg-apex-black/40">
            <p className={`text-apex-gold/80 text-sm ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
              {pkg.transformation}
            </p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {allFeatures.map((feature, fi) => {
              const isIncluded = included.has(fi);
              return (
                <li key={fi} className={`flex items-start gap-3 transition-all duration-200 ${isIncluded ? "" : "opacity-[0.28]"}`}>
                  <div className="mt-[3px] flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    {isIncluded ? (
                      <svg className={`w-4 h-4 ${popular ? "text-apex-gold" : "text-apex-gold/70"}`} viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-apex-silver/50" viewBox="0 0 12 12" fill="none">
                        <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-[15.5px] leading-snug ${isIncluded ? "text-apex-silver" : "text-apex-silver/40 line-through decoration-apex-silver/25"}`}>
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <a href="#apply" className={`relative block text-center py-3.5 px-6 text-sm font-semibold tracking-wide transition-all duration-300 overflow-hidden mt-auto ${
          popular ? "bg-apex-gold text-apex-black hover:bg-apex-gold-light" : "border border-apex-gold/40 text-apex-gold hover:bg-apex-gold/10"
        }`}>
          {cta}
        </a>
      </div>
    </motion.div>
  );
}