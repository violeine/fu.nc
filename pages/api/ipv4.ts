import type { NextApiRequest, NextApiResponse } from "next";
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.headers["x-real-ip"] || req.socket.remoteAddress;
  res.send(ip);
};

export default handler;
