import {z} from 'zod'

const TextChildSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
});
const NodeSchema = z.object({
  type: z.enum(["p", "h1", "h2", "h3", "h4", "h5", "h6"]), // add more types if needed
  id: z.string(),
  children: z.array(TextChildSchema),
});

export const DocumentSchema = z.object({
    name: z.string().min(1, "Document Name can't be empty"),
    content: z.array(NodeSchema).optional(),
    tagId: z.string().nonempty("Select a tag")
})