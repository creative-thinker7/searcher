import { QUERY_KEY_BREEDS } from "@/app/constants";
import { useAuthQuery } from "./useAuthQuery";

export function useBreeds() {
  return useAuthQuery<string[]>({
    queryKey: [QUERY_KEY_BREEDS],
    url: "/dogs/breeds",
  });
}
