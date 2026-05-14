import type { Metadata } from "next";
import { buildPillarArticleMetadata } from "@/lib/seo";
import { PillarArticlePage } from "@/components/pillar-articles/PillarArticlePage";
import { PmsTaxationIndiaArticleBody } from "@/components/pillar-articles/bodies/PmsCompareTaxArticles";
import type { PillarFaq } from "@/lib/pillar-jsonld";

const PATH = "/pms/pms-taxation-india" as const;

const faqs: PillarFaq[] = [
  {
    question: "Is this page investment advice?",
    answer:
      "No. This is educational content from MyNella. Investments are subject to risk; read disclosures and consult qualified professionals before acting.",
  },
  {
    question: "Where can I read MyNella regulatory documents?",
    answer: "Use the disclosures hub at /disclosures for charters and compliance PDFs.",
  },
  {
    question: "How do I contact MyNella?",
    answer: "Use the contact page at /contact to book a conversation or email the team.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildPillarArticleMetadata(PATH);
}

export default function Page() {
  return (
    <PillarArticlePage
      pathname={PATH}
      crumbs={[
        { label: "Home", href: "/" },
        { label: "PMS", href: "/pms" },
        { label: "PMS taxation in India" },
      ]}
      Body={PmsTaxationIndiaArticleBody}
      faqs={faqs}

    />
  );
}
