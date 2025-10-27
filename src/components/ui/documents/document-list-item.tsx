import { formatDistanceToNow } from "date-fns";
import { Eye, Pencil, Trash } from "lucide-react";
import type { DocumentType } from "@/types/documents";
import { Badge } from "../badge";

type DocumentListItemProps = {
  document: DocumentType;
};

export function DocumentListItem({ document }: DocumentListItemProps) {
  return (
    <div className="w-full flex flex-col p-4 gap-2 border-1 rounded-lg">
      <div className="w-full flex justify-start gap-20 items-center">
        <div className="w-full flex gap-20 items-center">
          <h1 className="text-lg font-bold">{document.name}</h1>
          <div className="flex items-center gap-2">
            <p className="font-thin text-xs">
            <b>created:</b> {formatDistanceToNow(document.createdAt, { addSuffix: true })}
          </p>
          <p className="font-thin text-xs">
            <b>updated:</b> {formatDistanceToNow(document.updatedAt, { addSuffix: true })}
          </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={15} />
          <Pencil size={15} />
          <Trash size={15} className="text-red-800" />
        </div>
      </div>
      <div className="w-full">
        <span className="text-xs text-gray-500">{document.owner.name}</span>
      </div>
      <div className="w-full"></div>
      <div>
        <Badge variant="default">
          {document.tag?.name}
        </Badge>
      </div>
    </div>
  );
}
