import { useQuery } from "@tanstack/react-query";
import type { DirItem, ResponseBody } from "@/pages/api/directories";

export default function useFileTree() {
  const { data, isError, isLoading, isSuccess } = useQuery({ queryKey: ["fileTree"], queryFn: getFileTree, refetchInterval: 30000 });

  return { data, isError, isLoading, isSuccess };
}

const getFileTree = async (): Promise<ResponseBody> => {
  const response = await fetch("/api/directories");
  if (!response.ok) throw new Error("Something went wrong with the request");
  const jsonResponse = (await response.json()) as ResponseBody;
  const dataWithRoot = jsonResponse?.map((dataItem) => (dataItem.parent === null ? { ...dataItem, parent: "-1" } : dataItem));
  const root: DirItem = {
    id: "-1",
    type: "folder",
    parent: null,
    name: "Root",
  };
  dataWithRoot.push(root);
  return dataWithRoot;
};
