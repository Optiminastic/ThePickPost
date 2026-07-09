import Link from "next/link";

// Top bar: wordmark on the left, subscribe on the right.
export default function TopNav() {
  return (
    <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
      <Link href="/" className="flex items-center gap-2.5">
        <svg
          width="26"
          height="26"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="8" cy="9" r="2" fill="#e1401b" />
          <rect x="13" y="7.5" width="14" height="3" rx="1.5" fill="#161616" />
          <circle cx="8" cy="16" r="2" fill="#e1401b" />
          <rect x="13" y="14.5" width="10" height="3" rx="1.5" fill="#161616" />
          <circle cx="8" cy="23" r="2" fill="#e1401b" />
          <rect x="13" y="21.5" width="7" height="3" rx="1.5" fill="#161616" />
        </svg>
        <span className="font-display text-2xl font-bold italic tracking-tight text-accent">
          The Pick Post
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href="/#subscribe"
          className="eyebrow font-semibold text-accent transition-colors hover:text-ink"
        >
          Subscribe
        </Link>
      </div>
    </header>
  );
}
