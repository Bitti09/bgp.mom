import fs from "fs";
import path from "path";

/**
 * Generates a trimmed flag-icons stylesheet containing only the country
 * flags actually referenced by provider locations in data/vps/*.json.
 *
 * flag-icons ships ~260 countries (~411 KiB of inline SVG data URIs once
 * bundled). The directory only uses ~40, so this cuts the CSS payload
 * dramatically. Run automatically before `dev` and `build`.
 *
 * The generated CSS keeps `url()` references to the real flag SVGs so
 * Vite's asset pipeline handles them: small flags get inlined into the
 * CSS, and large ones (Spain, Mexico) become separately cached assets.
 */

const DATA_DIR = "data/vps";
const SOURCE_CSS = "node_modules/flag-icons/css/flag-icons.css";
const OUTPUT_FILE = "src/assets/flag-icons-trimmed.css";

function getUsedCountryCodes() {
  const codes = new Set();
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(DATA_DIR, file), "utf-8"),
      );
      for (const location of data.locations || []) {
        const cc = location.split(", ").pop()?.trim().toLowerCase();
        if (cc && /^[a-z]{2}$/.test(cc)) {
          codes.add(cc);
        }
      }
    } catch {
      // Skip unreadable files; the schema check catches real issues later.
    }
  }

  return codes;
}

function extractRules(css, codes) {
  const kept = [];
  const blocks = css.split(/\n(?=\.)/); // split before each top-level selector

  for (const block of blocks) {
    const selector = block.match(/^\.([a-z-]+)/)?.[1] ?? "";

    // Keep the shared base rules (.fib, .fi, .fi:before, .fi.fis, .fi-xx)
    if (selector === "fib" || selector === "fi" || selector === "fi-xx") {
      kept.push(block);
      continue;
    }

    // Skip the 1x1 (.fis) variants: Card.astro only ever renders `fi fi-xx`.
    if (block.includes(".fis")) {
      continue;
    }

    // Keep 4x3 per-country rules only when used (e.g. .fi-de)
    const cc = selector.match(/^fi-([a-z]{2})$/)?.[1];
    if (cc && codes.has(cc)) {
      kept.push(block);
    }
  }

  return (
    kept
      .join("\n")
      // Rewrite flag URLs so Vite can resolve them from src/assets/
      .replace(
        /url\(\.\.\/flags\//g,
        "url(../../node_modules/flag-icons/flags/",
      )
      .trim() + "\n"
  );
}

function generate() {
  if (!fs.existsSync(SOURCE_CSS)) {
    console.warn(
      "flag-icons CSS not found; skipping trimmed flag stylesheet.",
    );
    return;
  }

  const codes = getUsedCountryCodes();
  const css = fs.readFileSync(SOURCE_CSS, "utf-8");
  const trimmed = extractRules(css, codes);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, trimmed);

  const size = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(
    `Flag CSS generated with ${codes.size} countries -> ${OUTPUT_FILE} (${size} KiB)`,
  );
}

generate();
