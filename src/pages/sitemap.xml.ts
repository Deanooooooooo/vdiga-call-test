import { site } from "../data/site";
import { publishedPages } from "../data/content-pages";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publishedPages
  .map(
    (page) => `  <url>
    <loc>${site.url}${page.path}</loc>
    <lastmod>${page.dateModified}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.path === "/" ? "1.0" : page.priority === "P1" ? "0.8" : "0.6"}</priority>
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
