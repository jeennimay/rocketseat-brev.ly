
import { Either, isRight, makeLeft, makeRight } from '@/shared/either'
import { getOneLink } from './get-one-link'
import { LinksRequestObj, LinksRequestInput } from '@/shared/links'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import type { LinkResponse } from '@/shared/links.model'

export const createShortLinkFn = async (
  input: LinksRequestInput
): Promise<Either<string, LinkResponse>> => {
  const parsed = LinksRequestObj.safeParse(input)
  console.log(parsed)
  if (!parsed.success) {
    return makeLeft(parsed.error.message)
  }

  const { url, shortLink } = parsed.data

  const linkCheck = await getOneLink(shortLink)

  if (isRight(linkCheck)) {
    return makeLeft('Short link already exists')
  }

  const link = await db
    .insert(schema.links)
    .values({ url, shortLink })
    .returning({
      id: schema.links.id,
      url: schema.links.url,
      shortLink: schema.links.shortLink,
      createdAt: schema.links.createdAt,
      countVisits: schema.links.countVisits,
    })

  const [firstLink] = link

  return makeRight({
    id: firstLink.id,
    url: firstLink.url,
    shortLink: firstLink.shortLink,
    createdAt: firstLink.createdAt,
    countVisits: firstLink.countVisits,
  })
}
