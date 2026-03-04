"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ar } from "@/locales/ar";
import { en } from "@/locales/en";
import type { Translations } from "@/locales/types"; // ✅ صححت السطر هنا

type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "apex-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("ar");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    const t = lang === "ar" ? ar : en;
    document.documentElement.lang = t.lang;
    document.documentElement.dir = t.dir;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = (l: Language) => setLangState(l);
  const toggleLang = () => setLangState((prev) => (prev === "ar" ? "en" : "ar"));

  const t = lang === "ar" ? ar : en;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
