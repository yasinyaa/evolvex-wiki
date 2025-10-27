import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export function DocumentActions({ documentId, noView=false }: { documentId: string, noView?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      {!noView && (<Link href={`/base/documents/view/${documentId}`}>
        <Eye size={15} className="hover:text-gray-600" />
      </Link>)}
      <Link href={`/base/documents/edit/${documentId}`}>
        <Pencil size={15} className="hover:text-gray-600" />
      </Link>
      <Link href={`/base/documents/delete/${documentId}`}>
        <Trash size={15} className="text-red-800 hover:text-red-600" />
      </Link>
    </div>
  );
}
