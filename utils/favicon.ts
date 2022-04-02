import { createCanvas, Image } from "@napi-rs/canvas";

export const favicon = async (user: string, size: number): Promise<Buffer> => {
  const imgBuffer = await fetch(`https://github.com/${user}.png?size=${size}`)
    .then((res) => res.blob())
    .then((bob) => bob.arrayBuffer());
  const img = new Image();
  img.src = Buffer.from(imgBuffer);
  img.width = size;
  img.height = size;
  const half = size / 2;
  const canvas = createCanvas(size, size);
  const context = canvas.getContext("2d");
  context.save();
  context.beginPath();
  context.arc(0 + half, 0 + half, half, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  context.drawImage(img, 0, 0, size, size);

  context.beginPath();
  context.arc(0 - half, 0 - half, half, 0, Math.PI * 2, true);
  context.clip();
  context.closePath();
  context.restore();
  return canvas.toBuffer("image/png");
};
