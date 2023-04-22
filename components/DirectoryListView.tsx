import { useState } from "react";

import type { DirItem } from "@/pages/api/directories";
import { DirectoryListItemIcon } from "./DirectoryListItem";
import { useDirectoryContext } from "./state/DirectoryContextProvider";
import ReturnIcon from "./icons/ReturnIcon";

function DirectoryListView() {
  const { selectedDirContent, setSelectedDir, selectedDir, goBack } = useDirectoryContext();
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
      {selectedDir && (
        <div className="mb-6 flex gap-2">
          <button onClick={goBack}>
            <ReturnIcon />
          </button>
          <h2 className="font-bold">{selectedDir?.name}</h2>
        </div>
      )}
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
