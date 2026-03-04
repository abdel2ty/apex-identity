// locales/types.ts

export type Direction = "rtl" | "ltr";

export interface Translations {
  dir: Direction;
  lang: string;
  font: string;

  authority: {
    label: string;
    headline: string;
    points: AuthorityPoint[];
  };

  nav: any;
  hero: any;
  problem: any;
  framework: any;
  services: any;
  comparison: any;
  social_proof: any;
  authority: any;
  cta: any;
  faq: any;
  footer: any;
}
