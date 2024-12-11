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
    getContents: builder.query({
      query: ({ owner, repo, path = "" }) =>
        `/repos/${owner}/${repo}/contents/${path}`,
    }),
    getFileContent: builder.query({
      query: ({ owner, repo, path }) =>
        `/repos/${owner}/${repo}/contents/${path}`,
    }),
    getLanguages: builder.query({
      query: ({ owner, repo }) => `/repos/${owner}/${repo}/languages`,
    }),
  }),
});

export const {
  useSearchRepositoriesQuery,
  useGetRepositoryQuery,
  useGetContentsQuery,
  useGetLanguagesQuery,
  useGetFileContentQuery,
} = githubApi;

