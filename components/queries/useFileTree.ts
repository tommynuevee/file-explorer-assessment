import type { DataItem } from "@/pages/api/file-tree";
import { useQuery } from "@tanstack/react-query";

export default function useFileTree() {
  const { data, isError, isLoading } = useQuery({ queryKey: ["fileTree"], queryFn: getFileTree, refetchInterval: 30000 });

  return { data, isError, isLoading };
}

async function getFileTree(): Promise<DataItem> {
  const response = await fetch("/api/file-tree");
  if (!response.ok) throw new Error("Something went wrong with the request");
  return response.json();
}
