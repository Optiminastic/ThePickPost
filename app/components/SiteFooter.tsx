import Link from "next/link";

const FOLLOW = ["Instagram", "Twitter", "Facebook", "YouTube"];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="grid grid-cols-2 gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
        {/* Brand + blurb */}
        <div className="col-span-2 md:col-span-1">
          <Link
            href="/"
            className="font-display text-2xl font-bold italic tracking-tight text-accent"
          >
            The Pick Post
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            We test the tools, apps and tactics so you don&apos;t have to — then
            rank only the ones worth your time.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="eyebrow text-ink-faint">Contact</h3>
          <address className="mt-4 space-y-1 text-sm not-italic text-ink-soft">
            <p>The Pick Post HQ</p>
            <p>Unit 5, 42–90 Editorial Street</p>
            <p>London EC1 4QJ, UK</p>
            <p>hello@roundup.example</p>
          </address>
        </div>

        {/* Follow */}
        <div>
          <h3 className="eyebrow text-ink-faint">Follow</h3>
          <ul className="mt-4 space-y-2.5">
            {FOLLOW.map((f) => (
              <li key={f}>
                <Link
                  href="/#subscribe"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="flex flex-col gap-2 px-5 py-5 text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="eyebrow">© 2026 The Pick Post · Curated lists</span>
          <span className="eyebrow flex gap-5">
            <Link href="/" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-ink">
              Terms
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
