import { site } from "../data/site";

const pages = ["/", "/tseni/", "/demo/", "/kak-raboti/", "/za-nas/", "/za-nas/dean-dechev/", "/za-nas/mariyan-dechev/", "/kakvo-e-ai-retseptsionist/", "/kolko-obazhdaniya-propuska-biznesat/", "/politika-za-poveritelnost/", "/politika-za-biskvitki/", "/obshti-usloviya/", "/danni-za-druzhestvoto/"];
const lastModified = "2026-07-15";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (path) => `  <url>
    <loc>${site.url}${path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
