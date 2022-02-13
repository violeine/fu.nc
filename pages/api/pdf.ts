import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPdf } from "../../utils/pdf";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buffer = await fetchPdf();
  res.setHeader(
    "Content-disposition",
    'attachment; filename="luudangha-resume.pdf"'
  );
  res.setHeader("Content-Type", "application/pdf");
  res.end(buffer);
}
