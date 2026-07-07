const API_BASE_URL = "https://warung-cerdas-production.up.railway.app/api";

export interface LandingPageData {
  hero: any;
  partners: any[];
  problems: any[];
  solutionSection: any;
  solutionPoints: any[];
  features: any[];
  dashboardPreview: any;
  advantages: any[];
  steps: any[];
  stats: any[];
  testimonials: any[];
  pricingPlans: any[];
  faqs: any[];
  ctaSection: any;
  footerInfo: any;
}

export class LandingPageApi {
  static async getPageData(): Promise<LandingPageData> {
    const res = await fetch(`${API_BASE_URL}/landing-page`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch landing page data");
    const json = await res.json();
    return json.data;
  }

  // Singletons Update
  static async updateHero(data: any) {
    const res = await fetch(`${API_BASE_URL}/landing-page/hero`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update Hero section");
    return res.json();
  }

  static async updateSolutionSection(data: any) {
    const res = await fetch(`${API_BASE_URL}/landing-page/solution-section`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update Solution section");
    return res.json();
  }

  static async updateDashboardPreview(data: any) {
    const res = await fetch(`${API_BASE_URL}/landing-page/dashboard-preview`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update Dashboard Preview section");
    return res.json();
  }

  static async updateCta(data: any) {
    const res = await fetch(`${API_BASE_URL}/landing-page/cta`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update CTA section");
    return res.json();
  }

  static async updateFooter(data: any) {
    const res = await fetch(`${API_BASE_URL}/landing-page/footer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update Footer section");
    return res.json();
  }

  // CRUD Helpers
  private static async request(endpoint: string, method: string, data?: any) {
    const res = await fetch(`${API_BASE_URL}/landing-page/${endpoint}`, {
      method,
      headers: data ? { "Content-Type": "application/json" } : undefined,
      body: data ? JSON.stringify(data) : undefined
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Request failed for /${endpoint}`);
    }
    return res.json();
  }

  // Partners
  static createPartner(data: { name: string; logo?: string }) { return LandingPageApi.request("partners", "POST", data); }
  static updatePartner(id: number, data: { name: string; logo?: string }) { return LandingPageApi.request(`partners/${id}`, "PUT", data); }
  static deletePartner(id: number) { return LandingPageApi.request(`partners/${id}`, "DELETE"); }

  // Problems
  static createProblem(data: { icon: string; title: string; desc: string }) { return LandingPageApi.request("problems", "POST", data); }
  static updateProblem(id: number, data: { icon: string; title: string; desc: string }) { return LandingPageApi.request(`problems/${id}`, "PUT", data); }
  static deleteProblem(id: number) { return LandingPageApi.request(`problems/${id}`, "DELETE"); }

  // Solution Points
  static createSolutionPoint(data: { icon: string; text: string }) { return LandingPageApi.request("solution-points", "POST", data); }
  static updateSolutionPoint(id: number, data: { icon: string; text: string }) { return LandingPageApi.request(`solution-points/${id}`, "PUT", data); }
  static deleteSolutionPoint(id: number) { return LandingPageApi.request(`solution-points/${id}`, "DELETE"); }

  // Features
  static createFeature(data: { icon: string; title: string; desc: string; color: string }) { return LandingPageApi.request("features", "POST", data); }
  static updateFeature(id: number, data: { icon: string; title: string; desc: string; color: string }) { return LandingPageApi.request(`features/${id}`, "PUT", data); }
  static deleteFeature(id: number) { return LandingPageApi.request(`features/${id}`, "DELETE"); }

  // Advantages
  static createAdvantage(data: { icon: string; title: string; desc: string; color: string }) { return LandingPageApi.request("advantages", "POST", data); }
  static updateAdvantage(id: number, data: { icon: string; title: string; desc: string; color: string }) { return LandingPageApi.request(`advantages/${id}`, "PUT", data); }
  static deleteAdvantage(id: number) { return LandingPageApi.request(`advantages/${id}`, "DELETE"); }

  // Steps
  static createStep(data: { num: string; icon: string; title: string; desc: string; time: string }) { return LandingPageApi.request("steps", "POST", data); }
  static updateStep(id: number, data: { num: string; icon: string; title: string; desc: string; time: string }) { return LandingPageApi.request(`steps/${id}`, "PUT", data); }
  static deleteStep(id: number) { return LandingPageApi.request(`steps/${id}`, "DELETE"); }

  // Stats
  static createStat(data: { value: number; suffix: string; label: string; icon: string; decimal: boolean }) { return LandingPageApi.request("stats", "POST", data); }
  static updateStat(id: number, data: { value: number; suffix: string; label: string; icon: string; decimal: boolean }) { return LandingPageApi.request(`stats/${id}`, "PUT", data); }
  static deleteStat(id: number) { return LandingPageApi.request(`stats/${id}`, "DELETE"); }

  // Testimonials
  static createTestimonial(data: { name: string; role: string; city: string; avatar: string; color: string; text: string; rating: number }) { return LandingPageApi.request("testimonials", "POST", data); }
  static updateTestimonial(id: number, data: { name: string; role: string; city: string; avatar: string; color: string; text: string; rating: number }) { return LandingPageApi.request(`testimonials/${id}`, "PUT", data); }
  static deleteTestimonial(id: number) { return LandingPageApi.request(`testimonials/${id}`, "DELETE"); }

  // Pricing Plans
  static createPricingPlan(data: { billing: string; name: string; price: number; desc: string; color: string; features: string; popular: boolean }) { return LandingPageApi.request("pricing-plans", "POST", data); }
  static updatePricingPlan(id: number, data: { billing: string; name: string; price: number; desc: string; color: string; features: string; popular: boolean }) { return LandingPageApi.request(`pricing-plans/${id}`, "PUT", data); }
  static deletePricingPlan(id: number) { return LandingPageApi.request(`pricing-plans/${id}`, "DELETE"); }

  // FAQs
  static createFaq(data: { q: string; a: string }) { return LandingPageApi.request("faqs", "POST", data); }
  static updateFaq(id: number, data: { q: string; a: string }) { return LandingPageApi.request(`faqs/${id}`, "PUT", data); }
  static deleteFaq(id: number) { return LandingPageApi.request(`faqs/${id}`, "DELETE"); }
}
export default LandingPageApi;
