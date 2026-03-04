"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/apex-identity",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/apexidentity.eg",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@apexidentity.eg",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587712056151",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-apex-black border-t border-apex-border/50 relative overflow-hidden">
      {/* Top gold gradient line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-apex-gold/40 to-transparent" />

      {/* Subtle ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-apex-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group mb-5 w-fit bg-transparent border-none outline-none cursor-none"
              aria-label="Scroll to top"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <div className="absolute inset-0 bg-apex-gold rotate-45 scale-75 group-hover:rotate-90 transition-transform duration-500" />
                <div className="absolute inset-1 bg-apex-black rotate-45 scale-75" />
              </div>
              <span className="text-apex-white font-semibold tracking-widest text-sm uppercase">
                Apex Identity
              </span>
            </button>
            <p className={`text-apex-silver/60 text-sm mb-6 ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
              {t.footer.tagline}
            </p>

            {/* Social Icons */}
            <div>
              <p className="text-apex-silver/40 text-xs tracking-[0.2em] uppercase mb-4">
                {t.footer.social_label}
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="w-9 h-9 border border-apex-border flex items-center justify-center text-apex-silver/50 hover:text-apex-gold hover:border-apex-gold/40 transition-colors duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-apex-white/80 text-xs tracking-[0.25em] uppercase mb-6">
              {t.footer.nav_label}
            </h4>
            <ul className="space-y-3">
              {t.footer.nav_links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="group flex items-center gap-2 text-apex-silver/60 hover:text-apex-white text-sm transition-colors duration-200 bg-transparent border-none outline-none cursor-none w-full text-start"
                  >
                    <span className="w-3 h-px bg-apex-gold/0 group-hover:bg-apex-gold/60 transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h4 className="text-apex-white/80 text-xs tracking-[0.25em] uppercase mb-6">
              {t.footer.legal_label}
            </h4>
            <ul className="space-y-3">
              {t.footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-apex-silver/60 hover:text-apex-white text-sm transition-colors duration-200"
                  >
                    <span className="w-3 h-px bg-apex-gold/0 group-hover:bg-apex-gold/60 transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div>
            <h4 className="text-apex-white/80 text-xs tracking-[0.25em] uppercase mb-6">
              {lang === "ar" ? "ابدأ رحلتك" : "Start Your Journey"}
            </h4>
            <p className={`text-apex-silver/50 text-sm mb-5 ${lang === "ar" ? "leading-loose" : "leading-relaxed"}`}>
              {lang === "ar"
                ? "جاهز لتحويل هويتك المهنية؟ تقدم لجلسة استراتيجية خاصة."
                : "Ready to engineer your professional identity? Apply for a private strategy session."}
            </p>
            <button
              onClick={() => {
                const el = document.querySelector("#apply");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block px-5 py-2.5 border border-apex-gold/40 text-apex-gold text-xs tracking-[0.2em] uppercase hover:bg-apex-gold hover:text-apex-black transition-all duration-300 cursor-none"
            >
              {lang === "ar" ? "تقدّم الآن" : "Apply Now"}
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-apex-border/40 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-apex-silver/30 text-xs">
            © {new Date().getFullYear()} Apex Identity. {t.footer.rights}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-apex-gold/40 rotate-45" />
            <span className="text-apex-silver/20 text-xs tracking-widest px-2">APEX IDENTITY</span>
            <div className="w-1 h-1 bg-apex-gold/40 rotate-45" />
          </div>
        </div>
      </div>
    </footer>
  );
}
