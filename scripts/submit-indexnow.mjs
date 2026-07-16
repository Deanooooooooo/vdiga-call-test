import { readFile } from "node:fs/promises";

const host = "vdiga.bg";
const origin = `https://${host}`;
const key = "b33077ad677ef89a678066efa8c0c5c1";
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

const payload = JSON.stringify({ host, key, keyLocation, urlList });
const retryableStatuses = new Set([403, 429, 500, 502, 503, 504]);
const delays = [0, 2_000, 5_000];
let lastError;

for (const [attempt, delay] of delays.entries()) {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: payload,
  });

  if (response.ok) {
    console.log(`Submitted ${urlList.length} URLs to IndexNow (${response.status}).`);
    lastError = undefined;
    break;
  }

  const body = await response.text();
  lastError = new Error(
    `IndexNow attempt ${attempt + 1} returned ${response.status}${body ? `: ${body}` : ""}`,
  );

  if (!retryableStatuses.has(response.status)) {
    break;
  }
}

if (lastError) {
  throw lastError;
}
