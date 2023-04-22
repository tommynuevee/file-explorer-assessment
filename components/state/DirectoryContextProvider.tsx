import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext, useMemo } from "react";

import type { TreeItem } from "@/utils";
import type { DirItem } from "@/pages/api/directories";
import { buildTree } from "@/utils";
import useFileTree from "@/components/queries/useFileTree";

const DirectoryContext = createContext<{
  selectedDir: DirItem | null;
  setSelectedDir: Dispatch<SetStateAction<DirItem | null>>;
  dataTree?: TreeItem;
  selectedDirContent: DirItem[];
}>({
  selectedDir: null,
  setSelectedDir: () => null,
  dataTree: undefined,
  selectedDirContent: [],
});

const DirectoryContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDir, setSelectedDir] = useState<DirItem | null>(null);
  const { data } = useFileTree();

  const dataTree = useMemo(() => buildTree(data), [data]);

  const selectedDirContent = !data || !selectedDir ? [] : data.filter((dir) => dir.parent === selectedDir.id);

  return (
    <DirectoryContext.Provider value={{ dataTree, selectedDir, setSelectedDir, selectedDirContent }}>{children}</DirectoryContext.Provider>
  );
};

export default DirectoryContextProvider;

export const useDirectoryContext = () => useContext(DirectoryContext);
