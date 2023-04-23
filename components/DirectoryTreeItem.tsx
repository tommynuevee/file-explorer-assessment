import React from "react";

import FolderMinusIcon from "@/components/icons/FolderMinusIcon";
import FolderPlusIcon from "@/components/icons/FolderPlusIcon";

interface Props {
  name: string;
  isOpen?: boolean;
  onIconClick?: () => void;
  onNameClick?: () => void;
  isSelected?: boolean;
}

function DirectoryTreeItem({ name, isOpen, onIconClick, onNameClick, isSelected }: Props) {
  return (
    <div className={`flex items-center p-1 rounded ${isSelected ? "bg-slate-200 dark:bg-slate-500" : "bg-transparent"}`}>
      <button className="shrink-0" onClick={onIconClick}>
        {isOpen ? <FolderMinusIcon /> : <FolderPlusIcon />}
      </button>
      <button className="text-left pl-2" onClick={onNameClick}>
        {name}
      </button>
    </div>
  );
}

export default DirectoryTreeItem;
