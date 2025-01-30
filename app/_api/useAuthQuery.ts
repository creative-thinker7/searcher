import { callApi } from "@/libs";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useAuthQuery<T>({
  queryKey,
  url,
  method = "GET",
  body,
  enabled = true,
}: {
  queryKey: string[];
  url: string;
  method?: "GET" | "POST";
  body?: unknown;
  enabled?: boolean;
}) {
  const router = useRouter();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await callApi({
        url,
        method,
        body,
      });

      if (response.status === 401) {
        router.push("/login");
        return null;
      }

      return response.json() as Promise<T>;
    },
    // Keep the previous data while the new query is in progress.
    placeholderData: keepPreviousData,
    enabled,
  });
}
