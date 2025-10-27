import type { Document, Tag } from "@/generated/prisma";

export type TagType = Tag & {
    documents: Document[]
}