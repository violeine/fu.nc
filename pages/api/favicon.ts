import type { NextApiRequest, NextApiResponse } from "next";
import { favicon } from "../../utils/favicon";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user, size } = req.query;
  const imageData = await favicon(user as string, size ? Number(size) : 64);
  res.setHeader("Cache-Control", `max-age=0,s-maxage=${24 * 60 * 60}`);
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(imageData);
}

export default handler;
