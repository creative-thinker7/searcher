import { API_ENDPOINT } from "@/app/constants";

interface CallApiProps {
  url: string;
  method?: "GET" | "POST";
  body?: unknown;
}

export async function callApi({ url, method = "GET", body }: CallApiProps) {
  return fetch(`${API_ENDPOINT}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
}

export function chunkArray<T>(array: T[], size: number) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function isValidZipCode(zipCode: string) {
  return /^(?:\d{5}|\d{5}-\d{4})$/.test(zipCode);
}
