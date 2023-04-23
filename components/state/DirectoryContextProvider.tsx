import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import { createContext, useState, useContext, useMemo } from "react";

import type { TreeItem } from "@/utils";
import type { DirItem } from "@/pages/api/directories";
import { buildTree } from "@/utils";
import useFileTree from "@/components/queries/useFileTree";

const DirectoryContext = createContext<{
  selectedDir: DirItem | null;
  setSelectedDir: Dispatch<SetStateAction<DirItem | null>>;
  dataTree: TreeItem | null;
  selectedDirContent: DirItem[];
  goBack: () => void;
  currDirExists: boolean;
  goToRoot: () => void;
}>({
  selectedDir: null,
  setSelectedDir: () => null,
  dataTree: null,
  selectedDirContent: [],
  goBack: () => null,
  currDirExists: true,
  goToRoot: () => null,
});

const DirectoryContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDir, setSelectedDir] = useState<DirItem | null>(null);
  const { data } = useFileTree();

  const dataTree = useMemo(() => (data ? buildTree(data) : null), [data]);
  const currDirExists = data?.some((dir) => dir.id === selectedDir?.id) ?? false;

  const selectedDirContent = !data || !selectedDir ? [] : data.filter((dir) => dir.parent === selectedDir.id);

  const goBack = () => {
    if (selectedDir?.parent) {
      const prevDir = data?.find((dir) => dir.id === selectedDir.parent);
      if (prevDir) setSelectedDir(prevDir);
    }
  };

  const goToRoot = () => {
    const root = data?.find((dir) => dir.id === "-1") ?? null;
    setSelectedDir(root);
  };

  return (
    <DirectoryContext.Provider value={{ dataTree, selectedDir, setSelectedDir, selectedDirContent, goBack, currDirExists, goToRoot }}>
      {children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryContextProvider;

export const useDirectoryContext = () => useContext(DirectoryContext);
