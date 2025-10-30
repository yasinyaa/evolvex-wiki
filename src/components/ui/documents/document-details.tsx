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
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4">
        <Card>
            <CardContent>
                <div className="w-full flex flex-col gap-2">
                    <div className="w-full flex-col lg:flex lg:gap-4 items-start">
                      <div className="w-full flex mb-2 justify-between">
                        <h1 className="text-lg font-bold">{document.name}</h1>
                        <DocumentActions documentId={document.id} viewOnly={false} />
                      </div>
                      <div className="w-full flex items-start justify-between gap-2">
                        <div className="w-2/3 flex-col gap-2">
                          <div className="w-full flex gap-2 justify-center items-start">
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
