import LegalPage, { type LegalSection } from "@/components/LegalPage";

const sections: LegalSection[] = [
  {
    h: "Use of this site",
    p: [
      "This website provides information about HCRM's services, including Health Risk Monitor. Content is provided for informational purposes and does not constitute medical, legal or financial advice.",
      "Figures, charts and member records shown anywhere on this site are synthetic and illustrative. They are shaped to reflect the structure of a live HRM output and do not represent any real plan, member or client result.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "All content on this site, including text, graphics, logos, interface designs and software, is the property of HCRM or its licensors and is protected by applicable intellectual property laws.",
    ],
  },
  {
    h: "Service agreements",
    p: [
      "Use of HCRM's services is governed by separate written service agreements. Nothing on this website forms part of, varies or supersedes those agreements.",
      "[[CLIENT-SUPPLIED: service level commitments, data processing terms, limitation of liability, warranty disclaimers, governing law and dispute resolution.]]",
    ],
  },
  {
    h: "Third-party links",
    p: [
      "This site may link to third-party websites. HCRM does not control and is not responsible for the content, policies or practices of those sites.",
    ],
  },
  {
    h: "Contact",
    p: [
      "For questions about these terms, contact [[CLIENT-SUPPLIED: legal contact email and postal address]].",
    ],
  },
];

const TermsOfUse = () => (
  <LegalPage
    label="Legal"
    title="Terms of Use"
    intro="The terms governing your use of this website. Use of HCRM's services themselves is governed by a separate written agreement."
    metaDescription="The terms governing use of the HCRM website. Use of HCRM's services is governed by a separate written agreement between the parties."
    sections={sections}
  />
);

export default TermsOfUse;
