import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const apps = [
  { name: "insights", display: "Insights", bg: "#f8fafc", text: "#0f172a" },
  { name: "invoice", display: "Invoice", bg: "#ffffff", text: "#0f172a" },
  { name: "lumina", display: "Lumina", bg: "#0f172a", text: "#f8fafc" },
  { name: "opencomms", display: "OpenComms", bg: "#ffffff", text: "#0f172a" },
  { name: "traqr", display: "Traqr", bg: "#f1f5f9", text: "#0f172a" },
  { name: "zendo", display: "Zendo", bg: "#fffbf5", text: "#0f172a" },
];

function parseLogoSvg(svg) {
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/i);
  const viewBox = viewBoxMatch?.[1] ?? "0 0 100 100";

  // Extract inner content between the root <svg ...> and </svg>
  const contentMatch = svg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  const content = contentMatch?.[1]?.trim() ?? svg;
  return { viewBox, content };
}

function buildIconSvg({ bg, logoViewBox, logoContent }) {
  return `
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" rx="180" fill="${bg}"/>
  <svg x="262" y="262" width="500" height="500" viewBox="${logoViewBox}">
    ${logoContent}
  </svg>
</svg>
`.trim();
}

function buildSplashSvg({ bg, text, display, logoViewBox, logoContent }) {
  return `
<svg width="2732" height="2732" xmlns="http://www.w3.org/2000/svg">
  <rect width="2732" height="2732" fill="${bg}"/>
  <svg x="1066" y="966" width="600" height="600" viewBox="${logoViewBox}">
    ${logoContent}
  </svg>
  <text x="1366" y="1720" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="140" font-weight="600" text-anchor="middle" fill="${text}">${display}</text>
</svg>
`.trim();
}

async function generateForApp(app) {
  const appDir = path.resolve(`apps/${app.name}`);
  const assetsDir = path.join(appDir, "assets");
  await fs.mkdir(assetsDir, { recursive: true });

  let logoSvg = "";
  const logoPath = path.join(appDir, "public", "logo.svg");
  const faviconPath = path.join(appDir, "public", "favicon.svg");
  try {
    logoSvg = await fs.readFile(logoPath, "utf8");
  } catch {
    try {
      logoSvg = await fs.readFile(faviconPath, "utf8");
    } catch {
      console.warn(`  No logo.svg or favicon.svg found for ${app.name}, using fallback shape.`);
      logoSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="#94a3b8"/></svg>`;
    }
  }

  const { viewBox, content } = parseLogoSvg(logoSvg);

  const iconSvg = buildIconSvg({ bg: app.bg, logoViewBox: viewBox, logoContent: content });
  const splashSvg = buildSplashSvg({
    bg: app.bg,
    text: app.text,
    display: app.display,
    logoViewBox: viewBox,
    logoContent: content,
  });

  const iconPng = Buffer.from(iconSvg);
  const splashPng = Buffer.from(splashSvg);

  await sharp(iconPng, { density: 72 }).resize(1024, 1024).png().toFile(path.join(assetsDir, "icon.png"));
  await sharp(splashPng, { density: 72 }).resize(2732, 2732).png().toFile(path.join(assetsDir, "splash.png"));

  console.log(`Generated assets for ${app.name}`);
}

async function main() {
  const requested = process.argv[2];
  const toGenerate = requested ? apps.filter((a) => a.name === requested) : apps;

  if (toGenerate.length === 0) {
    console.error(`Unknown app: ${requested}`);
    process.exit(1);
  }

  for (const app of toGenerate) {
    await generateForApp(app);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
