import { useDirectoryContext } from "./state/DirectoryContextProvider";

function AlertMessage() {
  const { currDirExists, goToRoot } = useDirectoryContext();

  if (currDirExists) return <></>;

  return (
    <div className="mb-4 p-4 rounded bg-yellow-200 dark:bg-yellow-700">
      <span>This directory is no longer available</span>
      <span className="hidden md:inline">, select another directory from the file explorer or go back to root.</span>
      <button className="underline ml-2" onClick={goToRoot}>
        Go to Root
      </button>
    </div>
  );
}

export default AlertMessage;
