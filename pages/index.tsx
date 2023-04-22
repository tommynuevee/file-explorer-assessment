import DirectoryListView from "@/components/DirectoryListView";
import DirectoryTreeView from "@/components/DirectoryTreeView";
import useFileTree from "@/components/queries/useFileTree";
import DirectoryContextProvider from "@/components/state/DirectoryContextProvider";

export default function Home() {
  const { isLoading, isError, isSuccess } = useFileTree();

  return (
    <main className="p-2 dark:text-white max-w-5xl mx-auto md:mt-8">
      <div className="mb-4">
        <h1 className="text-4xl">File Explorer</h1>
      </div>
      <>
        <DirectoryContextProvider>
          {isLoading && <p>Loading files...</p>}
          {isError && <p>Oops! something went wrong.</p>}
          {isSuccess && (
            <div className="flex gap-8">
              <div className="w-72 shrink-0">
                <DirectoryTreeView />
              </div>
              <div className="max-w-xl">
                <DirectoryListView />
              </div>
            </div>
          )}
        </DirectoryContextProvider>
      </>
    </main>
  );
}
