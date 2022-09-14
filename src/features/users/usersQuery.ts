import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "./interfaces/user.interface";

// Define a service using a base URL and expected endpoints
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchUsersByPage: builder.query<Pokemon, number>({
      query: (page = 35) => `${page}`,
      transformResponse: (response: Pokemon, meta, arg) => {
        const { name, sprites } = response;
        return { name, sprites };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchUsersByPageQuery, useLazyFetchUsersByPageQuery } =
  userApi;
