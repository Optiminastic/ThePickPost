import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TopNav from "@/app/components/TopNav";
import SiteFooter from "@/app/components/SiteFooter";
import CoverTile from "@/app/components/CoverTile";
import JsonLd from "@/app/components/JsonLd";
import {
  getAllSlugs,
  getListBySlug,
  formatDate as formatListDate,
  type Listicle,
} from "@/app/lib/lists";
import {
  getPosts,
  getPostBySlug,
  formatDate as formatDbDate,
} from "@/app/lib/blog-db";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  toMetaDescription,
} from "@/app/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  const listSlugs = getAllSlugs().map((slug) => ({ slug }));
  const dbSlugs = (await getPosts()).map((p) => ({ slug: p.slug }));
  return [...listSlugs, ...dbSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `/${slug}`;

  const list = getListBySlug(slug);
  if (list) {
    const description = toMetaDescription(list.excerpt);
    return {
      title: list.title,
      description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        title: list.title,
        description,
        url: `${SITE_URL}${canonical}`,
        siteName: SITE_NAME,
        publishedTime: list.date,
        authors: [list.author],
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: list.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: list.title,
        description,
        images: [OG_IMAGE],
      },
    };
  }

  const post = await getPostBySlug(slug);
  if (post) {
    const description = toMetaDescription(post.description || post.content_html);
    const image = post.image_url || OG_IMAGE;
    return {
      title: post.title,
      description,
      alternates: { canonical },
      openGraph: {
        type: "article",
        title: post.title,
        description,
        url: `${SITE_URL}${canonical}`,
        siteName: SITE_NAME,
        publishedTime: post.published_at ?? undefined,
        images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description,
        images: [image],
      },
    };
  }

  return { title: "Not found", robots: { index: false } };
}

/** BlogPosting structured data shared by both content types. */
function blogPostingLd(opts: {
  slug: string;
  title: string;
  description: string;
  image: string;
  datePublished?: string;
  author: string;
}): Record<string, unknown> {
  const url = `${SITE_URL}/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image: [opts.image],
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    author: { "@type": "Person", name: opts.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

/** ItemList structured data for a ranked listicle's entries. */
function itemListLd(list: Listicle): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.title,
    numberOfItems: list.entries.length,
    itemListElement: list.entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      description: entry.blurb,
    })),
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = getListBySlug(slug);

  // Locally-authored ranked list → render the full long-form listicle.
  if (list) {
    return (
      <>
        <JsonLd
          data={[
            blogPostingLd({
              slug: list.slug,
              title: list.title,
              description: toMetaDescription(list.excerpt),
              image: OG_IMAGE,
              datePublished: list.date,
              author: list.author,
            }),
            itemListLd(list),
          ]}
        />
        <TopNav />
        <main className="flex-1">
          <article className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
            <Link href="/" className="eyebrow text-ink-soft transition-colors hover:text-ink">
              ← All lists
            </Link>

            <header className="mt-6 border-b border-line pb-8">
              <time className="eyebrow text-ink-faint">{formatListDate(list.date)}</time>
              <h1 className="headline mt-4 text-5xl font-bold uppercase text-ink sm:text-6xl">
                {list.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">{list.excerpt}</p>
              <p className="eyebrow mt-5 text-ink-faint">
                {list.author} · {list.authorRole} · {list.count} picks · {list.readingTime} min read
              </p>
            </header>

            <div className="mt-8 overflow-hidden border border-line">
              <CoverTile slug={list.slug} count={list.count} showRank={false} className="aspect-[16/7] w-full" />
            </div>

            {/* Intro */}
            <div className="mt-8 space-y-4">
              {list.intro.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Ranked entries */}
            <ol className="mt-10 space-y-6">
              {list.entries.map((entry, i) => (
                <li key={entry.name} className="flex gap-5 border-t border-line pt-6">
                  <span className="font-display text-4xl font-bold leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-ink">
                        {entry.name}
                      </h2>
                      {entry.tag ? (
                        <span className="eyebrow border border-line px-2.5 py-1 text-ink-soft">
                          {entry.tag}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-lg leading-relaxed text-ink-soft">{entry.blurb}</p>
                  </div>
                </li>
              ))}
            </ol>

            {list.closing ? (
              <p className="mt-10 border-t border-line pt-8 text-lg leading-relaxed text-ink">
                {list.closing}
              </p>
            ) : null}
          </article>
        </main>
        <SiteFooter />
      </>
    );
  }

  // Otherwise fall back to a published Signalor post (DB), if one matches.
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={blogPostingLd({
          slug: post.slug,
          title: post.title,
          description: toMetaDescription(post.description || post.content_html),
          image: post.image_url || OG_IMAGE,
          datePublished: post.published_at ?? undefined,
          author: SITE_NAME,
        })}
      />
      <TopNav />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
          <Link href="/" className="eyebrow text-ink-soft transition-colors hover:text-ink">
            ← Home
          </Link>
          <header className="mt-6 border-b border-line pb-8">
            <time className="eyebrow text-ink-faint">{formatDbDate(post.published_at)}</time>
            <h1 className="headline mt-4 text-5xl font-bold uppercase text-ink sm:text-6xl">
              {post.title}
            </h1>
            {post.description ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">{post.description}</p>
            ) : null}
          </header>
          {post.image_url ? (
            <div className="mt-8 overflow-hidden border border-line">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image_url}
                alt={`Cover image for ${post.title}`}
                className="w-full object-cover"
              />
            </div>
          ) : null}
          <div
            className="mt-8 [&_a]:text-accent [&_a]:underline [&_h2]:font-display [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:text-ink [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:text-ink-soft [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:mt-4"
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
