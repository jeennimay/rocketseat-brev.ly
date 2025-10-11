import { describe, it, expect, beforeEach } from 'vitest'
import { deleteLinkFn } from '../delete-link'
import { createShortLinkFn } from '../create-short-link'
import { getOneLink } from '../get-one-link'
import { isLeft, isRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const testShortLink = 'brev-delete-test'
const testUrl = 'https://brevly.com'

async function clearTestLink(alias: string) {
  await db.delete(schema.links).where(eq(schema.links.shortLink, alias))
}

describe.sequential('deleteLinkFn', () => {
  beforeEach(async () => {
    await clearTestLink(testShortLink)
  })

  it('returns left if alias does not exist', async () => {
    const result = await deleteLinkFn(testShortLink)
    expect(isLeft(result)).toBe(true)
    expect(result.left).toBe('Link not found')
  })

  it('deletes an existing link and returns right', async () => {
    await createShortLinkFn({ url: testUrl, shortLink: testShortLink })
    const before = await getOneLink(testShortLink)
    expect(isRight(before)).toBe(true)
    const result = await deleteLinkFn(testShortLink)
    expect(isRight(result)).toBe(true)
    expect(result.right).toBe(true)
    const after = await getOneLink(testShortLink)
    expect(isLeft(after)).toBe(true)
  })

  it('deleting the same alias twice: first right, then left', async () => {
    await createShortLinkFn({ url: testUrl, shortLink: testShortLink })
    const first = await deleteLinkFn(testShortLink)
    expect(isRight(first)).toBe(true)
    const second = await deleteLinkFn(testShortLink)
    expect(isLeft(second)).toBe(true)
    expect(second.left).toBe('Link not found')
  })
})
