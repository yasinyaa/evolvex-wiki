import { createApi } from '@reduxjs/toolkit/query/react'
import { useSelector } from 'react-redux'

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

export const useGetDocumentFromStore = (id: string) => {
    const documents = useSelector((state: any) => state.documentsApi.queries['getDocuments(undefined)']?.data) as DocumentType[] | undefined
    return documents?.find(doc => doc.id === id)
}

export const { useGetDocumentsQuery, useCreateDocumentMutation } = documentsApi