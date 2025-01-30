import { QUERY_KEY_DOG_DETAILS } from "@/app/constants";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { callApi, chunkArray } from "@/libs";
import { Dog } from "@/types";

const MAX_IDS_PER_CALL = 100;

export function useDogDetails(dogIds: string[]) {
  const router = useRouter();

  return useQuery({
    queryKey: [QUERY_KEY_DOG_DETAILS, dogIds],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const chunks = chunkArray(dogIds, MAX_IDS_PER_CALL);

      const dogs: Dog[] = [];
      for await (const idsPerPage of chunks) {
        const response = await callApi({
          url: "/dogs",
          method: "POST",
          body: idsPerPage,
        });

        if (response.status === 401) {
          router.push("/login");
          return null;
        }

        const dogsPerPage = await response.json();
        dogs.push(...dogsPerPage);
      }

      return dogs;
    },
  });
}
