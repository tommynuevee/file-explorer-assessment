import FileIcon from "./icons/FileIcon";
import FolderIcon from "./icons/FolderIcon";

type BaseItem = { name: string };
type FolderItem = BaseItem & { type: "folder" };
type FileItem = BaseItem & { type: "file"; extension?: string };
type ItemProps = FolderItem | FileItem;

export function DirectoryListItemIcon(props: ItemProps) {
  const { type, name } = props;

  return (
    <div className="w-24 flex flex-col gap-1 items-center">
      {type === "file" ? <FileIcon /> : <FolderIcon />}
      <p className="break-all">{type === "file" ? `${name}.${props.extension}` : name}</p>
    </div>
  );
}
