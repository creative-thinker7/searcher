export interface LoginFormRequest {
  name: string;
  email: string;
}

export type SortBy = "breed" | "name" | "age";

export type SortOrder = "asc" | "desc";

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  city: string;
  county: string;
  state: string;
  zip_code: string;
  latitude: number;
  longitude: number;
}

export interface LocationSearchResponse {
  results: Location[];
  total: number;
}
