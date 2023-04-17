// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const useMockResponse = process.env.MOCK_RESPONSE?.toLowerCase?.() === "true";

const getMockData = () => {
  const data = require("@/test/api-response-mock.json");
  return data;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (useMockResponse) return res.status(200).json(getMockData());
  res.status(200);
}
