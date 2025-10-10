import z from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.url().startsWith("postgresql://"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("production"),

    // cloudflare
    CLOUDFLARE_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_SECRET_ACCESS_KEY_ID: z.string(),
    CLOUDFLARE_BUKET: z.string(),
    CLOUDFLARE_ACCOUNT_ID: z.string(),
    CLOUDFLARE_PUBLICK_URL: z.string().url(),
    CLOUDFLARE_PORT: z.coerce.number().default(3333),

    // database
    POSTGRES_USER: z.string().default('docker'),
    POSTGRES_PASSWORD: z.string().default('docker'),
    POSTGRES_DB: z.string().default('brevly'),
    POSTGRES_PORT: z.coerce.number().default(5432),
})

export const env = envSchema.parse(process.env);