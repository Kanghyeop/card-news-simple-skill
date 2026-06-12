// HTML → PNG 일괄 캡처
// 사용법: node scripts/capture.mjs output/<폴더>
// 폴더 내 *.html 전부를 1080x1350 PNG로 캡처해 같은 이름으로 저장한다.
import { chromium } from "playwright";
import { readdir } from "node:fs/promises";
import { resolve, join, basename } from "node:path";
import { pathToFileURL } from "node:url";

const dir = process.argv[2];
if (!dir) {
  console.error("사용법: node scripts/capture.mjs <html 폴더>");
  process.exit(1);
}

const absDir = resolve(dir);
const files = (await readdir(absDir)).filter((f) => f.endsWith(".html")).sort();
if (files.length === 0) {
  console.error(`HTML 파일이 없습니다: ${absDir}`);
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1080, height: 1350 },
  deviceScaleFactor: 1,
});

for (const file of files) {
  const htmlPath = join(absDir, file);
  const pngPath = join(absDir, basename(file, ".html") + ".png");
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: pngPath });
  console.log(`✓ ${basename(pngPath)}`);
}

await browser.close();
console.log(`완료: ${files.length}장 → ${absDir}`);
