import { beforeEach, describe, expect, it, vi } from 'vitest'
import { makeLink } from '@/test/factories/make-link'
import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/shared/either'
import { exportLinksFn } from '../export-links'
import * as storage from '@/infra/storage/upload-file-to-storage'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

const fakeURL = 'https://storage.com/report.csv'

describe.sequential('export links', () => {
  beforeEach(async () => {
    await db.delete(schema.links)
  })

  it('should be able to export the links', async () => {
    const uploadStub = vi
      .spyOn(storage, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: fakeURL,
        }
      })

    const link1 = await makeLink()
    const link2 = await makeLink()
    const link3 = await makeLink()
    const link4 = await makeLink()
    const link5 = await makeLink()

    const origin = 'https://brevly.link'
    const sut = await exportLinksFn(origin)

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', error => {
        reject(error)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: fakeURL,
    })

    expect(csvAsArray).toEqual([
      ['ID', 'Original URL', 'Short URL', 'Access Count', 'Created At'],
      [
        link1.id,
        link1.url,
        `${origin}/${link1.shortLink}`,
        String(link1.countVisits),
        expect.any(String),
      ],
      [
        link2.id,
        link2.url,
        `${origin}/${link2.shortLink}`,
        String(link2.countVisits),
        expect.any(String),
      ],
      [
        link3.id,
        link3.url,
        `${origin}/${link3.shortLink}`,
        String(link3.countVisits),
        expect.any(String),
      ],
      [
        link4.id,
        link4.url,
        `${origin}/${link4.shortLink}`,
        String(link4.countVisits),
        expect.any(String),
      ],
      [
        link5.id,
        link5.url,
        `${origin}/${link5.shortLink}`,
        String(link5.countVisits),
        expect.any(String),
      ],
    ])
  })
})
