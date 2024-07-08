import { defineConfig } from "drizzle-kit"
import "dotenv/config"

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ...(process.env.DATABASE_TOKEN?.length > 0 && {
      authToken: process.env.DATABASE_TOKEN
    })
  }
})
