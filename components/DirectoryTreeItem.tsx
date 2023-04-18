import React from "react";
import Image from "next/image";

import folderPlusIcon from "@/assets/icons/folder-plus.svg";
import folderMinusIcon from "@/assets/icons/folder-minus.svg";
import fileIcon from "@/assets/icons/file.svg";

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
      {isOpen ? <Image src={folderMinusIcon} alt="Close directory" /> : <Image src={folderPlusIcon} alt="Open directory" />}
      <p className="text-left">{name}</p>
    </>
  );
}

interface DirectoryTreeItemFileProps {
  name: string;
  ext?: string;
}

function DirectoryTreeItemFile({ name, ext }: DirectoryTreeItemFileProps) {
  return (
    <>
      <Image src={fileIcon} alt="File icon" />
      <p className="text-left">{`${name}.${ext}`}</p>
    </>
  );
}
