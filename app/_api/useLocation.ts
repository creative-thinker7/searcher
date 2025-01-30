import { callApi } from "@/libs";
import { Location } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLocation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (zipCode: string) => {
      const response = await callApi({
        url: "/locations",
        method: "POST",
        body: [zipCode],
      });

      if (response.status === 401) {
        router.push("/login");
        return null;
      }

      const locations = await response.json();

      return locations.length > 0 ? (locations[0] as Location) : null;
    },
  });
}
