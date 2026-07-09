import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/app/lib/seo";

// Dynamic 1200×630 social share card for The Pick Post. Rendered on demand,
// so it never runs at build time and stays in sync with the brand.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f4ef",
          color: "#141414",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            Curated Top-10 Lists,
            <br />
            Roundups &amp; Tool Picks
          </div>
          <div style={{ fontSize: 34, color: "#5a5a5a" }}>{SITE_TAGLINE}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#e8552f",
            fontWeight: 700,
          }}
        >
          thepickpost.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
