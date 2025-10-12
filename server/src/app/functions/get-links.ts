import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight, type Either } from "@/shared/either";
import { LinksResponse } from "@/shared/links.model";

type GetLinksOutput = {
  links: LinksResponse;
  total: number;
};

export const getLinksFn = async (): Promise<Either<never, GetLinksOutput>> => {
  const links: LinksResponse = await db
    .select({
      id: schema.links.id,
      url: schema.links.url,
      shortLink: schema.links.shortLink,
      countVisits: schema.links.countVisits,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy(schema.links.createdAt);

  const total = links.length;

  return makeRight({ links, total });
};
