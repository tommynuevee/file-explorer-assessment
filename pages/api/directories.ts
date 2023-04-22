import type { NextApiRequest, NextApiResponse } from "next";

export type DirItem = {
  id: string;
  type: "file" | "folder";
  parent: string | null;
  name: string;
  ext?: string;
};
export type ResponseBody = DirItem[];

const useMockResponse = process.env.MOCK_RESPONSE?.toLowerCase?.() === "true";

const getMockData = (): ResponseBody => {
  const data = require("@/test/api-response-mock.json");
  return data;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (useMockResponse) return res.status(200).json(getMockData());
  res.status(200);
}
