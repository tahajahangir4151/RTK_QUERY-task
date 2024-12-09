import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/vnd.github.v3+json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchRepositories: builder.query({
      query: (searchTerm) =>
        `/search/repositories?q=${searchTerm}&sort=stars&order=desc`,
    }),
    getRepository: builder.query({
      query: (fullName) => `/repos/${fullName}`,
    }),
  }),
});

export const { useSearchRepositoriesQuery, useGetRepositoryQuery } = githubApi;
