import { createApi } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

import { baseQuery } from "@/lib/redux";
import type { TagType } from "@/types/tags";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery,
  endpoints: (builder) => ({
    getTags: builder.query<TagType[], void>({
      query: () => "/tags/all",
    }),
    getTagDocuments: builder.mutation<TagType, { id: string }>({
      query: (data) => ({
        url: "/tags/all",
        method: "POST",
        body: data,
      }),
    }),
    createTag: builder.mutation<TagType, Partial<TagType>>({
      query: (data) => ({
        url: "/tags/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export function useTagsFromStore() {
  return useSelector(tagsApi.endpoints.getTags.select());
}

export const {
  useGetTagsQuery,
  useGetTagDocumentsMutation,
  useCreateTagMutation,
} = tagsApi;
