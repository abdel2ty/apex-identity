"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

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

            {/* Logo — smooth scroll to top, no page refresh */}
            <button
              onClick={() => scrollTo("#top")}
              className="flex items-center gap-3 group flex-shrink-0 bg-transparent border-none outline-none"
              aria-label="Scroll to top"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-apex-gold rotate-45 scale-75 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute inset-1 bg-apex-black rotate-45 scale-75" />
              </div>
              <span className="text-apex-white font-semibold tracking-widest text-sm uppercase hidden sm:block">
                Apex Identity
              </span>
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
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
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
                    className="flex items-center gap-4 py-4 border-b border-apex-border/30 last:border-b-0 text-apex-silver hover:text-apex-white transition-colors duration-200 group bg-transparent border-none w-full text-left cursor-none"
                    style={{ borderBottom: i < navLinks.length - 1 ? "1px solid rgba(26,26,40,0.3)" : "none" }}
                  >
                    <span className="w-2 h-2 border border-apex-gold/30 rotate-45 group-hover:border-apex-gold/80 group-hover:bg-apex-gold/10 transition-all duration-200 flex-shrink-0" />
                    <span className="text-base font-medium">{link.label}</span>
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.3 }}
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
