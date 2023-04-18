import DirectoryTree from "@/components/DirectoryTree";
import useFileTree from "@/components/queries/useFileTree";

export default function Home() {
  const { data, isLoading, isError } = useFileTree();
  return (
    <main className="p-2 dark:text-white">
      {data && (
        <ul>
          <DirectoryTree file={data} />
        </ul>
      )}
    </main>
  );
}
