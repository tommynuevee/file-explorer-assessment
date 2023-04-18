import DirectoryContextProvider from "@/components/DirectoryContext";
import DirectoryList from "@/components/DirectoryList";
import DirectoryTree from "@/components/DirectoryTree";
import useFileTree from "@/components/queries/useFileTree";

export default function Home() {
  const { data, isLoading, isError } = useFileTree();
  return (
    <main className="p-2 dark:text-white max-w-5xl mx-auto md:mt-8">
      <div className="mb-4">
        <h1 className="text-4xl">File Explorer</h1>
      </div>
      <>
        {isLoading ? (
          <p>Loading files...</p>
        ) : (
          <DirectoryContextProvider>
            <div className="flex gap-2">
              <div className="w-72 overflow-x-auto">
                {data && (
                  <ul>
                    <DirectoryTree file={data} />
                  </ul>
                )}
              </div>
              <DirectoryList />
            </div>
          </DirectoryContextProvider>
        )}
      </>
    </main>
  );
}
