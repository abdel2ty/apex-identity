"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

type SocialLink = {
  name: string;
  href: string;
  icon: JSX.Element;
};

type NavLink = {
  label: string;
  href: string;
};

export default function Footer() {
  const { t, lang } = useLanguage();

  const SOCIAL_LINKS: SocialLink[] = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/apex-identity",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    // باقي الروابط تبقى كما هي ...
  ];

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
                {SOCIAL_LINKS.map((social: SocialLink) => (
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
              {t.footer.nav_links.map((link: NavLink) => (
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
              {t.footer.links.map((link: NavLink) => (
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
