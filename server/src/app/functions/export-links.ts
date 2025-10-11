import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight, type Either } from "@/shared/either";
import { LinksReport } from "@/shared/links.model";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

export const exportLinksFn = async (
  origin: string,
): Promise<Either<never, LinksReport>> => {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      url: schema.links.url,
      shortLink: schema.links.shortLink,
      countVisits: schema.links.countVisits,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(50);

  const csv = stringify({
    delimiter: ",",
    header: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "url", header: "Original URL" },
      { key: "short_link", header: "Short URL" },
      { key: "count_visits", header: "Access Count" },
      { key: "created_at", header: "Created At" },
    ],
  });

  const uploadToStorageStream = new PassThrough();

  const rowTransformer = new Transform({
    objectMode: true,
    transform(chunks: unknown[], _, callback) {
      for (const chunk of chunks as Record<string, unknown>[]) {
        const transformedChunk = {
          ...chunk,
          short_link: `${origin}/${chunk.short_link}`,
        };
        this.push(transformedChunk);
      }
      callback();
    },
  });

  const convertToCSVPipeline = pipeline(
    cursor,
    rowTransformer,
    csv,
    uploadToStorageStream,
  );

  const uploadToStorage = uploadFileToStorage({
    contentType: "text/csv",
    folder: "downloads",
    fileName: `${new Date().toISOString()}-links.csv`,
    contentStream: uploadToStorageStream,
  });

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

  return makeRight({ reportUrl: url });
};
