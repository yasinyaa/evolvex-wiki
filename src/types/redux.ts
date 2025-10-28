import type { DocumentType } from "@/types/documents";
import type { TagType } from "@/types/tags";

export type ExtendedDocumentApiParams = {
  id: string;
  data: Partial<DocumentType>;
};

export type ExtendedTagApiParams = {
  id: string;
  data: Partial<TagType>;
};
