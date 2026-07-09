import Link from "next/link";
import { dateBlock } from "@/app/lib/lists";
import type { FeedItem } from "@/app/lib/feed";
import CoverTile from "./CoverTile";

// One feed item — a curated list OR a published Signalor post — rendered as a
// magazine "event" row: a date stamp, a generative thumbnail, the title + meta +
// excerpt, and an orange jump arrow. Same card for every entry on the homepage.
export default function EventRow({ item }: { item: FeedItem }) {
  const date = dateBlock(item.date);
  const meta = item.kind === "list" ? `${item.count} picks` : "Article";

  return (
    <Link
      href={`/${item.slug}`}
      className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-6 sm:grid-cols-[4.5rem_13rem_1fr_2rem] sm:gap-x-6 sm:py-7"
    >
      {/* Date block */}
      <div className="pt-1 text-center">
        <div className="eyebrow text-ink-faint">{date.weekday}</div>
        <div className="font-display text-3xl font-semibold leading-none text-ink sm:text-4xl">
          {date.day}
        </div>
        <div className="eyebrow mt-1 text-ink-faint">{date.month}</div>
      </div>

      {/* Thumbnail */}
      <div className="relative col-span-2 mt-3 sm:col-span-1 sm:mt-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <CoverTile
            slug={item.slug}
            count={item.count ?? 0}
            showRank={false}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-paper text-ink shadow-sm ring-1 ring-line">
            ›
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-2 mt-4 sm:col-span-1 sm:mt-0">
        <h3 className="font-display text-2xl font-semibold uppercase leading-[0.95] tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
          {item.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-ink-soft">
          <span className="text-sm">{meta}</span>
        </div>

        <p className="clamp-2 mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
          {item.excerpt}
        </p>
      </div>

      {/* Jump arrow */}
      <div className="hidden items-start justify-end pt-1 sm:flex">
        <span
          aria-hidden
          className="text-2xl text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>
    </Link>
  );
}
