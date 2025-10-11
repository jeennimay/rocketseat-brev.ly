import { exportLinksFn } from "@/app/functions/export-links";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinks: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/report",
    {
      schema: {
        summary: "Export links report",
        tags: ["links"],
        response: {
          200: z.object({ reportUrl: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const result = await exportLinksFn(
        request.headers.origin ?? "http://brev.ly",
      );

      const { reportUrl } = unwrapEither(result);

      return reply.status(200).send({ reportUrl });
    },
  );
};
