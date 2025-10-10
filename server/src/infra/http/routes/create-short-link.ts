import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createShortLink: FastifyPluginAsyncZod = async (server) => {
    server.post('/link', {
        schema: {
            summary: 'Create a short link',
            tags: ['link'],
            body: z.object({
                url: z.url().regex(/^[a-zA-Z0-9_-]{3,}$/),
                shortLink: z.string().regex(/^[a-zA-Z0-9_-]{3,}$/),

            }),
            response: {
                201: z.object({
                    id: z.uuid(),
                    url: z.url(),
                    shortLink: z.string(),
                    createdAt: z.date(),
                }),
                400: z.object({ message: z.string() }).describe('Bad Request'),
            }
        }
    }, async (request, reply) => {

        await db.insert(schema.links).values({
            url: request.body.url,
            shortLink: request.body.shortLink,
            remoteKey: 'remoteKey_example',
        });
        if (request.body.shortLink === 'abc') {
            return reply.status(400).send({ message: 'Short link already in use.' })
        }


        return reply.status(201).send({
            id: '123e4567-e89b-12d3-a456-426614174000',
            url: request.body.url,
            shortLink: request.body.shortLink,
            createdAt: new Date(),
        })

    })

}