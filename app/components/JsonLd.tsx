// Reusable structured-data (JSON-LD) injector.
// Renders one <script type="application/ld+json"> from a server-built object,
// so search engines can read WebSite / Organization / BlogPosting / ItemList data.

type JsonLdData = Record<string, unknown>;

export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      // Trusted, server-serialized structured data — never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
