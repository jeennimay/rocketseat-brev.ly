import { createShortLinkFn } from "@/app/functions/create-short-link";
import { LinksResponseObj, LinksRequestObj } from "@/shared/links";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createShortLink: FastifyPluginAsyncZod = async (server) => {
    server.post('/link', {
        schema: {
            summary: 'Create a short link',
            tags: ['link'],
            body: LinksRequestObj,
            response: {
                201: LinksResponseObj,
                400: z.object({ message: z.string() }).describe('Bad Request'),
            }
        }
    }, async (request, reply) => {
        const { url, shortLink } = LinksRequestObj.parse(request.body)

        const result = await createShortLinkFn({ url, shortLink })

        if (result.left) {
            return reply.status(400).send({ message: result.left })
        }

        return reply.status(201).send(result.right)
    })

}