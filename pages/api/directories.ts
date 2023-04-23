import type { NextApiRequest, NextApiResponse } from "next";

const useMockResponse = process.env.MOCK_RESPONSE?.toLowerCase?.() === "true";
const apiSecret = process.env.API_SECRET;

export type DirItem = {
  id: string;
  type: "file" | "folder";
  parent: string | null;
  name: string;
  ext?: string;
};
export type ResponseBody = DirItem[];

const getMockData = (): ResponseBody => {
  const data = require("@/test/api-response-mock.json");
  return data;
};

// Under real circumstances, the URL should go into .env, but for simplicity i'm defining it here.
const apiEndpoint = "https://dev.test.sega.co.uk/api/list";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (useMockResponse) return res.status(200).json(getMockData());

  if (req.method !== "GET") return res.status(405).json({ message: "Only GET method is allowed" });

  console.log("Starting request to: ", apiEndpoint);

  const response = await fetch(apiEndpoint, {
    headers: {
      Accept: "application/json",
      "x-secret-api-key": apiSecret ?? "",
    },
  });
  const jsonResponse = await response.json();

  return res.status(response.status).json(jsonResponse);
}
