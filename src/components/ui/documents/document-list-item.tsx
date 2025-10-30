import { formatDistanceToNow } from "date-fns";
import type { DocumentType } from "@/types/documents";
import { Badge } from "../badge";
import { DocumentActions } from "./document-actions";

type DocumentListItemProps = {
  document: DocumentType;
};

export function DocumentListItem({ document }: DocumentListItemProps) {
  return (
    <div className="w-full flex flex-col p-4 gap-4 border-1 rounded-lg">
      <div className="w-full flex justify-start items-center">
        <div className="w-full flex-col lg:flex lg:gap-4 items-start">
          <div className="w-full flex mb-2 justify-between">
            <h1 className="text-lg font-bold">{document.name}</h1>
            <DocumentActions documentId={document.id} />
          </div>
          <div className="w-full flex items-start justify-between gap-2">
            <div className="w-2/3 flex-col gap-2">
              <div className="w-full flex gap-2 justify-start items-start">
                <p className="font-thin text-xs">
                  <b>created:</b>{" "}
                  {formatDistanceToNow(document.createdAt, { addSuffix: true })}
                </p>
                <p className="font-thin text-xs">
                  <b>updated:</b>{" "}
                  {formatDistanceToNow(document.updatedAt, { addSuffix: true })}
                </p>
              </div>
              <div className="w-full">
                <span className="text-xs font-thin"><b>created by:</b> {document.owner.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full"></div>
      <div>
        <Badge variant="default">{document.tag?.name}</Badge>
      </div>
    </div>
  );
}
