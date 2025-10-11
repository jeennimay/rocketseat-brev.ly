
import { type Either, isLeft, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { getOneLink } from './get-one-link'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

export const deleteLinkFn = async (
  shortLink: string
): Promise<Either<string, boolean>> => {
  const linkCheck = await getOneLink(shortLink)

  if (isLeft(linkCheck)) {
    return makeLeft('Link not found')
  }

  await db.delete(schema.links).where(eq(schema.links.shortLink, shortLink))

  return makeRight(true)
}
