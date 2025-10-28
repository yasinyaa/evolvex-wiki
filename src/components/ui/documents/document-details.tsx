/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <until a good library for this is found> */
"use client";

import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";

import { useGetDocumentQuery } from "@/store/services/documents-api";
import { Badge } from "../badge";
import { Card, CardContent } from "../card";
import { DocumentActions } from "./document-actions";

type DocumentDetailsProps = {
  id: string;
};

export function DocumentDetails({ id }: DocumentDetailsProps) {
  const {data: document} = useGetDocumentQuery(id);

  if (!document) {
    return <div>Document not found</div>;
  }
  const sanitizedContent = DOMPurify.sanitize(document.content || "");

  return (
    <div className="w-full h-full flex flex-col gap-10">
      <div className="w-full flex flex-col gap-4">
        <Card>
            <CardContent>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-bold">{document.name}</h1>
                            <DocumentActions documentId={document.id} viewOnly={false} />
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-thin"><b>created by:</b> {document.owner.name}</p>
                            <p className="font-thin text-xs">
                                <b>created:</b>{" "}
                                {formatDistanceToNow(document.createdAt, { addSuffix: true })}
                            </p>
                            <p className="font-thin text-xs">
                                <b>updated:</b>{" "}
                                {formatDistanceToNow(document.updatedAt, { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="default">{document.tag?.name}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
            <div
                className="prose max-w-none h-auto"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
            </CardContent>
      </Card>
    </div>
  );
}
