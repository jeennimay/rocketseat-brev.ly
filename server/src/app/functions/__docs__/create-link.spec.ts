import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { LinksRequestInput } from "@/shared/links"
import { eq } from "drizzle-orm"
import { beforeEach, describe, expect, it } from "vitest"
import { createShortLinkFn } from "../create-short-link"
import { isLeft, isRight, unwrapEither } from "@/shared/either"
import { getOneLink } from "../get-one-link"


const testShortLink = 'short-link'
const testUrl = 'https://brevly.com'

async function clearTestLink(shortLink: string) {
  await db.delete(schema.links).where(eq(schema.links.shortLink, shortLink))
}

describe.sequential('createShortLink', () => {
  beforeEach(async () => {
    await clearTestLink(testShortLink)
  })

  it('returns left if input is invalid', async () => {
    const invalidInput: LinksRequestInput = {
      url: '123',
      shortLink: testShortLink,
    }
    const result = await createShortLinkFn(invalidInput)
    expect(isLeft(result)).toBe(true)
    expect(result.left).toMatch(/url/)
  })

  it('returns left if shortLink already exists', async () => {
    await db
      .insert(schema.links)
      .values({ url: testUrl, shortLink: testShortLink })
    const result = await createShortLinkFn({ url: testUrl, shortLink: testShortLink })
    expect(isLeft(result)).toBe(true)
    expect(result.left).toBe('shortLink already exists')
  })

  it('creates link and returns right with linkId', async () => {
    const result = await createShortLinkFn({ url: testUrl, shortLink: testShortLink })
    expect(isRight(result)).toBe(true)
    expect(result.right).toHaveProperty('linkId')
    const link = await getOneLink(testShortLink)
    expect(isRight(link)).toBe(true)
    if (isRight(link)) {
      expect(unwrapEither(link).shortLink).toBe(testShortLink)
      expect(unwrapEither(link).url).toBe(testUrl)
    }
  })
})
