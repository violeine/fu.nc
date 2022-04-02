import type { NextApiRequest, NextApiResponse } from "next";
import { favicon } from "../../utils/favicon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, size } = req.query;
  const imageData = await favicon(user as string, size ? Number(size) : 64);
  res.setHeader("Content-Type", "image/png");
  res.send(imageData);
}
