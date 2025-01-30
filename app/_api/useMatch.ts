import { callApi } from "@/libs";
import { Dog } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useMatch() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (dogIds: string[]) => {
      // Get matched dog ID.
      const response = await callApi({
        url: "/dogs/match",
        method: "POST",
        body: dogIds,
      });

      if (response.status === 401) {
        router.push("/login");
        return null;
      }

      const match = await response.json();

      // Retrieve dog details.
      const dogResponse = await callApi({
        url: "/dogs",
        method: "POST",
        body: [match.match],
      });

      if (dogResponse.status === 401) {
        router.push("/login");
        return null;
      }

      const dogs = await dogResponse.json();

      return dogs.length > 0 ? (dogs[0] as Dog) : null;
    },
  });
}
