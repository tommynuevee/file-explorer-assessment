import { DataItem } from "@/pages/api/file-tree";
import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import { createContext, useState, useMemo } from "react";

const DirectoryContext = createContext<{
  selectedFolder: DataItem | null;
  setSelectedFolder: Dispatch<SetStateAction<DataItem | null>>;
  selectedFolderFiles: DataItem[];
}>({
  selectedFolder: null,
  setSelectedFolder: () => undefined,
  selectedFolderFiles: [],
});

const DirectoryContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = useState<DataItem | null>(null);

  const selectedFolderFiles = useMemo(() => {
    if (!selectedFolder) return [];
    return selectedFolder.items.filter((item) => item.type === "file");
  }, [selectedFolder]);

  return (
    <DirectoryContext.Provider value={{ selectedFolder, setSelectedFolder, selectedFolderFiles }}>{children}</DirectoryContext.Provider>
  );
};

export default DirectoryContextProvider;
