import type { StructureBuilder } from "sanity/desk";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Clearmind")
    .items([
      S.listItem()
        .title("Globals")
        .id("globals")
        .child(
          S.list()
            .title("Globals")
            .items([
              S.listItem()
                .title("Site settings")
                .id("siteSettings")
                .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
              S.listItem()
                .title("Home page content")
                .id("homeContent")
                .child(S.document().schemaType("homeContent").documentId("homeContent")),
              S.listItem()
                .title("Site chrome")
                .id("siteChrome")
                .child(S.document().schemaType("siteChrome").documentId("siteChrome")),
              S.listItem()
                .title("Contact page")
                .id("contactPage")
                .child(S.document().schemaType("contactPage").documentId("contactPage")),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Library")
        .id("library")
        .child(
          S.list()
            .title("Library")
            .items([
              S.documentTypeListItem("partner").title("Partners / logos"),
              S.documentTypeListItem("faqItem").title("FAQ items (by placement)"),
              S.documentTypeListItem("teamMember").title("Team roster"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Pages & products")
        .id("pages")
        .child(
          S.list()
            .title("Pages & products")
            .items([
              S.documentTypeListItem("marketingPage").title("Marketing pages (modules)"),
              S.documentTypeListItem("pageCopy").title("Page copy (SEO & heroes)"),
              S.documentTypeListItem("portfolioStrategy").title("Model portfolio strategies"),
              S.documentTypeListItem("post").title("Blog posts"),
            ]),
        ),
    ]);
