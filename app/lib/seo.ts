// Shared SEO constants and helpers for The Pick Post.
// Presentation-only — no content fetching lives here.

export const SITE_URL = "https://thepickpost.com";
export const SITE_NAME = "The Pick Post";
export const SITE_TAGLINE = "Curated top-10 lists, roundups & tool picks";

/** Absolute URL of the site-wide social share image (1200×630). */
export const OG_IMAGE = `${SITE_URL}/og`;
export const OG_IMAGE_ALT =
  "The Pick Post — curated top-10 lists, roundups and tool picks";

/**
 * Strip HTML, collapse whitespace and trim to a clean ~155-char meta
 * description that ends on a word boundary.
 */
export function toMetaDescription(input: string | null | undefined, max = 155): string {
  const text = (input ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "").trimEnd() + "…";
}
