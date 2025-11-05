import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/lib/redux";
import type { ExtendedTagApiParams } from "@/types/redux";
import type { TagType } from "@/types/tags";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery,
  tagTypes: ["Tags"],
  endpoints: (builder) => ({
    getTags: builder.query<TagType[], void>({
      query: () => "/tags/all",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tags" as const, id })),
              { type: "Tags", id: "LIST" },
            ]
          : [{ type: "Tags", id: "LIST" }],
    }),
    getTagDocuments: builder.query<TagType, string>({
      query: (id: string) => `/tags/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Tags", id }],
    }),
    createTag: builder.mutation<TagType, Partial<TagType>>({
      query: (data) => ({
        url: "/tags/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Tags", id: "LIST" }],
    }),
    editTag: builder.mutation<TagType, ExtendedTagApiParams>({
      query: ({ id, data }) => ({
        url: `tags/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Tags", id },
        { type: "Tags", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagDocumentsQuery,
  useCreateTagMutation,
  useEditTagMutation,
} = tagsApi;
