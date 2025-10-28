'use client';

import { useParams } from "next/navigation";
import { DocumentDetails } from "@/components/ui/documents/document-details";


export default function ViewocumentPage() {
    const { id } = useParams();
    return <DocumentDetails id={id as string} />;
}