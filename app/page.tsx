import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProofProblem from "@/components/SocialProofProblem";
import Features from "@/components/Features";
import DashboardBenefits from "@/components/DashboardBenefits";
import TestimonialsPricing from "@/components/TestimonialsPricing";
import FaqCta from "@/components/FaqCta";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";

async function getCMSData() {
  try {
    const API_URL = "https://warung-cerdas-production.up.railway.app";
    const res = await fetch(`${API_URL}/api/landing-page`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (error) {
    console.warn("[CMS Warning] API is offline. Using static fallbacks.");
  }
  return null;
}

export default async function Home() {
  const cmsData = await getCMSData();

  return (
    <>
      <ClientEffects />
      <Navbar />
      <main>
        <Hero data={cmsData?.hero} />
        <SocialProofProblem
          partners={cmsData?.partners}
          problems={cmsData?.problems}
          solutionSection={cmsData?.solutionSection}
          solutionPoints={cmsData?.solutionPoints}
        />
        <Features data={cmsData?.features} />
        <DashboardBenefits
          preview={cmsData?.dashboardPreview}
          advantages={cmsData?.advantages}
          steps={cmsData?.steps}
        />
        <TestimonialsPricing
          stats={cmsData?.stats}
          testimonials={cmsData?.testimonials}
          pricingPlans={cmsData?.pricingPlans}
        />
        <FaqCta faqs={cmsData?.faqs} cta={cmsData?.ctaSection} />
      </main>
      <Footer info={cmsData?.footerInfo} />
    </>
  );
}
