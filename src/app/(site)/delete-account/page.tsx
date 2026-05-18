import type { Metadata } from "next";
import { DeleteAccountView } from "@/components/account/DeleteAccountView";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "delete-account",
    {
      title: "Delete your Nella account | MyNella",
      description:
        "Request deletion of your Nella companion app account and associated personal data. Web resource for Google Play account deletion requirements.",
    },
    "/delete-account",
  );
}

export default function DeleteAccountPage() {
  return <DeleteAccountView />;
}
