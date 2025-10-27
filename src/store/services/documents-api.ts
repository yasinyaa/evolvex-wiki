import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQuery } from '@/lib/redux'
import type { DocumentType } from '@/types/documents'


export const documentsApi = createApi({
    reducerPath: 'documentsApi',
    baseQuery,
    endpoints: builder => ({
        getDocuments: builder.query<DocumentType[], void>({
            query: () => '/documents/all'
        }),
        createDocument: builder.mutation<DocumentType, Partial<DocumentType>>({
            query: (data) => ({
                url: 'documents/create',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useGetDocumentsQuery, useCreateDocumentMutation } = documentsApi