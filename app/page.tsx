import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FrameworkSection from "@/components/FrameworkSection";
import ServicesSection from "@/components/ServicesSection";
import ComparisonTable from "@/components/ComparisonTable";
import SocialProofSection from "@/components/SocialProofSection";
import AuthoritySection from "@/components/AuthoritySection";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <FrameworkSection />
      <ServicesSection />
      <ComparisonTable />
      <SocialProofSection />
      <AuthoritySection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}
