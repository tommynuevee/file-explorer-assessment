import { useState } from "react";

import { TreeItem } from "@/utils";
import DirectoryTreeItem from "./DirectoryTreeItem";
import { useDirectoryContext } from "./state/DirectoryContextProvider";

interface Props {
  dataItem: TreeItem;
}

const DirectoryTree = ({ dataItem }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedDir, setSelectedDir } = useDirectoryContext();

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNameClick = () => {
    setSelectedDir(dataItem);
  };

  return (
    <li>
      <DirectoryTreeItem
        name={dataItem.name}
        isOpen={isOpen}
        onIconClick={handleIconClick}
        onNameClick={handleNameClick}
        isSelected={selectedDir?.id === dataItem.id}
      />
      {isOpen &&
        dataItem.items
          .filter((item) => item.type === "folder")
          .map((item) => (
            <ul className="pl-6" key={item.id}>
              <DirectoryTree dataItem={item} />
            </ul>
          ))}
    </li>
  );
};

export default DirectoryTree;
