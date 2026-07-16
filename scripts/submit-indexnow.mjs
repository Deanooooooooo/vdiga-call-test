import { readFile } from "node:fs/promises";

const host = "vdiga.bg";
const origin = `https://${host}`;
const key = "df88cfddf9c02fd7a719288a3a31ddfa";
const keyLocation = `${origin}/${key}.txt`;

const sitemap = await readFile(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1].trim())
  .filter((url) => {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.host === host;
  });

if (urlList.length === 0) {
  throw new Error("No canonical Vdiga URLs found in dist/sitemap.xml");
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

if (!response.ok) {
  const body = await response.text();
  throw new Error(`IndexNow returned ${response.status}${body ? `: ${body}` : ""}`);
}

console.log(`Submitted ${urlList.length} URLs to IndexNow (${response.status}).`);
