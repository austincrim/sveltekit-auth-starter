import { Lucia } from "lucia"
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite"
import { connection } from "./db/drizzle"
import { dev } from "$app/environment"

export const auth = new Lucia(
  new LibSQLAdapter(connection, { user: "users", session: "sessions" }),
  {
    sessionCookie: {
      name: "session_id",
      attributes: {
        path: "/",
        secure: !dev
      }
    },
    getUserAttributes(attrs) {
      return {
        email: attrs.email
      }
    }
  }
)

declare module "lucia" {
  interface Register {
    Lucia: typeof auth
    DatabaseUserAttributes: DatabaseUserAttributes
    UserId: number
  }
}

interface DatabaseSessionAttributes {}
interface DatabaseUserAttributes {
  email: string
}
