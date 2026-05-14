import type { StructureBuilder } from "sanity/desk";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("MyNella")
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
              S.documentTypeListItem("teamMember").title("Team roster"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Pages")
        .id("pages")
        .child(
          S.list()
            .title("Pages")
            .items([S.documentTypeListItem("pageCopy").title("Page copy (SEO & heroes)")]),
        ),
    ]);
