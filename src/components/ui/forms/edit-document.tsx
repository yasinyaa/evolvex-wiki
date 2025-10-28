"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { useEditDocumentMutation } from "@/store/services/documents-api";
import { useGetTagsQuery } from "@/store/services/tags-api";
import { DocumentSchema } from "@/zod/document";
import { Button } from "../button";
import EditableTitle from "../editable-title";
import { Input } from "../input";
import { LoadingSwap } from "../loading-swap";
import { MinimalTiptap } from "../shadcn-io/minimal-tiptap";
import { Spinner } from "../spinner";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

type EditDocumentFormType = z.infer<typeof DocumentSchema>;

type EditDocumentFormProps = {
  initialData: EditDocumentFormType;
  id: string;
};

export function EditDocumentForm({ initialData, id }: EditDocumentFormProps) {
  const methods = useForm<EditDocumentFormType>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: initialData,
  });
  const [content, setContent] = useState(initialData.content);
  const router = useRouter();
  const { data: tags, isLoading } = useGetTagsQuery();
  const selectedTag = methods.watch("tagId", initialData.tagId);
  const [editDocument] = useEditDocumentMutation();

  const handleEditDocument = (data: EditDocumentFormType) => {
    editDocument({id, data:{...data, content }}).then(() => {
        toast.success("Successfully Edited Document");
        router.push(`/base/documents/view/${id}`);
    }).catch(() => {
        toast.error("Failed to edit document.");
    });
  };

  return (
    <div className="size-full flex flex-col items-start justify-start gap-6">
      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={methods.handleSubmit(handleEditDocument)}
        >
          <div className="w-full flex-col lg:flex gap-4 justify-start lg:justify-between items-center">
            <div className="w-full lg:w-96 mb-4 lg:mb-0">
              <EditableTitle name="name" />
            </div>
            <div className="w-full lg:w-96">
              {isLoading ? (
                <Spinner />
              ) : (
                <ToggleGroup
                  value={selectedTag}
                  onValueChange={(value) => methods.setValue("tagId", value)}
                  type="single"
                  size="sm"
                  spacing={2}
                  className="flex flex-col gap-2"
                >
                  <div className="w-full flex items-center">
                    {tags && tags?.length > 0 ? (
                      tags?.map((tag) => (
                        <ToggleGroupItem key={tag.id} value={tag.id}>
                          <span className="text-xs">#{tag?.name}</span>
                        </ToggleGroupItem>
                      ))
                    ) : (
                      <Button asChild>
                        <Link href="/base/tags/create">Create Tag</Link>
                      </Button>
                    )}
                  </div>
                  <p className="text-red-900 text-sm mt-2">
                    {methods.formState.errors.tagId?.message}
                  </p>
                </ToggleGroup>
              )}
            </div>
            <Button type="submit">
              <LoadingSwap isLoading={methods.formState.isSubmitting}>
                Save
              </LoadingSwap>
            </Button>
          </div>
          <div className="w-full">
            <MinimalTiptap
              content={content}
              onChange={setContent}
              placeholder="Start typing your content here..."
              className="min-h-[400px]"
            />
            <Input
              {...methods.register("content")}
              value={content}
              className="hidden"
            />
            <p className="text-red-900 text-sm mt-2">
              {methods.formState.errors.content?.message}
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
