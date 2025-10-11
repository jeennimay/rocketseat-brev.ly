import { z } from "zod";
import { isLeft } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { LinksResponseObj, shortLinkSchema } from "@/shared/links";
import { getOneLink } from "@/app/functions/get-one-link";

export const getLink: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/link/:shortLink",
    {
      schema: {
        summary: "Get a link",
        tags: ["link"],
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
      const { shortLink } = request.params;

      const link = await getOneLink(shortLink);

      if (isLeft(link)) {
        return reply.status(404).send({ message: link.left });
      }

      return reply.status(200).send(link.right);
    },
  );
};
