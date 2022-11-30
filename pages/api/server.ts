// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  label: string;
  key: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    { key: "urgent", label: "Urgent" },
    { key: "regular", label: "Regular" },
    { key: "trivial", label: "Trivial" },
  ]);
}
