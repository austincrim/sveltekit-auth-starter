import { drizzle } from "drizzle-orm/libsql"
import { migrate } from "drizzle-orm/libsql/migrator"
import { createClient } from "@libsql/client"
import * as schema from "./schema"

export const connection = createClient({
  url: "file:./dev.db"
})

export const db = drizzle(connection, { schema })

console.log("migrating db...")
migrate(db, {
  migrationsFolder: "drizzle"
})
console.log("migration successful!")
