import { deleteLinkFn } from "@/app/functions/delete-link";
import { isLeft } from "@/shared/either";
import { shortLinkSchema } from "@/shared/links";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLink: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/link/:shortLink",
    {
      schema: {
        summary: "Delete link",
        tags: ["link"],
        params: z.object({
          shortLink: shortLinkSchema,
        }),
        response: {
          200: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params;

      const result = await deleteLinkFn(shortLink);

      if (isLeft(result)) {
        return reply.status(404).send({ message: result.left });
      }

      return reply.status(200).send({ message: "Link deleted successfully" });
    },
  );
};
