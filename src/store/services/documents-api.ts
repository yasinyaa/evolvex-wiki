import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/lib/redux";
import type { DocumentType } from "@/types/documents";
import type { ExtendedDocumentApiParams } from "@/types/redux";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery,
  tagTypes: ["Documents"],
  endpoints: (builder) => ({
    getDocuments: builder.query<DocumentType[], void>({
      query: () => "/documents/all",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Documents" as const, id })),
              { type: "Documents", id: "LIST" },
            ]
          : [{ type: "Documents", id: "LIST" }],
    }),
    getDocument: builder.query<DocumentType, string>({
      query: (id: string) => `/documents/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Documents", id }],
    }),
    createDocument: builder.mutation<DocumentType, Partial<DocumentType>>({
      query: (data) => ({
        url: "documents/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Documents", id: "LIST" }],
    }),
    editDocument: builder.mutation<DocumentType, ExtendedDocumentApiParams>({
      query: ({ id, data }) => ({
        url: `documents/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Documents", id },
        { type: "Documents", id: "LIST" },
      ],
    }),
    deleteDocument: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Documents", id },
        { type: "Documents", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useCreateDocumentMutation,
  useEditDocumentMutation,
  useDeleteDocumentMutation
} = documentsApi;
