import TagDocumentsList from "@/components/ui/documents/tag-documents"

export default async function TagDocuments ({ params }: { params: Promise<{ tag: string}>}) {
  const { tag } = await params

  return (
    <TagDocumentsList tagId={tag} />
  )
}