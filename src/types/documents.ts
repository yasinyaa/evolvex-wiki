import type { Document, Tag, User } from "@/generated/prisma";

export type DocumentType = Document & {
    owner: User,
    tag: Tag
}