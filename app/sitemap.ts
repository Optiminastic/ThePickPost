import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/seo";
import { getAllLists } from "@/app/lib/lists";
import { getPosts } from "@/app/lib/blog-db";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const seen = new Set<string>();

  // Locally-authored ranked lists.
  for (const list of getAllLists()) {
    if (seen.has(list.slug)) continue;
    seen.add(list.slug);
    entries.push({
      url: `${SITE_URL}/${list.slug}`,
      lastModified: new Date(list.date),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Published posts from the shared blog API. A failed fetch must never
  // break the build, so swallow any error and keep the local entries.
  try {
    const posts = await getPosts();
    for (const post of posts) {
      if (!post.slug || seen.has(post.slug)) continue;
      seen.add(post.slug);
      entries.push({
        url: `${SITE_URL}/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch (e) {
    console.error("[sitemap] DB posts fetch failed:", e);
  }

  return entries;
}
