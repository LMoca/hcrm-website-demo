export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "HCRM has been our partner for 17 years, and their platform is the strongest in medical AI and predictive modeling that I have worked with. The accuracy and depth of their claims-based analytics give our team a real edge.",
    author: "Michael Mitchell",
    role: "VP Business Development",
    company: "Applied Health Analytics",
    featured: true,
  },
  {
    quote:
      "HCRM helps employers limit and avoid high-cost claims with actionable information. The insights we get from Health Risk Monitor allow our team to intervene before costs spiral.",
    author: "Tamela Banner",
    role: "Account Manager",
    company: "In-House Physicians",
    featured: true,
  },
  {
    quote:
      "HCRM provides prompt responses, custom reports, and a true partnership. They are not just a vendor, they are an extension of our team.",
    author: "Jim Bode",
    role: "CEO",
    company: "Health 180",
    featured: true,
  },
  {
    quote:
      "The predictive accuracy of HRM gives us confidence in our cost projections and helps us deliver real value to the employers we serve.",
    author: "David Chiappino",
    role: "Executive",
    company: "HealthKeys",
  },
  {
    quote:
      "HCRM's platform gives our team the data clarity we need to make informed decisions about risk and cost management for our clients.",
    author: "Ron Janetzky & Melissa Sowers",
    role: "Leadership",
    company: "AIMM",
  },
  {
    quote:
      "With HCRM, we can see where our population's health costs are heading and take action before they arrive. That foresight is invaluable.",
    author: "Denise Craven",
    role: "Director",
    company: "Healthworks",
  },
];
