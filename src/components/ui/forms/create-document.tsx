"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { PlateEditor } from "@/components/editor/plate-editor";
import { useCreateDocumentMutation } from "@/store/services/documents-api";
import { useGetTagsQuery } from "@/store/services/tags-api";
import { DocumentSchema } from "@/zod/document";
import { Button } from "../button";
import EditableTitle from "../editable-title";
import { LoadingSwap } from "../loading-swap";
import { Spinner } from "../spinner";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";

type DocumentFormType = z.infer<typeof DocumentSchema>;

export function CreateDocumentForm() {
  const methods = useForm<DocumentFormType>({
    resolver: zodResolver(DocumentSchema),
  });
  const [createDocument] = useCreateDocumentMutation();
  const router = useRouter();
  const { data: tags, isLoading } = useGetTagsQuery();
  const selectedTag = methods.watch("tagId");

  // register the content field
  methods.register("content");

  const handleCreateDocument = (data: DocumentFormType) => {
    createDocument(data)
      .then(() => {
        toast.success("Successfully Created Document");
        router.push("/base");
      })
      .catch(() => {
        toast.error("Failed to create document.");
      });
  };

  return (
    <FormProvider {...methods}>
        <form
          className="flex h-screen flex-col gap-6"
          onSubmit={methods.handleSubmit(handleCreateDocument)}
        >
          <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-4 justify-start lg:justify-between items-start">
            <div className="w-full lg:w-96 lg:mb-0">
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
          <div>
            <p className="text-red-900 text-sm mt-2">
              {methods.formState.errors.content?.message}
            </p>
            <PlateEditor onChange={({ value }: any) => {
              console.log("Content changed:", value);
              methods.setValue("content", value);
            }} />
          </div>
        </form>
      </FormProvider>
  );
}
