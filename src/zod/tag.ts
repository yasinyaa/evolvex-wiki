import z from 'zod'

export const tagSchema = z.object({
    name: z.string().min(1, "Tag name is required."),
    icon: z.string().min(1, "Tag icon is required."),
 })