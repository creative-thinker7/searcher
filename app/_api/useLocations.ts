import { QUERY_KEY_LOCATIONS } from "@/app/constants";
import { useAuthQuery } from "./useAuthQuery";
import { LocationSearchResponse } from "@/types";

interface Parameters {
  city: string;
  size?: number;
  from?: number;
}

export function useLocations({ city, size, from }: Parameters) {
  const queryKey = [QUERY_KEY_LOCATIONS, city];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const body: any = { city };
  if (size) {
    body.size = size;
    queryKey.push(`size-${size}`);
  }

  if (from) {
    body.from = from;
    queryKey.push(`from-${from}`);
  }

  return useAuthQuery<LocationSearchResponse>({
    queryKey,
    url: "/locations/search",
    method: "POST",
    body,
    enabled: city !== "",
  });
}
