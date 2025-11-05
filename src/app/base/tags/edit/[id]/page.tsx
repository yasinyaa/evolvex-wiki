"use client";
import { useParams } from "next/navigation";
import { EditTagForm } from "@/components/ui/forms/edit-tag";
import { Spinner } from "@/components/ui/spinner";
import { useGetTagDocumentsQuery } from "@/store/services/tags-api";

export default function EditTagPage() {
  const { id } = useParams();
  const { data: tag, isLoading, error } = useGetTagDocumentsQuery(id as string);
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (error || !tag) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-red-600">Failed to load tag data.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col gap-6">
      <EditTagForm id={id as string} initialData={{ name: tag.name, icon: tag.icon || ''}} />
    </div>
  );
}
