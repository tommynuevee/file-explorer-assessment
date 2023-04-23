import type { DirItem, ResponseBody } from "@/pages/api/directories";

export interface TreeItem extends DirItem {
  items: TreeItem[];
}

export const buildTree = (data: ResponseBody): TreeItem => {
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {} as { [key: string]: number });

  const treeData = data.map<TreeItem>((el) => ({ ...el, items: [] }));
  const root = treeData[idMapping["-1"]];

  treeData.forEach((el) => {
    if (el.id === "-1") return;
    if (el.parent === "-1" || el.parent === null) {
      root.items.push(el);
      return;
    }
    const parentEl = treeData[idMapping[el.parent]];
    parentEl.items = [...(parentEl.items || []), el];
  });

  return root;
};
