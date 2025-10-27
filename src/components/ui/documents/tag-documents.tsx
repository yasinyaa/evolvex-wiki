"use client";
import { FileText, MailWarning } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DocumentList } from "@/components/ui/documents/documents-list";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { useGetTagDocumentsMutation } from "@/store/services/tags-api";
import { DocumentType } from "@/types/documents";
import type { TagType } from "@/types/tags";

type TagDocumentsListProps = {
  tagId: string;
};

export default function TagDocumentsList({ tagId }: TagDocumentsListProps) {
  const [tag, setTag] = useState<TagType | null>(null);
  const [getTag, { isLoading, isError }] = useGetTagDocumentsMutation();
  const router = useRouter();

  useEffect(() => {
    getTag({ id: tagId }).then(({ data }) => {
      setTag(data as unknown as TagType);
    });
  }, [tagId, getTag]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MailWarning />
          </EmptyMedia>
          <EmptyTitle>Something went wrong</EmptyTitle>
          <EmptyDescription>Please try agian.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col gap-4">
      <h1 className="font-bold">{tag?.name} Documents</h1>
      {tag?.documents && tag?.documents.length > 0 ? (
        <DocumentList
          documents={tag?.documents.length > 0 ? tag.documents : []}
        />
      ) : (
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText />
            </EmptyMedia>
            <EmptyTitle>No Documents for this tag Yet</EmptyTitle>
            <EmptyDescription>
              No documents are created under this tag. Get started by creating
              first document.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/base/documents/create">Create Document</Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
