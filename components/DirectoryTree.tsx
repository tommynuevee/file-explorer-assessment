import type { DataItem } from "@/pages/api/file-tree";
import { useState, useContext } from "react";
import DirectoryTreeItem from "./DirectoryTreeItem";

interface Props {
  file: DataItem;
}

const DirectoryTree = ({ file }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button onClick={handleFileClick}>
        <DirectoryTreeItem type={file.type} ext={file.ext} name={file.name} isOpen={isOpen} />
      </button>
      {isOpen &&
        file.items
          .filter((item) => item.type === "folder")
          .map((item) => (
            <ul className="pl-6" key={item.id}>
              <DirectoryTree file={item} />
            </ul>
          ))}
    </li>
  );
};

export default DirectoryTree;
