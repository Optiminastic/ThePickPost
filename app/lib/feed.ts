// Unified homepage feed: locally-authored ranked lists + published Signalor blog
// posts, merged into ONE stream of `FeedItem`s so every entry renders through the
// same EventRow card. DB posts win on slug clash; a failed DB fetch degrades to
// just the local lists (never breaks the page).

import { getAllLists, type Listicle } from "./lists";
import { getPosts, type BlogRow } from "./blog-db";

export interface FeedItem {
  slug: string;
  title: string;
  /** ISO date-only (YYYY-MM-DD) — drives the date stamp. */
  date: string;
  excerpt: string;
  kind: "list" | "post";
  /** Number of ranked picks — lists only. */
  count?: number;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function listToItem(l: Listicle): FeedItem {
  return { slug: l.slug, title: l.title, date: l.date, excerpt: l.excerpt, kind: "list", count: l.count };
}

/** Keep only genuine published posts — drop placeholder/test rows. */
function isRealPost(p: BlogRow): boolean {
  const title = (p.title ?? "").trim();
  if (!title) return false;
  if (/^test\b/i.test(title) || /\btest (post|backlink)\b/i.test(title)) return false;
  return true;
}

function postToItem(p: BlogRow): FeedItem {
  const text = stripHtml(p.content_html ?? "");
  return {
    slug: p.slug,
    title: p.title,
    date: (p.published_at ?? "").slice(0, 10),
    excerpt: (p.description?.trim() || text).slice(0, 180),
    kind: "post",
  };
}

function timeOf(d: string): number {
  return d ? new Date(d).getTime() || 0 : 0;
}

/** Every list + every published Signalor post as one feed, newest first. */
export async function getFeedItems(): Promise<FeedItem[]> {
  const lists = getAllLists().map(listToItem);
  let posts: FeedItem[] = [];
  try {
    posts = (await getPosts()).filter(isRealPost).map(postToItem);
  } catch {
    posts = [];
  }
  const seen = new Set(posts.map((p) => p.slug));
  return [...posts, ...lists.filter((l) => !seen.has(l.slug))].sort(
    (a, b) => timeOf(b.date) - timeOf(a.date),
  );
}
