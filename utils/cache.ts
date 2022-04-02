import LRU from "lru-cache";

import type { NextApiRequest, NextApiResponse } from "next";

const CACHE_MAX_SIZE = 50; //mb

const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; //second

const lruCache = new LRU<string, Buffer>({
  max: CACHE_MAX_SIZE,
  ttl: CACHE_MAX_AGE,
});

interface CachedRequestHandler {
  (
    req: NextApiRequest,
    res: NextApiResponse,
    cache: LRU<string, Buffer>
  ): unknown;
}

const cache =
  (handler: CachedRequestHandler) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    return handler(req, res, lruCache);
  };

export default cache;
