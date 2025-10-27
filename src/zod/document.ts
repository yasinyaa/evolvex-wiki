import {z} from 'zod'

export const DocumentSchema = z.object({
    name: z.string().min(1, "Document Name can't be empty"),
    content: z.string().min(1, "Document content can't be empty"),
    tagId: z.string().nonempty("Select a tag")
})