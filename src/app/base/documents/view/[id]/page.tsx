import { DocumentDetails } from "@/components/ui/documents/document-details";
export default async function ViewocumentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <DocumentDetails id={id} />;
}