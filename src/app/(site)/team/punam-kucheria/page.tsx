import type { Metadata } from "next";
import { buildPillarArticleMetadata } from "@/lib/seo";
import { PillarArticlePage } from "@/components/pillar-articles/PillarArticlePage";
import { PunamKucheriaArticleBody } from "@/components/pillar-articles/bodies/PunamKucheriaArticle";
import type { PillarFaq } from "@/lib/pillar-jsonld";
import { punamAbsoluteImageUrl, punamSameAsLinks } from "@/lib/eeat-author";

const PATH = "/team/punam-kucheria" as const;

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
        { label: "Punam Kucheria" },
      ]}
      Body={PunamKucheriaArticleBody}
      faqs={faqs}
      hideAuthorByline

      person={{
        name: "Punam Kucheria",
        jobTitle: "Director & Fund Manager",
        description:
          "Director and Fund Manager at MyNella Consultancy Pvt. Ltd., a SEBI-registered Portfolio Manager (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA) based in Pune.",
        sameAs: punamSameAsLinks(),
        image: punamAbsoluteImageUrl(),
      }}
    />
  );
}
