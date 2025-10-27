import type { DocumentType } from "@/types/documents";
import { DocumentListItem } from "./document-list-item";

type DocumentListProps = {
    documents: DocumentType[]
}

export function DocumentList({ documents }: DocumentListProps) {
    return (
        <div className="w-full flex flex-col gap-4">
            {
                documents.map(document => (
                    <DocumentListItem key={document.id} document={document} />
                ))
            }
        </div>
    )
}