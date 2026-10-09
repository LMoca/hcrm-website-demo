import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import LensProvider from "@/context/LensProvider";
import { useLens } from "@/context/lens-context";
import { lensByKey } from "@/data/lenses";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Contact from "./pages/Contact.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import NotFound from "./pages/NotFound.tsx";

// About pages
import WhoWeAre from "./pages/about/WhoWeAre.tsx";
import WhyChooseHCRM from "./pages/about/WhyChooseHCRM.tsx";
import OurSoftware from "./pages/about/OurSoftware.tsx";
import OurTeam from "./pages/about/OurTeam.tsx";
import OurPartnerships from "./pages/about/OurPartnerships.tsx";

// Service pages
import HealthcarePredictiveAnalytics from "./pages/services/HealthcarePredictiveAnalytics.tsx";
import DataNormalization from "./pages/services/DataNormalization.tsx";
import ClinicalReporting from "./pages/services/ClinicalReporting.tsx";
import HealthcareManagement from "./pages/services/HealthcareManagement.tsx";
import StopLossReporting from "./pages/services/StopLossReporting.tsx";

// Client pages
import WhoWeServe from "./pages/clients/WhoWeServe.tsx";
import SelfFundedEmployers from "./pages/clients/SelfFundedEmployers.tsx";
import HealthInsuranceConsultants from "./pages/clients/HealthInsuranceConsultants.tsx";
import InsuranceCompanies from "./pages/clients/InsuranceCompanies.tsx";
import StopLossCarriers from "./pages/clients/StopLossCarriers.tsx";
import PopulationHealth from "./pages/clients/PopulationHealth.tsx";
import ClinicsProviders from "./pages/clients/ClinicsProviders.tsx";
import EmployerClinics from "./pages/clients/EmployerClinics.tsx";
import HealthPlans from "./pages/clients/HealthPlans.tsx";
import TPAs from "./pages/clients/TPAs.tsx";
import ACOs from "./pages/clients/ACOs.tsx";
import HealthMgmtVendors from "./pages/clients/HealthMgmtVendors.tsx";
import UnderstandingAnalytics from "./pages/clients/UnderstandingAnalytics.tsx";
import TestimonialsPage from "./pages/clients/Testimonials.tsx";

// Resources
import Resources from "./pages/Resources.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LensProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/for/:lens" element={<LensLink />} />

          {/* About */}
          <Route path="/about/who-we-are" element={<WhoWeAre />} />
          <Route path="/about/why-choose-hcrm" element={<WhyChooseHCRM />} />
          <Route path="/about/our-software" element={<OurSoftware />} />
          <Route path="/about/our-team" element={<OurTeam />} />
          <Route path="/about/our-partnerships" element={<OurPartnerships />} />

          {/* Services */}
          <Route path="/services/healthcare-predictive-analytics" element={<HealthcarePredictiveAnalytics />} />
          <Route path="/services/data-normalization-validation" element={<DataNormalization />} />
          <Route path="/services/clinical-reporting-outcome-assessment" element={<ClinicalReporting />} />
          <Route path="/services/healthcare-management" element={<HealthcareManagement />} />
          <Route path="/services/stop-loss-reporting" element={<StopLossReporting />} />

          {/* Clients */}
          <Route path="/clients/who-we-serve" element={<WhoWeServe />} />
          <Route path="/clients/self-funded-employers" element={<SelfFundedEmployers />} />
          <Route path="/clients/health-insurance-consultants" element={<HealthInsuranceConsultants />} />
          <Route path="/clients/insurance-companies" element={<InsuranceCompanies />} />
          <Route path="/clients/stop-loss-carriers-captives" element={<StopLossCarriers />} />
          <Route path="/clients/population-health-management-teams" element={<PopulationHealth />} />
          <Route path="/clients/clinics-healthcare-providers" element={<ClinicsProviders />} />
          <Route path="/clients/employer-clinics" element={<EmployerClinics />} />
          <Route path="/clients/health-plans" element={<HealthPlans />} />
          <Route path="/clients/third-party-administrators" element={<TPAs />} />
          <Route path="/clients/accountable-care-organizations" element={<ACOs />} />
          <Route path="/clients/health-management-vendors" element={<HealthMgmtVendors />} />
          <Route path="/clients/understanding-healthcare-analytics" element={<UnderstandingAnalytics />} />
          <Route path="/clients/testimonials" element={<TestimonialsPage />} />

          {/* Resources */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<BlogPostPageWrapper />} />

          {/* Contact & Legal */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />

          {/* Legacy redirects */}
          <Route path="/about" element={<Navigate to="/about/who-we-are" replace />} />
          <Route path="/practice-areas" element={<Navigate to="/services/healthcare-predictive-analytics" replace />} />
          <Route path="/focus-areas" element={<Navigate to="/services/healthcare-predictive-analytics" replace />} />
          <Route path="/my-stories" element={<Navigate to="/about/who-we-are" replace />} />
          <Route path="/my-stories/:slug" element={<Navigate to="/about/who-we-are" replace />} />
          <Route path="/blog" element={<Navigate to="/resources" replace />} />
          <Route path="/blog/:slug" element={<Navigate to="/resources" replace />} />
          <Route path="/notable-matters" element={<Navigate to="/clients/testimonials" replace />} />
          <Route path="/faqs" element={<Navigate to="/" replace />} />
          <Route path="/terms" element={<Navigate to="/terms-of-use" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </LensProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Shareable role link: /for/carriers opens the home page tailored for that role.
function LensLink() {
  const { lens } = useParams();
  const { setLens } = useLens();
  const valid = lensByKey(lens);
  useEffect(() => {
    if (valid) setLens(valid.key);
  }, [valid, setLens]);
  return <Navigate to={valid ? `/?for=${valid.key}` : "/"} replace />;
}

// Wrapper to extract slug param for blog post
function BlogPostPageWrapper() {
  const { slug } = useParams();
  return <BlogPostPage slug={slug || ""} />;
}

export default App;
