"use client";
import { FileText, MailWarning } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
import { useGetTagDocumentsQuery } from "@/store/services/tags-api";
import type { DocumentType } from "@/types/documents";
import { Spinner } from "../spinner";

type TagDocumentsListProps = {
  tagId: string;
};

export default function TagDocumentsList({ tagId }: TagDocumentsListProps) {
  const {data: tag, isLoading, isError} = useGetTagDocumentsQuery(tagId);
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
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
          documents={
            tag?.documents && tag.documents.length > 0
              ? (tag.documents as unknown as DocumentType[])
              : []
          }
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
