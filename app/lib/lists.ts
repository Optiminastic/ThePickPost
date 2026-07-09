// Data layer for The Pick Post — the curated listicle journal.
// Single source of truth for ranked list blog posts. Presentation components
// depend on these types, never the other way around.

export type Category =
  | "SEO & Marketing"
  | "Productivity"
  | "Web Development"
  | "Design & Creative";

export interface ListEntry {
  /** The thing being ranked — a tool, app, tactic, etc. */
  name: string;
  /** One- or two-sentence verdict. */
  blurb: string;
  /** Quick qualifier, e.g. "Best for beginners" or "Free". */
  tag?: string;
}

export interface Listicle {
  slug: string;
  title: string;
  /** Kept only as an internal label — not shown as navigation/filters. */
  category: Category;
  /** How many items the list ranks (drives the "TOP N" badge). */
  count: number;
  excerpt: string;
  /** ISO date string (server-stable, no client clock). */
  date: string;
  readingTime: number;
  author: string;
  authorRole: string;
  /** Intro paragraphs before the ranked list. */
  intro: string[];
  entries: ListEntry[];
  /** Optional closing line / takeaway. */
  closing?: string;
}

const LISTS: Listicle[] = [
  {
    slug: "top-3-seo-tools-2026",
    title: "Top 3 SEO Tools Every Marketer Needs in 2026",
    category: "SEO & Marketing",
    count: 3,
    excerpt:
      "Skip the bloated all-in-one suites. These three tools cover research, on-page, and tracking without draining the budget.",
    date: "2026-06-20",
    readingTime: 6,
    author: "Priya Anand",
    authorRole: "SEO Lead",
    intro: [
      "There are dozens of SEO platforms competing for your subscription, and most overlap by 80%. After a year of testing across client accounts, we narrowed the must-haves to three tools that each own a distinct job — and play well together.",
      "Buy these before anything else; everything else is a nice-to-have.",
    ],
    entries: [
      {
        name: "Ahrefs",
        tag: "Best overall",
        blurb:
          "The deepest backlink index in the business, plus keyword and content research that consistently surfaces opportunities competitors miss. Pricey, but it replaces three other subscriptions.",
      },
      {
        name: "Google Search Console",
        tag: "Free",
        blurb:
          "The only tool reporting real query and click data straight from Google. No third-party estimate beats first-party truth — and it costs nothing.",
      },
      {
        name: "Screaming Frog",
        tag: "Best for audits",
        blurb:
          "A desktop crawler that finds broken links, redirect chains, and thin pages in minutes. Indispensable before any technical SEO project.",
      },
    ],
    closing:
      "Master these three before adding anything to your stack — most teams never need more.",
  },
  {
    slug: "top-10-free-keyword-research-tactics",
    title: "Top 10 Free Keyword Research Tactics",
    category: "SEO & Marketing",
    count: 10,
    excerpt:
      "You don't need a paid tool to find what people are searching for. Ten zero-cost ways to build a keyword list that converts.",
    date: "2026-06-11",
    readingTime: 9,
    author: "Priya Anand",
    authorRole: "SEO Lead",
    intro: [
      "Keyword research has a reputation for being expensive, but most of the signal you need is sitting in free, public sources. Here are ten tactics that cost nothing and consistently uncover terms worth targeting.",
    ],
    entries: [
      { name: "Mine Google autocomplete", blurb: "Type your seed term and note every suggestion — these are real, popular queries ranked by frequency." },
      { name: "Read 'People Also Ask'", blurb: "Each expanded question reveals related intent you can answer in one post." },
      { name: "Scrape 'Related searches'", blurb: "The bottom of the results page is a free map of adjacent topics." },
      { name: "Check Reddit and forums", blurb: "The exact phrasing people use in communities makes excellent long-tail keywords." },
      { name: "Use Google Trends", blurb: "Compare terms and spot rising queries before competitors do." },
      { name: "Raid YouTube autocomplete", blurb: "Video search reveals how-to intent that's often easier to rank for." },
      { name: "Study competitor headings", blurb: "Their H2s and H3s are a free outline of the keywords they're chasing." },
      { name: "Search Amazon and reviews", blurb: "Product queries expose buyer-intent language money keywords are built on." },
      { name: "Pull questions from Quora", blurb: "High-engagement questions signal demand and exact wording." },
      { name: "Read your own Search Console", blurb: "Queries you already rank for on page two are your fastest wins." },
    ],
    closing: "Combine three or four of these and you'll have a richer list than most paid exports.",
  },
  {
    slug: "top-10-note-taking-apps",
    title: "Top 10 Note-Taking Apps for 2026",
    category: "Productivity",
    count: 10,
    excerpt:
      "Whether you think in outlines, networks, or plain text, one of these ten will finally make your notes stick.",
    date: "2026-06-16",
    readingTime: 9,
    author: "Dana Cole",
    authorRole: "Productivity Writer",
    intro: [
      "The best note app is the one you'll actually open, but the differences in philosophy are real. We ranked ten by how well they fit a distinct way of thinking.",
    ],
    entries: [
      { name: "Obsidian", tag: "Best for power users", blurb: "Local Markdown files plus a linked graph you fully own." },
      { name: "Notion", tag: "Best all-rounder", blurb: "Docs, databases, and wikis in one flexible workspace." },
      { name: "Apple Notes", tag: "Best built-in", blurb: "Fast, synced, and shockingly capable for free." },
      { name: "Capacities", tag: "Best object-based", blurb: "Notes as connected objects rather than nested folders." },
      { name: "Logseq", tag: "Best outliner", blurb: "Open-source, block-based, and great for daily journaling." },
      { name: "Bear", tag: "Best for writing", blurb: "A beautiful, distraction-free Markdown editor." },
      { name: "Google Keep", tag: "Best for quick capture", blurb: "Sticky-note speed for fleeting thoughts." },
      { name: "Craft", tag: "Best looking", blurb: "Polished documents that feel native on Apple devices." },
      { name: "Anytype", tag: "Best for privacy", blurb: "Local-first and encrypted, with a Notion-like feel." },
      { name: "Roam Research", tag: "Best for networked thought", blurb: "The tool that popularized bidirectional links." },
    ],
    closing: "Pick one and commit for a month before switching — the system matters more than the app.",
  },
  {
    slug: "top-6-ai-assistants-daily-work",
    title: "Top 6 AI Assistants for Daily Work",
    category: "Productivity",
    count: 6,
    excerpt:
      "The AI assistant landscape moves weekly. Here are six that have earned a permanent spot in real workflows.",
    date: "2026-05-22",
    readingTime: 8,
    author: "Dana Cole",
    authorRole: "Productivity Writer",
    intro: [
      "Most AI tools are features in disguise. These six are genuine workhorses that change how a normal workday runs — picked for reliability, not novelty.",
    ],
    entries: [
      { name: "Claude", tag: "Best for writing & code", blurb: "Long-context reasoning that handles big documents and codebases with a careful, on-the-nose tone." },
      { name: "ChatGPT", tag: "Best all-rounder", blurb: "A strong generalist with a vast plugin and tooling ecosystem." },
      { name: "Perplexity", tag: "Best for research", blurb: "Cited, up-to-date answers that save hours of searching." },
      { name: "GitHub Copilot", tag: "Best for coding", blurb: "Inline suggestions that speed up everyday development." },
      { name: "Otter", tag: "Best for meetings", blurb: "Live transcription and summaries you'll actually reread." },
      { name: "Granola", tag: "Best for notes", blurb: "Turns messy meeting notes into clean, shareable recaps." },
    ],
  },
  {
    slug: "top-10-vscode-extensions",
    title: "Top 10 VS Code Extensions for Developers",
    category: "Web Development",
    count: 10,
    excerpt:
      "Turn the default editor into a powerhouse. Ten extensions that earn their place in nearly every developer's setup.",
    date: "2026-06-19",
    readingTime: 8,
    author: "Sam Okafor",
    authorRole: "Software Engineer",
    intro: [
      "VS Code is great out of the box and unstoppable with the right extensions. We kept this list tight — ten tools that pay for their keystrokes across almost any stack.",
    ],
    entries: [
      { name: "ESLint", tag: "Must-have", blurb: "Catches bugs and style issues as you type." },
      { name: "Prettier", tag: "Must-have", blurb: "Formats code on save so you never argue about style again." },
      { name: "GitLens", blurb: "Surfaces blame, history, and authorship inline." },
      { name: "Error Lens", blurb: "Puts errors and warnings right on the offending line." },
      { name: "Path Intellisense", blurb: "Autocompletes file paths so imports just work." },
      { name: "Thunder Client", blurb: "A lightweight REST client without leaving the editor." },
      { name: "Tailwind CSS IntelliSense", blurb: "Autocomplete and previews for utility classes." },
      { name: "Code Spell Checker", blurb: "Stops typos from sneaking into variables and docs." },
      { name: "Docker", blurb: "Manage containers and images from the sidebar." },
      { name: "GitHub Copilot", blurb: "AI completions that scaffold boilerplate fast." },
    ],
  },
  {
    slug: "top-5-frontend-frameworks",
    title: "Top 5 Frontend Frameworks in 2026",
    category: "Web Development",
    count: 5,
    excerpt:
      "React isn't the only answer anymore. Five frameworks worth knowing — and exactly when to reach for each.",
    date: "2026-06-05",
    readingTime: 9,
    author: "Sam Okafor",
    authorRole: "Software Engineer",
    intro: [
      "The framework wars cooled into something healthier: a set of mature tools, each with a clear sweet spot. Here are five and the projects they suit best.",
    ],
    entries: [
      { name: "Next.js", tag: "Best for full-stack React", blurb: "The default for production React apps with server rendering and routing built in." },
      { name: "SvelteKit", tag: "Best DX", blurb: "Less boilerplate, compiled output, and a joy to write." },
      { name: "Astro", tag: "Best for content sites", blurb: "Ships zero JS by default — ideal for blogs and marketing pages." },
      { name: "Remix", tag: "Best for web standards", blurb: "Leans on the platform with nested routes and progressive enhancement." },
      { name: "SolidStart", tag: "Best performance", blurb: "Fine-grained reactivity with near-vanilla speed." },
    ],
  },
  {
    slug: "top-5-free-stock-photo-sites",
    title: "Top 5 Free Stock Photo Sites (No Attribution)",
    category: "Design & Creative",
    count: 5,
    excerpt:
      "Great visuals without the licensing headache. Five sites with genuinely free, high-quality photography.",
    date: "2026-06-13",
    readingTime: 5,
    author: "Lena Voss",
    authorRole: "Brand Designer",
    intro: [
      "Stock photos can make or break a page, and you don't need a budget to use good ones. These five offer high-resolution images you can use commercially, no attribution required.",
    ],
    entries: [
      { name: "Unsplash", tag: "Best overall", blurb: "A massive, well-curated library with a clean search." },
      { name: "Pexels", tag: "Best for video too", blurb: "Photos and free stock video in one place." },
      { name: "Pixabay", tag: "Best variety", blurb: "Photos, illustrations, and vectors under one license." },
      { name: "Burst", tag: "Best for ecommerce", blurb: "Shopify's library, tuned for product and business shots." },
      { name: "Kaboompics", tag: "Best for lifestyle", blurb: "Cohesive, styled sets with matching color palettes." },
    ],
  },
  {
    slug: "top-7-color-palette-generators",
    title: "Top 7 Color Palette Generators for Designers",
    category: "Design & Creative",
    count: 7,
    excerpt:
      "Stop guessing at color. Seven tools that turn a single shade — or a photo — into a palette that works.",
    date: "2026-05-15",
    readingTime: 6,
    author: "Lena Voss",
    authorRole: "Brand Designer",
    intro: [
      "Color is the fastest way to make (or break) a design's first impression. These seven generators help you build harmonious palettes without a color-theory degree.",
    ],
    entries: [
      { name: "Coolors", tag: "Best overall", blurb: "Spacebar-to-generate speed with locking and export." },
      { name: "Adobe Color", tag: "Best for harmony rules", blurb: "Color-theory wheels and accessibility checks built in." },
      { name: "Realtime Colors", tag: "Best for previews", blurb: "See your palette on a real UI mockup instantly." },
      { name: "Khroma", tag: "Best AI tool", blurb: "Learns your taste and suggests endless on-brand combos." },
      { name: "Color Hunt", tag: "Best for inspiration", blurb: "A curated feed of ready-made four-color palettes." },
      { name: "Paletton", tag: "Best for control", blurb: "Fine-tune schemes with classic color-wheel precision." },
      { name: "Leonardo", tag: "Best for accessibility", blurb: "Generate palettes that meet contrast targets by design." },
    ],
  },
];

/** Lists sorted newest-first. */
export function getAllLists(): Listicle[] {
  return [...LISTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getListBySlug(slug: string): Listicle | undefined {
  return LISTS.find((l) => l.slug === slug);
}

export function getAllSlugs(): string[] {
  return LISTS.map((l) => l.slug);
}

/** Stable formatter — avoids locale/clock differences between server and client. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}

/** Short meta line shown on cards, e.g. "10 picks · 6 min". */
export function cardMeta(list: Listicle): string {
  return `${list.count} picks · ${list.readingTime} min`;
}

const MONTHS_SHORT = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];
const WEEKDAYS_SHORT = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/**
 * Deterministic date stamp for the row's left block (weekday + day + month),
 * computed from a fixed ISO date so server and client always agree.
 */
export function dateBlock(iso: string): {
  weekday: string;
  day: string;
  month: string;
} {
  const [year, month, day] = iso.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return {
    weekday: WEEKDAYS_SHORT[weekday],
    day: String(day).padStart(2, "0"),
    month: MONTHS_SHORT[month - 1],
  };
}
