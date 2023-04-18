import type { DataItem } from "@/pages/api/file-tree";
import { useState } from "react";
import DirectoryTreeItem from "./DirectoryTreeItem";

interface Props {
  file: DataItem;
}

const DirectoryTree = ({ file }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleFileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      <button onClick={handleFileClick}>
        <DirectoryTreeItem type={file.type} ext={file.ext} name={file.name} isOpen={isOpen} />
      </button>
      {isOpen &&
        file.items.map((item) => (
          <ul className="ml-4" key={item.id}>
            <DirectoryTree file={item} />
          </ul>
        ))}
    </li>
  );
};

export default DirectoryTree;
