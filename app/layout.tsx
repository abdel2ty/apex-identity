import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Apex Identity — Where Your Career Reaches Its Peak",
  description:
    "Apex Identity is a premium Career Identity & Positioning Agency that engineers high-value professional presence for ambitious professionals.",
  keywords: ["career positioning", "linkedin optimization", "professional identity", "cv strategy", "career coaching"],
  openGraph: {
    title: "Apex Identity — Where Your Career Reaches Its Peak",
    description: "We engineer your complete professional identity. Strategic career positioning for ambitious professionals.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-apex-black text-apex-white antialiased">
        <CustomCursor />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
