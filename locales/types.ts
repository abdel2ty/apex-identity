export interface Translations {
  dir: "ltr" | "rtl";
  lang: string;
  font: string;

  nav: {
    system: string;
    services: string;
    authority: string;
    faq: string;
    cta: string;
  };

  hero: {
    badge: string;
    headline1: string;
    headline2: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
    stat1_value: string;
    stat1_label: string;
    stat2_value: string;
    stat2_label: string;
    stat3_value: string;
    stat3_label: string;
  };

  problem: {
    label: string;
    headline: string;
    subheadline: string;
    items: {
      title: string;
      desc: string;
    }[];
  };

  framework: {
    label: string;
    headline: string;
    subheadline: string;
    phases: {
      number: string;
      title: string;
      subtitle: string;
      desc: string;
      outcome: string;
    }[];
  };

  services: {
    label: string;
    headline: string;
    subheadline: string;
    popular_badge?: string;
    cta: string;
    packages: {
      name: string;
      name_ar?: string;
      ideal: string;
      transformation: string;
      features: string[];
      popular?: boolean;
    }[];
  };

  comparison: {
    label: string;
    headline: string;
    col_typical: string;
    col_apex: string;
    rows: {
      feature: string;
      typical: string;
      apex: string;
    }[];
  };

  social_proof: {
    label: string;
    headline: string;
    verify: string;
    testimonials: {
      name: string;
      role: string;
      story: string;
      result: string;
      link: string;
    }[];
  };

  authority: {
    label: string;
    headline: string;
    points: {
      title: string;
      desc: string;
    }[];
  };

  cta: {
    badge: string;
    headline: string;
    subheadline: string;
    cta: string;
    note: string;
  };

  faq: {
    label: string;
    headline: string;
    items: {
      q: string;
      a: string;
    }[];
  };

  footer: {
    tagline: string;
    rights: string;
    nav_label: string;
    legal_label: string;
    social_label: string;
    links: {
      label: string;
      href: string;
    }[];
    nav_links: {
      label: string;
      href: string;
    }[];
  };
}
