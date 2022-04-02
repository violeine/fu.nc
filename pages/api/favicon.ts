import LRUCache from "lru-cache";
import type { NextApiRequest, NextApiResponse } from "next";
import cache from "../../utils/cache";
import { favicon } from "../../utils/favicon";

const send = (res: NextApiResponse, img: Buffer) => {
  res.setHeader("Content-Type", "image/png");
  res.send(img);
};
async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  lru: LRUCache<string, Buffer>
) {
  const { user, size } = req.query;
  console.log(lru, user, size);
  if (lru.has(user as string)) {
    console.log("loaded from cache");
    const imageData = lru.get(user as string);
    imageData && send(res, imageData);
  } else {
    const imageData = await favicon(user as string, size ? Number(size) : 64);
    console.log("save into cache");
    lru.set(user as string, imageData);
    send(res, imageData);
  }
}

export default cache(handler);
