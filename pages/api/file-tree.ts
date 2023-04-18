import type { NextApiRequest, NextApiResponse } from "next";

export type ItemNode = {
  id: string;
  type: "file" | "folder";
  parent: string | null;
  name: string;
  ext?: string;
};
export interface DataItem extends ItemNode {
  items: DataItem[];
}
type ResponseBody = ItemNode[];

const useMockResponse = process.env.MOCK_RESPONSE?.toLowerCase?.() === "true";

const getMockData = (): ResponseBody => {
  const data = require("@/test/api-response-mock.json");
  return data;
};

const buildTree = (data: ResponseBody): DataItem => {
  let root: DataItem = {
    id: "-1",
    type: "folder",
    parent: null,
    name: "Root",
    items: [],
  };
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {} as { [key: string]: number });

  const treeData = data.map<DataItem>((el) => ({ ...el, items: [] }));

  treeData.forEach((el) => {
    if (el.parent === null) {
      root.items.push(el);
      return;
    }
    const parentEl = treeData[idMapping[el.parent]];
    parentEl.items = [...(parentEl.items || []), el];
  });

  return root;
};

/*
 * Some double work here: the original JSON response is being converted to JS object, for the purpose of making the tree.
 * Then it's converted back to JSON for returning the response.
 * Finally the component taking it needs to convert it back to JS Object.
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (useMockResponse) return res.status(200).json(buildTree(getMockData()));
  res.status(200);
}
