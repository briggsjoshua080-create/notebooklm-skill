/* Generates app icons (no external deps) using Node's built-in zlib.
 * Draws a gradient speech-bubble glyph and writes PNGs into docs/icons.
 * Run: node scripts/make_icons.js
 */
const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "docs", "icons");
fs.mkdirSync(OUT, { recursive: true });

/* ---- tiny PNG encoder (RGBA, 8-bit) ---- */
function crc32(buf) {
  let c, t = crc32.t;
  if (!t) {
    t = crc32.t = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
  }
  c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = t[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const body = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(width, height, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

/* ---- geometry helpers (work in 0..1 space) ---- */
function lerp(a, b, t) { return a + (b - a) * t; }
function mix(c1, c2, t) {
  return [Math.round(lerp(c1[0], c2[0], t)), Math.round(lerp(c1[1], c2[1], t)), Math.round(lerp(c1[2], c2[2], t))];
}
function insideRoundRect(x, y, cx, cy, w, h, r) {
  const dx = Math.abs(x - cx) - (w / 2 - r);
  const dy = Math.abs(y - cy) - (h / 2 - r);
  if (dx <= 0 && Math.abs(y - cy) <= h / 2) return true;
  if (dy <= 0 && Math.abs(x - cx) <= w / 2) return true;
  if (dx > 0 && dy > 0) return dx * dx + dy * dy <= r * r;
  return false;
}
function pointInTri(px, py, a, b, c) {
  const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
  const u = ((b[1] - c[1]) * (px - c[0]) + (c[0] - b[0]) * (py - c[1])) / d;
  const v = ((c[1] - a[1]) * (px - c[0]) + (a[0] - c[0]) * (py - c[1])) / d;
  return u >= 0 && v >= 0 && u + v <= 1;
}

const PURPLE = [124, 108, 255], PINK = [236, 72, 153], WHITE = [255, 255, 255], DOT = [124, 108, 255];

/* sample color at normalized (u,v) in [0,1]; returns [r,g,b,a] */
function sample(u, v, maskable) {
  // outer icon shape
  let a = 255;
  if (!maskable) {
    if (!insideRoundRect(u, v, 0.5, 0.5, 1, 1, 0.22)) return [0, 0, 0, 0];
  }
  // background gradient (diagonal)
  let bg = mix(PURPLE, PINK, Math.min(1, Math.max(0, (u + v) / 2)));

  // speech bubble body
  const cx = 0.5, cy = 0.455, w = 0.50, h = 0.34, r = 0.11;
  const inBubble = insideRoundRect(u, v, cx, cy, w, h, r);
  // tail (down-left)
  const tail = pointInTri(u, v, [0.345, 0.60], [0.46, 0.60], [0.345, 0.74]);

  if (inBubble || tail) {
    // three dots inside the bubble
    const dy = cy, rad = 0.040;
    const dots = [[cx - 0.13, dy], [cx, dy], [cx + 0.13, dy]];
    for (const d of dots) {
      const dist = Math.hypot(u - d[0], v - d[1]);
      if (dist <= rad) return [DOT[0], DOT[1], DOT[2], a];
    }
    return [WHITE[0], WHITE[1], WHITE[2], a];
  }
  return [bg[0], bg[1], bg[2], a];
}

function render(size, maskable) {
  const rgba = Buffer.alloc(size * size * 4);
  const SS = 3; // 3x3 supersample for smooth edges
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, al = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const u = (x + (sx + 0.5) / SS) / size;
          const v = (y + (sy + 0.5) / SS) / size;
          const c = sample(u, v, maskable);
          // premultiply for correct edge blending against transparency
          const af = c[3] / 255;
          r += c[0] * af; g += c[1] * af; b += c[2] * af; al += c[3];
        }
      }
      const n = SS * SS;
      const aAvg = al / n;
      const o = (y * size + x) * 4;
      if (aAvg < 1) { rgba[o] = rgba[o + 1] = rgba[o + 2] = 0; rgba[o + 3] = 0; }
      else {
        // un-premultiply
        const af = aAvg / 255;
        rgba[o] = Math.round(r / n / af);
        rgba[o + 1] = Math.round(g / n / af);
        rgba[o + 2] = Math.round(b / n / af);
        rgba[o + 3] = Math.round(aAvg);
      }
    }
  }
  return encodePNG(size, size, rgba);
}

const jobs = [
  ["icon-192.png", 192, false],
  ["icon-512.png", 512, false],
  ["icon-maskable-512.png", 512, true],
  ["apple-touch-icon.png", 180, true]
];
for (const [name, size, maskable] of jobs) {
  fs.writeFileSync(path.join(OUT, name), render(size, maskable));
  console.log("wrote", name, size + "x" + size);
}
console.log("done.");
