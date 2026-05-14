/**
 * MyNella Studio — schema is the source of truth for structured content.
 *
 * Docs index (LLM-friendly): https://www.sanity.io/docs/llms.txt
 * Next.js + Content Lake: https://www.sanity.io/docs/next-js-quickstart/displaying-content-in-next-js
 * Visual Editing / Presentation (optional next step): https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool
 */
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "";
const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000";

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

if (!projectId) {
  // eslint-disable-next-line no-console
  console.warn(
    "[sanity] Set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID (see sanity/.env.example).",
  );
}

export default defineConfig({
  name: "mynella",
  title: "MyNella CMS",
  projectId: projectId || "missingProjectId",
  dataset,
  plugins: [
    deskTool({ structure }),
    presentationTool({
      previewUrl: { initial: previewUrl, preview: previewUrl, production: previewUrl },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  /** Safer Studio defaults (Sanity recommendation for production datasets). */
  scheduledPublishing: {
    enabled: true,
  },
});
