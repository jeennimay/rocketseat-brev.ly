import { describe, expect, it, beforeEach } from "vitest";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeLink } from "@/test/factories/make-link";
import { getOneLink } from "../get-one-link";
import { isLeft, isRight, unwrapEither } from "@/shared/either";
import { randomUUID } from "node:crypto";

describe.sequential("getOneLink", () => {
  beforeEach(async () => {
    await db.delete(schema.links);
  });

  it('returns left with "Link not found" when link does not exist', async () => {
    const nonExistentAlias = randomUUID();
    const result = await getOneLink(nonExistentAlias);

    expect(isLeft(result)).toBe(true);
    expect(result.left).toBe("Link not found");
  });

  it("returns right with link data when link exists", async () => {
    // Create a test link
    const testLink = await makeLink();

    const result = await getOneLink(testLink.shortLink);

    expect(isRight(result)).toBe(true);
    const link = unwrapEither(result);

    expect(link).toEqual({
      id: testLink.id,
      url: testLink.url,
      shortLink: testLink.shortLink,
      countVisits: testLink.countVisits,
      createdAt: expect.any(Date),
    });
  });

  it("returns the correct link when multiple links exist", async () => {
    // Create multiple test links
    await makeLink();
    const testLink2 = await makeLink();
    await makeLink();

    const result = await getOneLink(testLink2.shortLink);

    expect(isRight(result)).toBe(true);
    const link = unwrapEither(result);

    expect(link).toEqual({
      id: testLink2.id,
      url: testLink2.url,
      shortLink: testLink2.shortLink,
      countVisits: testLink2.countVisits,
      createdAt: expect.any(Date),
    });
  });
});
