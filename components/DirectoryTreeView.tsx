import { useDirectoryContext } from "./state/DirectoryContextProvider";
import DirectoryTree from "@/components/DirectoryTree";

function DirectoryTreeView() {
  const { dataTree } = useDirectoryContext();

  if (!dataTree) return null;
  return (
    <ul>
      <DirectoryTree dataItem={dataTree} />
    </ul>
  );
}

export default DirectoryTreeView;
