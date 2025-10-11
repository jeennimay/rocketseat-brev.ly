import { getLinksFn } from "@/app/functions/get-links";
import { unwrapEither } from "@/shared/either";
import { objLinkSchema } from "@/shared/links";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinks: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get link list",
        tags: ["links"],
        response: {
          200: z.object({
            links: z.array(z.object(objLinkSchema)),
            total: z.number(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await getLinksFn();

      const { links, total } = unwrapEither(result);

      return reply.status(200).send({ links, total });
    },
  );
};
