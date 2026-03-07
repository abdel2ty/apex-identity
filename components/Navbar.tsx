"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

// ─────────────────────────────────────────────────────────────

const ApexLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 120 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Apex Identity"
  >
    {/* ↓↓↓ Replace everything inside this <svg> with your actual logo SVG content ↓↓↓ */}
    <rect x="0.5" y="0.5" width="119" height="39" rx="1.5" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 3" />
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="10" fontFamily="serif" letterSpacing="3" opacity="0.4">
      YOUR LOGO
    </text>
    {/* ↑↑↑ Replace above with your SVG ↑↑↑ */}
  </svg>
);

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      if (href === "#top" || href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href.startsWith("#")) {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, menuOpen ? 300 : 0);
  }, [menuOpen]);

  const navLinks = [
    { label: t.nav.system, href: "#system" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.authority, href: "#authority" },
    { label: t.nav.faq, href: "#faq" },
  ];

  const otherLang = lang === "en" ? "ar" : "en";
  const otherLangLabel = lang === "en" ? "العربية" : "English";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-apex-black/85 backdrop-blur-xl border-b border-apex-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <button
              onClick={() => scrollTo("#top")}
              className="flex items-center group flex-shrink-0 bg-transparent border-none outline-none cursor-none"
              aria-label="Scroll to top"
            >
              <ApexLogo className="h-8 w-auto text-apex-white group-hover:text-apex-gold transition-colors duration-300" />
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative text-apex-silver/70 hover:text-apex-white text-sm tracking-wide transition-colors duration-200 group bg-transparent border-none outline-none cursor-none"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-apex-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">

              {/* Language toggle */}
              <button
                onClick={() => setLang(otherLang)}
                className="text-apex-silver/50 hover:text-apex-gold text-xs tracking-[0.2em] uppercase transition-colors duration-200 cursor-none"
              >
                {lang === "en" ? "AR" : "EN"}
              </button>

              {/* CTA */}
              <button
                onClick={() => scrollTo("#apply")}
                className="hidden md:block relative px-6 py-2.5 text-sm tracking-wide text-apex-black bg-apex-gold font-semibold overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] cursor-none"
              >
                <span className="relative z-10">{t.nav.cta}</span>
                <div className="absolute inset-0 bg-apex-gold-light scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-none"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-6 h-[1.5px] bg-apex-white origin-center"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-6 h-[1.5px] bg-apex-white"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block w-6 h-[1.5px] bg-apex-white origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-apex-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 inset-x-0 z-50 md:hidden bg-apex-dark border-b border-apex-border/60 shadow-2xl"
            >
              <nav className="px-6 py-4 flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: lang === "ar" ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    onClick={() => scrollTo(link.href)}
                    className="flex items-center gap-4 py-4 text-apex-silver hover:text-apex-white transition-colors duration-200 group bg-transparent border-none w-full text-left cursor-none"
                    style={{ borderBottom: i < navLinks.length - 1 ? "1px solid rgba(26,26,40,0.3)" : "none" }}
                  >
                    <span className="w-2 h-2 border border-apex-gold/30 rotate-45 group-hover:border-apex-gold/80 group-hover:bg-apex-gold/10 transition-all duration-200 flex-shrink-0" />
                    <span className="text-base font-medium">{link.label}</span>
                  </motion.button>
                ))}

                {/* Language toggle in mobile menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.24, duration: 0.3 }}
                  className="py-4"
                  style={{ borderBottom: "1px solid rgba(26,26,40,0.3)" }}
                >
                  <button
                    onClick={() => { setLang(otherLang); setMenuOpen(false); }}
                    className="flex items-center gap-3 text-apex-silver/60 hover:text-apex-gold transition-colors duration-200 bg-transparent border-none w-full text-left cursor-none"
                  >
                    <svg className="w-4 h-4 opacity-50" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <circle cx="8" cy="8" r="6.5" />
                      <path d="M8 1.5c-1.8 2-2.8 3.9-2.8 6.5s1 4.5 2.8 6.5M8 1.5c1.8 2 2.8 3.9 2.8 6.5s-1 4.5-2.8 6.5M1.5 8h13" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm">{otherLangLabel}</span>
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="pt-5 pb-2"
                >
                  <button
                    onClick={() => scrollTo("#apply")}
                    className="block w-full text-center py-3.5 bg-apex-gold text-apex-black text-sm font-semibold tracking-wide hover:bg-apex-gold-light transition-colors duration-200 cursor-none"
                  >
                    {t.nav.cta}
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}