import { useQuery } from "@tanstack/react-query";
import type { ResponseBody } from "@/pages/api/directories";

export default function useFileTree() {
  const { data, isError, isLoading, isSuccess } = useQuery({ queryKey: ["fileTree"], queryFn: getFileTree, refetchInterval: 30000 });

  return { data, isError, isLoading, isSuccess };
}

const getFileTree = async (): Promise<ResponseBody> => {
  const response = await fetch("/api/directories");
  if (!response.ok) throw new Error("Something went wrong with the request");
  const jsonResponse = (await response.json()) as ResponseBody;
  return jsonResponse?.map((dataItem) => (dataItem.parent === null ? { ...dataItem, parent: "-1" } : dataItem));
};
