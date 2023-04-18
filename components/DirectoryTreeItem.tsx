import React from "react";

import FileIcon from "@/components/icons/FileIcon";
import FolderMinusIcon from "@/components/icons/FolderMinusIcon";
import FolderPlusIcon from "@/components/icons/FolderPlusIcon";

interface Props {
  type: "file" | "folder";
  name: string;
  ext?: string;
  isOpen?: boolean;
}

function DirectoryTreeItem({ type, name, ext, isOpen }: Props) {
  return (
    <div className="flex items-center gap-2">
      {type === "file" ? <DirectoryTreeItemFile name={name} ext={ext} /> : <DirectoryTreeItemFolder name={name} isOpen={isOpen} />}
    </div>
  );
}

export default DirectoryTreeItem;

interface DirectoryTreeItemFolderProps {
  name: string;
  isOpen?: boolean;
}

function DirectoryTreeItemFolder({ name, isOpen }: DirectoryTreeItemFolderProps) {
  return (
    <>
      <div className="shrink-0">{isOpen ? <FolderMinusIcon /> : <FolderPlusIcon />}</div>
      <p className="text-left">{name}</p>
    </>
  );
}

// I created this initially to display files in the tree as well. Ended up removing filtering to show only folders.
// I would never leave dead code normally, but just for the sake of the test, as I was not sure if I had to show files in the tree too.
interface DirectoryTreeItemFileProps {
  name: string;
  ext?: string;
}

function DirectoryTreeItemFile({ name, ext }: DirectoryTreeItemFileProps) {
  return (
    <>
      <div className="shrink-0">
        <FileIcon />
      </div>
      <p className="text-left">{`${name}.${ext}`}</p>
    </>
  );
}
