import { z } from 'zod'
import { isLeft } from '@/shared/either'
import { LinksResponseObj, shortLinkSchema } from '@/shared/links'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { increaseLinkAccessFn } from '@/app/functions/increase-link-access'

export const increaseLinkAccesss: FastifyPluginAsyncZod = async server => {
  server.put(
    '/link/:shortLink/access',
    {
      schema: {
        summary: 'Increase link access',
        tags: ['link'],
        params: z.object({
          shortLink: shortLinkSchema,
        }),
        response: {
          200: LinksResponseObj,
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params

      const link = await increaseLinkAccessFn({ shortLink })

      if (isLeft(link)) {
        return reply.status(404).send({ message: 'Link not found' })
      }

      return reply.status(200).send(link.right)
    }
  )
}
