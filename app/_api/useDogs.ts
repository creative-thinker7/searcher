import { QUERY_KEY_DOGS } from "@/app/constants";
import { useAuthQuery } from "./useAuthQuery";
import { DogSearchResponse, SortBy, SortOrder } from "@/types";

interface Parameters {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export function useDogs({
  breeds,
  zipCodes,
  ageMin,
  ageMax,
  size,
  from,
  sortBy,
  sortOrder,
}: Parameters) {
  const queryKey = [QUERY_KEY_DOGS];
  let url = "/dogs/search";

  // Compile query parameters.
  const params = new URLSearchParams();

  if (breeds) {
    breeds.forEach((breed) => {
      params.append("breeds", breed);
      queryKey.push(`breed-${breed}`);
    });
  }

  if (zipCodes) {
    zipCodes.forEach((zipCode) => {
      params.append("zipCodes", zipCode);
      queryKey.push(`zipCode-${zipCode}`);
    });
  }

  if (ageMin) {
    params.append("ageMin", ageMin.toString());
    queryKey.push(`ageMin-${ageMin}`);
  }

  if (ageMax) {
    params.append("ageMax", ageMax.toString());
    queryKey.push(`ageMax-${ageMax}`);
  }

  if (size) {
    params.append("size", size.toString());
    queryKey.push(`size-${size}`);
  }

  if (from) {
    params.append("from", from.toString());
    queryKey.push(`from-${from}`);
  }

  if (sortBy && sortOrder) {
    params.append("sort", `${sortBy}:${sortOrder}`);
    queryKey.push(`sort-${sortBy}:${sortOrder}`);
  }

  const query = params.toString();
  if (query !== "") {
    url = `${url}?${query}`;
  }

  return useAuthQuery<DogSearchResponse>({
    queryKey,
    url,
  });
}
