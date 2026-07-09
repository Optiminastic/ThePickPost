"use client";

import { useState } from "react";
import type { FeedItem } from "@/app/lib/feed";
import EventRow from "./EventRow";

// Live keyword search over the full homepage feed (curated lists + published
// Signalor posts). Filters by title and excerpt as you type; no page reload.
export default function SearchableFeed({ items }: { items: FeedItem[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const results = query
    ? items.filter(
        (it) =>
          it.title.toLowerCase().includes(query) ||
          it.excerpt.toLowerCase().includes(query),
      )
    : items;

  return (
    <>
      {/* Search */}
      <div className="mt-10 flex items-center gap-3 border-b border-line-strong pb-3">
        <span aria-hidden className="text-xl text-ink">
          ⌕
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="SEARCH FOR A LIST OR POST"
          aria-label="Search lists and posts"
          className="eyebrow w-full bg-transparent text-ink outline-none placeholder:text-ink-faint"
        />
        {query ? (
          <span className="eyebrow shrink-0 whitespace-nowrap text-ink-faint">
            {results.length} result{results.length === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>

      {/* Results — same card for every entry */}
      <div id="lists">
        {results.length === 0 ? (
          <p className="py-16 text-center text-sm text-ink-soft">
            No lists or posts match &ldquo;{q.trim()}&rdquo;.
          </p>
        ) : (
          results.map((item) => <EventRow key={`${item.kind}-${item.slug}`} item={item} />)
        )}
      </div>
    </>
  );
}
