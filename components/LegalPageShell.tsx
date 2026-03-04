"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

interface LegalPageShellProps {
  titleAr: string;
  titleEn: string;
  lastUpdatedAr: string;
  lastUpdatedEn: string;
  children: React.ReactNode;
}

export default function LegalPageShell({
  titleAr,
  titleEn,
  lastUpdatedAr,
  lastUpdatedEn,
  children,
}: LegalPageShellProps) {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-apex-black text-apex-white">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-apex-gold/50 to-transparent" />

      {/* Navbar minimal */}
      <header className="border-b border-apex-border/40 bg-apex-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-apex-gold rotate-45 scale-75 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-1 bg-apex-black rotate-45 scale-75" />
            </div>
            <span className="text-apex-white font-semibold tracking-widest text-sm uppercase">
              Apex Identity
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-apex-silver/60 hover:text-apex-white text-sm transition-colors duration-200"
          >
            <svg className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {isAr ? "العودة" : "Back"}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-apex-gold/50" />
              <span className="text-apex-gold text-xs tracking-[0.3em] uppercase">
                Apex Identity
              </span>
            </div>
            <h1 className={`text-apex-white mb-3 ${isAr ? "text-3xl md:text-4xl font-bold" : "font-serif text-4xl md:text-5xl font-light italic"}`}>
              {isAr ? titleAr : titleEn}
            </h1>
            <p className="text-apex-silver/50 text-sm">
              {isAr ? lastUpdatedAr : lastUpdatedEn}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-apex-gold/30 via-apex-border to-transparent mb-12" />

          {/* Content */}
          <div className={`prose-apex ${isAr ? "text-right" : "text-left"}`}>
            {children}
          </div>
        </motion.div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-apex-border/40 py-8 text-center">
        <p className="text-apex-silver/30 text-xs">
          © {new Date().getFullYear()} Apex Identity. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
        </p>
      </footer>
    </div>
  );
}
