import { drizzle } from "drizzle-orm/libsql"
import { migrate } from "drizzle-orm/libsql/migrator"
import { createClient } from "@libsql/client"
import { DATABASE_URL, DATABASE_TOKEN } from "$env/static/private"
import * as schema from "./schema"

export const connection = createClient({
  url: DATABASE_URL,
  ...(DATABASE_TOKEN?.length > 0 && { authToken: DATABASE_TOKEN })
})

export const db = drizzle(connection, { schema })

console.log("migrating db...")
migrate(db, {
  migrationsFolder: "drizzle"
})
console.log("migration successful!")
