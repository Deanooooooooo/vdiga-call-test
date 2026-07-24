import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const distDir = new URL("../dist/", import.meta.url);
const failures = [];

async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory.pathname, entry.name);

    if (entry.isDirectory()) {
      await inspect(new URL(`${entry.name}/`, directory));
      continue;
    }

    if (!entry.name.endsWith(".html")) continue;

    const html = await readFile(path, "utf8");
    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const alt = tag.match(/\balt\s*=\s*(["'])(.*?)\1/i);
      if (!alt || alt[2].trim() === "") {
        failures.push(`${path}: ${tag}`);
      }
    }
  }
}

await inspect(distDir);

if (failures.length > 0) {
  throw new Error(
    `Images without meaningful alt text:\n${failures.join("\n")}`,
  );
}

console.log("Image alt audit passed.");
