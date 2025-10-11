import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable('links', {
    //column name
    id:text('id').notNull().primaryKey().$defaultFn(() => uuidv7()),
    url: text('url').notNull(),
    shortLink: text('short_link').notNull().unique(),
    countVisits: integer('count_visits').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})