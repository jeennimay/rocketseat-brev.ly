import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
    //column name
    id: uuid().defaultRandom().primaryKey(),
    url: text('url').notNull(),
    shortLink: text('short_link').notNull().unique(),
    countVisits: integer('count_visits').default(0).notNull(),
    // createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    remoteKey: text('remote_key').notNull().unique(),
})