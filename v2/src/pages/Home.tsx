import Layout from "@/components/Layout";
import { FaqList } from "@/components/Blocks";
import StoryRail from "@/components/StoryRail";
import MemberStory from "@/components/infographics/MemberStory";
import Hero from "@/components/home/Hero";
import { AudienceScene, ConnectScene, LossScene, MissionScene, ProofScene, RiskScene } from "@/components/home/Scenes";
import { allFaqs } from "@/data/faqs";

export const homeFaqs = [allFaqs[0], allFaqs[3], allFaqs[5], allFaqs[7], allFaqs[11]];

// The home page is a run of pinned scroll scenes that tell HCRM's story with visuals first:
// the product and its results (hero) → where plan risk hides → how HCRM connects the data → how it works →
// the loss avoided → who it protects → proof → mission. Copy stays to a headline and a line per scene;
// the long-form answers live in the FAQ for search and AI engines.
const homeCta = {
  eyebrow: "08 · Your plan",
  title: "Every plan has a Member 0417. Find yours.",
  body: "We'll run 24 months of your de-identified claims in Health Risk Monitor. Then try it free for a month.",
  secondary: { label: "How HCRM works", to: "/our-software/" },
  chapter: { label: "Your plan", status: "", tone: "safe" as const },
};

export default function Home() {
  return (
    <Layout cta={homeCta}>
      <StoryRail />
      <Hero />
      <RiskScene />
      <ConnectScene />
      <div data-chapter="How it works" data-tone="watch">
        <MemberStory />
      </div>
      <LossScene />
      <AudienceScene />
      <ProofScene />
      <MissionScene />
      <div className="border-t border-rule bg-white">
        <FaqList faqs={homeFaqs} />
      </div>
    </Layout>
  );
}
