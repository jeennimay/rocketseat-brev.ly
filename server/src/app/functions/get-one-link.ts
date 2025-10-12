import { eq } from "drizzle-orm";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLeft, makeRight, type Either } from "@/shared/either";
import type { LinkResponse } from "@/shared/links.model";

export const getOneLink = async (
  shortLink: string,
): Promise<Either<string, LinkResponse>> => {
  const linkResult = await db
    .select({
      id: schema.links.id,
      url: schema.links.url,
      shortLink: schema.links.shortLink,
      countVisits: schema.links.countVisits,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .where(eq(schema.links.shortLink, shortLink));

  const [link] = linkResult;

  if (!link) {
    return makeLeft("Link not found");
  }

  return makeRight({
    id: link.id,
    url: link.url,
    shortLink: link.shortLink,
    countVisits: link.countVisits,
    createdAt: link.createdAt,
  });
};
