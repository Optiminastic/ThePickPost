import TopNav from "@/app/components/TopNav";
import SearchableFeed from "@/app/components/SearchableFeed";
import SubscribeNow from "@/app/components/SubscribeNow";
import SiteFooter from "@/app/components/SiteFooter";
import JsonLd from "@/app/components/JsonLd";
import { getFeedItems } from "@/app/lib/feed";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/app/lib/seo";

export const revalidate = 300;

export default async function Home() {
  const items = await getFeedItems();

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  };

  return (
    <>
      <JsonLd data={[websiteLd, organizationLd]} />
      <TopNav />

      <main>
        {/* Hero */}
        <section className="px-5 pb-8 pt-10 sm:px-8 sm:pt-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="headline text-6xl font-bold uppercase text-ink sm:text-8xl">
              All Lists
            </h1>
            <p className="max-w-xs text-lg font-medium uppercase leading-tight tracking-tight text-ink sm:text-right sm:text-xl">
              The picks worth your time, ranked
            </p>
          </div>

          {/* Live search over all lists + posts, then the full feed */}
          <SearchableFeed items={items} />
        </section>

        <div className="mt-10">
          <SubscribeNow />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
