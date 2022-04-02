import type { NextApiRequest, NextApiResponse } from "next";
import { createCanvas, Image } from "@napi-rs/canvas";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imgBuffer = await fetch(`https://github.com/${req.query.user}.png`)
    .then((res) => res.blob())
    .then((bob) => bob.arrayBuffer());
  const img = new Image();
  img.src = Buffer.from(imgBuffer);
  img.width = 64;
  img.height = 64;
  const canvas = createCanvas(64, 64);
  const context = canvas.getContext("2d");
  context.save();
  context.beginPath();
  context.arc(0 + 32, 0 + 32, 32, 0, Math.PI * 2, true);
  context.closePath();
  context.clip();

  context.drawImage(img, 0, 0, 64, 64);

  context.beginPath();
  context.arc(0 - 32, 0 - 32, 32, 0, Math.PI * 2, true);
  context.clip();
  context.closePath();
  context.restore();
  const imageData = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.send(imageData);
}
