"use client";

import { useParams } from "next/navigation";
import { EditDocumentForm } from "@/components/ui/forms/edit-document";
import { useGetDocumentQuery } from "@/store/services/documents-api";

export default function DocumentEditPage() {
  const { id } = useParams();
  const {data: document} = useGetDocumentQuery(id as string);

  return (
    <div className="w-full h-full">
      <EditDocumentForm
        id={id as string}
        initialData={{
          name: document?.name as string,
          content: document?.content as string,
          tagId: document?.tagId as string,
        }}
      />
    </div>
  );
}
