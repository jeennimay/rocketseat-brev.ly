import { describe, expect, it, beforeEach } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLink } from '@/test/factories/make-link'
import { getLinksFn } from '../get-links'
import { isRight, unwrapEither } from '@/shared/either'

describe.sequential('getLinksFn', () => {
  beforeEach(async () => {
    // Clean the entire links table before each test
    await db.delete(schema.links)
  })

  it('returns empty array when no links exist', async () => {
    // No need to delete links here since beforeEach already does it
    const result = await getLinksFn()

    expect(isRight(result)).toBe(true)
    const { links, total } = unwrapEither(result)
    expect(links).toEqual([])
    expect(total).toBe(0)
  })

  it('returns all links when they exist', async () => {
    // Create test links with a specific pattern we can identify
    const testPrefix = 'test-get-links-'
    const link1 = await makeLink({ shortLink: `${testPrefix}1` })
    const link2 = await makeLink({ shortLink: `${testPrefix}2` })
    const link3 = await makeLink({ shortLink: `${testPrefix}3` })

    const result = await getLinksFn()

    expect(isRight(result)).toBe(true)
    const { links, total } = unwrapEither(result)

    expect(total).toBe(3)
    // Verify each link has the correct properties
    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: link1.id,
          url: link1.url,
          shortLink: link1.shortLink,
          countVisits: link1.countVisits,
          createdAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: link2.id,
          url: link2.url,
          shortLink: link2.shortLink,
          countVisits: link2.countVisits,
          createdAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: link3.id,
          url: link3.url,
          shortLink: link3.shortLink,
          countVisits: link3.countVisits,
          createdAt: expect.any(Date),
        }),
      ])
    )
  })
})
