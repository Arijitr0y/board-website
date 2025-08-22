import JSZip from "jszip";

type Unit = "mm" | "inch" | "unknown";

function detectUnitsFromGerber(text: string): Unit {
  if (/%MOMM/i.test(text)) return "mm";
  if (/%MOIN/i.test(text)) return "inch";
  return "unknown";
}

function detectFormatDecimalDigits(text: string): number | null {
  const m =
    text.match(/%FSLAX(\d)(\d)Y(\d)(\d)\*?%/i) ||
    text.match(/%FSLA[XY]?(\d)(\d)Y?(\d)(\d)\*?%/i) ||
    text.match(/%FSAX(\d)(\d)Y(\d)(\d)\*?%/i);
  if (m && m.length >= 5) {
    const decX = Number(m[2]);
    const decY = Number(m[4]);
    if (Number.isFinite(decX) && Number.isFinite(decY)) {
      return Math.max(decX, decY);
    }
  }
  return null;
}

function parseCoordToken(token: string, dec: number | null): number {
  if (token.includes(".")) return parseFloat(token);
  const digits = dec ?? 4;
  const intVal = parseInt(token, 10);
  if (Number.isNaN(intVal)) return NaN;
  return intVal / Math.pow(10, digits);
}

function extractBoardDimensionsFromText(text: string): { widthMM: number; heightMM: number; units: Unit } | null {
  const moUnits = detectUnitsFromGerber(text);
  const decimalDigits = detectFormatDecimalDigits(text);

  const xyLine = /X([+-]?\d+\.?\d*)?Y([+-]?\d+\.?\d*)?/gi;
  let m: RegExpExecArray | null;

  let lastX: number | null = null;
  let lastY: number | null = null;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  while ((m = xyLine.exec(text)) !== null) {
    const rawX = m[1];
    const rawY = m[2];

    if (rawX != null) lastX = parseCoordToken(rawX, decimalDigits);
    if (rawY != null) lastY = parseCoordToken(rawY, decimalDigits);
    if (!Number.isFinite(lastX!) || !Number.isFinite(lastY!)) continue;

    minX = Math.min(minX, lastX!);
    maxX = Math.max(maxX, lastX!);
    minY = Math.min(minY, lastY!);
    maxY = Math.max(maxY, lastY!);
  }

  if (!isFinite(minX) || !isFinite(maxX) || !isFinite(minY) || !isFinite(maxY)) return null;

  let width = maxX - minX;
  let height = maxY - minY;

  let units: Unit = moUnits;
  if (units === "unknown") {
    const asMM = { w: width * 25.4, h: height * 25.4 };
    const plausibleAsInch = width >= 0.4 && width <= 40 && height >= 0.4 && height <= 40;
    const plausibleAsMM = asMM.w >= 10 && asMM.w <= 1000 && asMM.h >= 10 && asMM.h <= 1000;
    if (plausibleAsMM && !plausibleAsInch) units = "inch";
    else if (plausibleAsInch && !plausibleAsMM) units = "mm";
  }

  if (units === "inch") {
    width *= 25.4;
    height *= 25.4;
  }
  return { widthMM: Math.abs(width), heightMM: Math.abs(height), units: units === "unknown" ? "mm" : units };
}

function classifyLayer(name: string) {
  const n = name.toLowerCase();
  if (/\.(gtl|top.*cu)/i.test(n) || /top.*(copper|layer)/.test(n)) return "Top Copper";
  if (/\.(gbl|bottom.*cu)/i.test(n) || /bottom.*(copper|layer)/.test(n)) return "Bottom Copper";
  if (/\.(g2|g3|g4|gp2|gp3)/i.test(n) || /in\d?_?cu|inner/i.test(n)) return "Inner Copper";
  if (/\.(gko|gml|gm1|oln)/i.test(n) || /(edge|outline)/i.test(n)) return "Board Outline";
  return "Other";
}

interface GerberAnalysisResult {
    dimensions: { widthMM: number; heightMM: number; units: Unit } | null;
    layerCount: number;
}

export async function analyzeGerberFiles(files: File[]): Promise<GerberAnalysisResult> {
    const items: { name: string; content: string }[] = [];
    const first = files[0];

    if (first.name.toLowerCase().endsWith(".zip") && files.length === 1) {
        const zip = await JSZip.loadAsync(first);
        await Promise.all(
          Object.keys(zip.files).map(async (name) => {
            const f = zip.files[name];
            if (!f.dir) {
              const content = await f.async("string");
              items.push({ name, content });
            }
          })
        );
    } else {
        for (const f of Array.from(files)) {
            const content = await f.text();
            items.push({ name: f.name, content });
        }
    }

    let outline = items.find((it) => /(edge[_-]?cuts|outline|gko|gml|gm1|oln)/i.test(it.name));
    let dims = outline ? extractBoardDimensionsFromText(outline.content) : null;
    if (!dims) {
      for (const it of items) {
        dims = extractBoardDimensionsFromText(it.content);
        if (dims) break;
      }
    }

    const layerKinds = items.map((f) => classifyLayer(f.name));
    const hasTopCu = layerKinds.includes("Top Copper");
    const hasBotCu = layerKinds.includes("Bottom Copper");
    const innerCount = layerKinds.filter((k) => k === "Inner Copper").length;
    let layerCount = (hasTopCu ? 1 : 0) + innerCount + (hasBotCu ? 1 : 0);
    if(layerCount === 0 && items.length > 0) layerCount = 1;
    if(layerCount === 1) layerCount = 2;


    return {
        dimensions: dims,
        layerCount,
    }
}
