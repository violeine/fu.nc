import LRUCache from "lru-cache";
import type { NextApiRequest, NextApiResponse } from "next";
import cache from "../../utils/cache";
import { fetchPdf } from "../../utils/pdf";

const send = (res: NextApiResponse, buffer: Buffer) => {
  res.setHeader(
    "Content-disposition",
    'attachment; filename="luudangha-resume.pdf"'
  );
  res.setHeader("Content-Type", "application/pdf");
  res.end(buffer);
};

async function handler(
  _: NextApiRequest,
  res: NextApiResponse,
  lru: LRUCache<string, Buffer>
) {
  if (lru.has("pdf")) {
    console.log("loaded from cache");
    const pdf = lru.get("pdf");
    pdf && send(res, pdf);
  } else {
    const pdf = await fetchPdf();
    console.log("save into cache");
    lru.set("pdf", pdf);
    send(res, pdf);
  }
}

export default cache(handler);
