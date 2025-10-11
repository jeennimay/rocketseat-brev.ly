import z from "zod";

export const linkSchema = z.string().url();
export const shortLinkSchema = z.string().regex(/^[a-zA-Z0-9_-]+$/);

export const objLinkSchema = {
  id: z.uuid(),
    url: linkSchema,
    shortLink: shortLinkSchema,
    createdAt: z.date(),
    countVisits: z.number(),
}

export const LinksRequestObj = z.object({
    url: linkSchema,
    shortLink: shortLinkSchema,
})

export type LinksRequestInput = z.input<typeof LinksRequestObj>

export const LinksResponseObj = z.object(objLinkSchema)

export type LinksResponseInput = z.infer<typeof LinksResponseObj>