export type Direction = "rtl" | "ltr";

export interface AuthorityPoint {
  title: string;
  desc: string;
}

export interface Translations {
  dir: Direction;
  lang: string;
  font: string;

  authority: {
    label: string;
    headline: string;
    points: AuthorityPoint[];
  };

  // مؤقتًا سيب الباقي any
  nav: any;
  hero: any;
  problem: any;
  framework: any;
  services: any;
  comparison: any;
  social_proof: any;
  cta: any;
  faq: any;
  footer: any;
}
