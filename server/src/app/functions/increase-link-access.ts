import { type Either, isLeft, makeLeft, makeRight } from '@/shared/either'
import { getOneLink } from './get-one-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { eq } from 'drizzle-orm'
import type { LinkResponse } from '@/shared/links.model'

type IncreaseLinkAccessInput = {
  shortLink: string
}

export const increaseLinkAccessFn = async ({
  shortLink,
}: IncreaseLinkAccessInput): Promise<Either<string, LinkResponse>> => {
  const linkCheck = await getOneLink(shortLink)

  if (isLeft(linkCheck)) {
    return makeLeft('Link not found')
  }

  const links = await db
    .update(schema.links)
    .set({ countVisits: linkCheck.right.countVisits + 1 })
    .where(eq(schema.links.shortLink, shortLink))
    .returning({
      id: schema.links.id,
      url: schema.links.url,
      shortLink: schema.links.shortLink,
      countVisits: schema.links.countVisits,
      createdAt: schema.links.createdAt,
    })

  const [link] = links

  return makeRight(link)
}
