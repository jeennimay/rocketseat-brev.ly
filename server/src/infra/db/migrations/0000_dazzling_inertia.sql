CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"short_link" text NOT NULL,
	"count_visits" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"remote_key" text NOT NULL,
	CONSTRAINT "links_short_link_unique" UNIQUE("short_link"),
	CONSTRAINT "links_remote_key_unique" UNIQUE("remote_key")
);
