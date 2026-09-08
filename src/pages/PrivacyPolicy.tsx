import LegalPage, { type LegalSection } from "@/components/LegalPage";

const sections: LegalSection[] = [
  {
    h: "Data we handle",
    p: [
      "HCRM processes medical and pharmacy claims data on behalf of our clients. All claims data is handled in compliance with HIPAA and applicable healthcare data protection regulations.",
      "[[CLIENT-SUPPLIED: specific HIPAA compliance language, the data processing agreement referenced, the BAA process, and any security certifications held (SOC 2, HITRUST).]]",
    ],
  },
  {
    h: "How we use information",
    p: [
      "Claims data is used solely to provide predictive analytics services to the client who supplied it. We do not sell, share or disclose client data to third parties except as required by law or as explicitly authorized by that client.",
      "Information submitted through this website, such as a demo request, is used to respond to that request and is not sold or shared for marketing purposes.",
    ],
  },
  {
    h: "Data security",
    p: [
      "[[CLIENT-SUPPLIED: encryption standards in transit and at rest, access controls, audit procedures, breach notification protocols, sub-processor list, data residency, and retention and deletion policies.]]",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You may request access to, correction of, or deletion of the personal information you have submitted to us through this website.",
      "[[CLIENT-SUPPLIED: applicable state privacy rights (CCPA/CPRA and equivalents), the request process, and the verification standard applied.]]",
    ],
  },
  {
    h: "Contact",
    p: [
      "For privacy questions or requests, contact [[CLIENT-SUPPLIED: privacy contact email and postal address]].",
    ],
  },
];

const PrivacyPolicy = () => (
  <LegalPage
    label="Legal"
    title="Privacy Policy"
    intro="How HCRM collects, uses and protects the information entrusted to us, including the claims data our clients supply."
    metaDescription="How HCRM collects, uses and protects the information entrusted to us, including the medical and pharmacy claims data our clients supply."
    sections={sections}
  />
);

export default PrivacyPolicy;
