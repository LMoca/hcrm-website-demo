export interface Faq {
  q: string;
  a: string;
}

/**
 * Written against the objections a sceptical, data-literate buyer actually
 * raises. Anything HCRM has not yet supplied is marked rather than invented.
 */
export const faqs: Faq[] = [
  {
    q: "How is 95%+ normalization accuracy measured, and by whom?",
    a: "It is measured across client datasets after ingestion, not asserted from a lab sample. The engine standardizes provider names, reconciles procedure and diagnosis code sets, maps pharmacy NDC identifiers to GPI, removes duplicates and validates each claim against clinical logic rules. Claims it cannot resolve are surfaced as exceptions rather than silently passed through, so the accuracy figure and the exception list are both visible to you. Ask us to walk the exception report during the demo.",
  },
  {
    q: "How is this different from the reporting our TPA already sends us?",
    a: "TPA reporting tells you what has already been paid. It is a record. HRM projects the next twelve months at member and group level and expresses that projection in dollars, which is the difference between knowing your trend and having time to change it. The second difference is independence: at renewal you are negotiating with your own normalized data rather than the narrative supplied by the party quoting you.",
  },
  {
    q: "What do you need from us, and how long before we see output?",
    a: "Medical and pharmacy claims covering the trailing 24 months, in whatever format your TPA or carrier already produces. There is no schema work on your side. The demo runs on de-identified claims and takes about 45 minutes; the free trial then runs on your own data and returns a full output set within the trial month.",
  },
  {
    q: "How is our claims data protected?",
    a: "Claims data is handled under HIPAA-compliant controls. [[CLIENT-SUPPLIED: named certifications (SOC 2 / HITRUST), encryption standards in transit and at rest, data residency, retention and deletion policy, and the BAA process.]] This answer should carry specifics before launch, because it is the question that most often decides a security review.",
  },
  {
    q: "What happens when the forecast is wrong?",
    a: "Every projection carries a confidence interval, and the outcome assessment engine compares predictions back against actuals over time, so the model's track record on your population is measurable rather than assumed. Programme evaluations report negative results as readily as positive ones. A tool that only ever confirms the answer you wanted is not doing measurement.",
  },
  {
    q: "Who inside our organization actually uses it?",
    a: "Finance and benefits leadership read the group forecast and renewal exposure. Care management works the flagged member list. Executives read the outcome reports. Because every output is denominated in dollars rather than an abstract risk score, those three groups are reading the same number instead of translating between three vocabularies.",
  },
  {
    q: "What does it cost?",
    a: "[[CLIENT-SUPPLIED: pricing model, whether it is priced per covered life or per engagement, contract length, and what the Care Management module adds.]] The demo and the one-month trial on your own claims are free and carry no obligation.",
  },
];
