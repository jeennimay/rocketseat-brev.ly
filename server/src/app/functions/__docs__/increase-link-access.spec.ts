import { describe, expect, it, beforeEach } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLink } from '@/test/factories/make-link'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { randomUUID } from 'node:crypto'
import { increaseLinkAccessFn } from '../increase-link-access'

describe.sequential('increaseLinkAccess', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('returns left with "Link not found" when link does not exist', async () => {
    const nonExistentAlias = randomUUID()
    const result = await increaseLinkAccessFn({ alias: nonExistentAlias })

    expect(isLeft(result)).toBe(true)
    expect(result.left).toBe('Link not found')
  })

  it('increments access count and returns updated link data', async () => {
    // Create a test link
    const testLink = await makeLink()
    const initialVisits = testLink.countVisits

    const result = await increaseLinkAccessFn({ alias: testLink.shortLink })

    expect(isRight(result)).toBe(true)
    const link = unwrapEither(result)

    expect(link).toEqual({
      id: testLink.id,
      url: testLink.url,
      shortLink: testLink.shortLink,
      countVisits: initialVisits + 1,
      createdAt: expect.any(Date),
    })
  })

  it('correctly updates access count when called multiple times', async () => {
    // Create a test link
    const testLink = await makeLink()
    const initialVisits = testLink.countVisits

    // Increase access count twice
    await increaseLinkAccessFn({ alias: testLink.shortLink })
    const result = await increaseLinkAccessFn({ alias: testLink.shortLink })

    expect(isRight(result)).toBe(true)
    const link = unwrapEither(result)

    expect(link).toEqual({
      id: testLink.id,
      url: testLink.url,
      shortLink: testLink.shortLink,
      countVisits: initialVisits + 2,
      createdAt: expect.any(Date),
    })
  })
})
