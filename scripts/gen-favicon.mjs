// Builds src/app/favicon.ico from public/logo.png (replaces the default Next.js/Vercel favicon).
import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, "..", "public", "logo.png");
const outPath = join(__dirname, "..", "src", "app", "favicon.ico");

const sizes = [16, 32, 48];

const pngBuffers = await Promise.all(
  sizes.map((size) =>
    sharp(logoPath)
      .resize(size, size, { fit: "cover" })
      .png()
      .toBuffer()
  )
);

// Minimal ICO container: header + directory entries + raw PNG payloads (supported since Vista).
const numImages = pngBuffers.length;
const headerSize = 6;
const dirEntrySize = 16;
const dataOffsetStart = headerSize + dirEntrySize * numImages;

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(numImages, 4);

const dirEntries = [];
let offset = dataOffsetStart;
for (let i = 0; i < numImages; i++) {
  const size = sizes[i];
  const buf = pngBuffers[i];
  const entry = Buffer.alloc(dirEntrySize);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width (0 = 256)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // color palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(buf.length, 8); // image data size
  entry.writeUInt32LE(offset, 12); // offset
  dirEntries.push(entry);
  offset += buf.length;
}

const ico = Buffer.concat([header, ...dirEntries, ...pngBuffers]);
writeFileSync(outPath, ico);
console.log(`Saved ${outPath} (${ico.length} bytes, sizes: ${sizes.join(", ")})`);
