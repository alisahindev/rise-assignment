// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  label: string;
  key: string;
  value: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json([
    { key: "urgent", label: "Urgent", value: 1 },
    { key: "regular", label: "Regular", value: 2 },
    { key: "trivial", label: "Trivial", value: 3 },
  ]);
}
