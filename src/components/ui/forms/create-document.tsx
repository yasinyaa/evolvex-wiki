'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { DocumentSchema } from '@/zod/document'
import { MinimalTiptap } from '../shadcn-io/minimal-tiptap'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Input } from '../input'
import { Button } from '../button'
import { LoadingSwap } from '../loading-swap'
import EditableTitle from '../editable-title'


type DocumentFormType = z.infer<typeof DocumentSchema>

export function CreateDocumentForm() {
    const [content, setContent] = useState(`<h1>Start typing here.</h1>`);
    const methods = useForm<DocumentFormType>({
        resolver: zodResolver(DocumentSchema)
    })

    const handleCreateDocument = (data: DocumentFormType) => {
        console.log(data)
    }


  return (
    <div className="size-full flex flex-col items-start justify-center gap-6">
        <FormProvider {...methods}>
            <form className='w-full flex flex-col gap-6' onSubmit={methods.handleSubmit(handleCreateDocument)}>
                <Card className='w-full'>
                    <CardContent className='w-full flex flex-col gap-6'>
                        <EditableTitle name='name' />
                        <div className="w-full">
                            <MinimalTiptap
                            content={content}
                            onChange={setContent}
                            placeholder="Start typing your content here..."
                            className="min-h-[400px]"
                            />
                            <Input {...methods.register('content')} value={content} className='hidden' />
                            <p className='text-red-900 text-sm mt-2'>{methods.formState.errors.content?.message}</p>
                        </div>
                        <Button type="submit">
                            <LoadingSwap isLoading={methods.formState.isSubmitting}>
                                Save
                            </LoadingSwap>
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </FormProvider>
    </div>
  );
}