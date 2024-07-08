import { sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

const timestamps = {
  created: text("created")
    .notNull()
    .default(sql`current_timestamp`),
  updated: text("updated")
    .notNull()
    .$onUpdate(() => sql`current_timestamp`)
}

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  ...timestamps
})

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id)
})
