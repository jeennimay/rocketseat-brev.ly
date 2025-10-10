//  "dev": "tsx watch --env-file .env src/infra/http/server.ts",
// "build": "tsup src --format esm",



// docker - compose
/* 
  app:
    build: .
    depends_on:
      - db
    container_name: brevly-server
    ports:
      - 3000:$CLOUDFLARE_PORT
    environment:
      - CLOUDFLARE_ACCESS_KEY_ID=$CLOUDFLARE_ACCESS_KEY_ID
      - CLOUDFLARE_SECRET_ACCESS_KEY_ID=$CLOUDFLARE_SECRET_ACCESS_KEY_ID
      - CLOUDFLARE_BUKET=$CLOUDFLARE_BUKET
      - CLOUDFLARE_ACCOUNT_ID=$CLOUDFLARE_ACCOUNT_ID
      - CLOUDFLARE_PUBLICK_URL=$CLOUDFLARE_PUBLICK_URL
    networks:
      - widget
*/