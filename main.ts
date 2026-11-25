// QueuePal — "The Worst App Idea Ever Pitched" (make.fun).
// One sentence, at most 240 characters, pitching the worst and most useless
// app idea imaginable: a product that sounds real, a founder who sounds
// certain, and a function nobody on earth needs.
// Writes the pitch to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { isAbsolute, join, dirname } from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const PITCH =
  "QueuePal lets you pay certified strangers $2 to queue for you at shops with no queue, then livestreams their confident wait in 4K, because our founder calls it the future of waiting for a queue that never existed.";

// Gate: exactly one sentence, at most 240 characters. No decimals, no
// abbreviations: a naive splitter counting "." must see exactly one, the
// final period, and no other sentence terminator may appear.
const sentences = PITCH.split(".").filter((s) => s.trim().length > 0);
if (sentences.length !== 1 || !PITCH.endsWith(".")) {
  throw new Error(`entry must be exactly one sentence, got ${sentences.length}`);
}
if (/[?!;]/.test(PITCH)) {
  throw new Error("entry must not contain other sentence terminators");
}
if (PITCH.length > 240) {
  throw new Error(`entry must be at most 240 characters, got ${PITCH.length}`);
}

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
const dest = outDir
  ? isAbsolute(outDir)
    ? join(outDir, "entry.txt")
    : join(repoRoot, outDir, "entry.txt")
  : join(repoRoot, "out", "entry.txt");

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, PITCH, "utf8");
