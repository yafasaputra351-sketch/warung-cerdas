import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofProblem from "@/components/SocialProofProblem";
import Features from "@/components/Features";
import DashboardBenefits from "@/components/DashboardBenefits";
import TestimonialsPricing from "@/components/TestimonialsPricing";
import FaqCta from "@/components/FaqCta";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";

export default function Home() {
  return (
    <>
      <ClientEffects />
      <Navbar />
      <main>
        <Hero />
        <SocialProofProblem />
        <Features />
        <DashboardBenefits />
        <TestimonialsPricing />
        <FaqCta />
      </main>
      <Footer />
    </>
  );
}
