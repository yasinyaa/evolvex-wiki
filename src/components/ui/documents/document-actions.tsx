"use client";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDeleteDocumentMutation } from "@/store/services/documents-api";
import { Button } from "../button";
import { Spinner } from "../spinner";

export function DocumentActions({
  documentId,
  viewOnly = true,
}: {
  documentId: string;
  viewOnly?: boolean;
}) {
  const [deleteDocument, { isLoading }] = useDeleteDocumentMutation();
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      {viewOnly && (
        <Link href={`/base/documents/view/${documentId}`}>
          <Eye size={15} className="hover:text-gray-600" />
        </Link>
      )}
      {!viewOnly && (
        <>
          <Link href={`/base/documents/edit/${documentId}`}>
            <Pencil size={15} className="hover:text-gray-600" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              deleteDocument(documentId)
                .then(() => {
                  toast.success("Document deleted successfully");
                  router.push("/base");
                })
                .catch((err) => {
                  toast.error(
                    err.message ? err.message : "Failed to delete document",
                  );
                });
            }}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <Trash size={15} className="text-red-800 hover:text-red-600" />
            )}
          </Button>
        </>
      )}
    </div>
  );
}
