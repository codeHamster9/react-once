import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "./interfaces/user.interface";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://randomuser.me" }),
  endpoints: (builder) => ({
    fetchUsersByPage: builder.query<IUser[], number>({
      query: (page) => `api?page=${page}`,
      transformResponse: (response: { results: IUser[] }, meta, arg) => {
        return response.results;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchUsersByPageQuery, useLazyFetchUsersByPageQuery } =
  userApi;
