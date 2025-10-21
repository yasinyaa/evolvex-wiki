import { CreateDocumentForm } from "@/components/ui/forms/create-document"

export default function CreateDocumentPage() {
    return (
        <div className="w-full p-4 flex flex-col gap-6">
            <h1 className="text-primary font-bold">Create Document</h1>
            <CreateDocumentForm />
        </div>
    )
}