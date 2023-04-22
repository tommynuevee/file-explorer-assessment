import { useState } from "react";

import type { DirItem } from "@/pages/api/directories";
import { DirectoryListItemIcon } from "./DirectoryListItem";
import { useDirectoryContext } from "./state/DirectoryContextProvider";

function DirectoryListView() {
  const { selectedDirContent, setSelectedDir, selectedDir } = useDirectoryContext();
  const [selectedItem, setSelectedItem] = useState<DirItem>();

  const handleItemClick = (clickedItem: DirItem) => {
    if (!selectedItem || selectedItem.id !== clickedItem.id) {
      setSelectedItem(clickedItem);
      return;
    }
    if (selectedItem.type === "folder") setSelectedDir(selectedItem);
  };

  return (
    <>
      <h2 className="mb-6 font-bold">{selectedDir?.name}</h2>
      <ul className="flex gap-2 flex-wrap gap-2">
        {selectedDirContent?.map((item) => (
          <li key={item.id} className={`rounded p-1 ${selectedItem?.id === item.id ? "bg-slate-200 dark:bg-slate-500" : "bg-transparent"}`}>
            <button onClick={() => handleItemClick(item)}>
              <DirectoryListItemIcon type={item.type} name={item.name} extension={item.type === "file" ? item.ext : undefined} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DirectoryListView;
