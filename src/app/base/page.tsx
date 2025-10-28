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
import { Spinner } from "@/components/ui/spinner";
import { useGetDocumentsQuery } from "@/store/services/documents-api";

export default function Base() {
  const { data: documents, error, isLoading } = useGetDocumentsQuery(undefined, {
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: true,
});
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
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
      <h1 className="font-bold">All Documents</h1>
      {documents && documents.length > 0 ? (
        <DocumentList documents={documents} />
      ) : (
        <Empty className="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileText />
            </EmptyMedia>
            <EmptyTitle>No Documents Yet</EmptyTitle>
            <EmptyDescription>
              No documents are created yet. Get started by creating first
              document.
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
