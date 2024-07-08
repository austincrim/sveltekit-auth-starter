import { verifySync } from "@node-rs/argon2"
import { fail, redirect } from "@sveltejs/kit"
import { db } from "$lib/server/db/drizzle.js"
import { auth } from "$lib/server/auth"

export const load = async ({ locals }) => {
  if (locals.user) redirect(302, "/")
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    const email = formData.get("email")?.toString().trim()
    const password = formData.get("password")?.toString().trim()

    if (typeof email !== "string" || email.length === 0) {
      return fail(400, {
        message: "Invalid email"
      })
    }
    if (typeof password !== "string" || password.length === 0) {
      return fail(400, {
        message: "Invalid password"
      })
    }
    try {
      let existing = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
      })

      if (!existing || !verifySync(existing.password_hash, password))
        return fail(400, { message: "email or password incorrect" })

      const session = await auth.createSession(existing.id, {})
      const sessionCookie = auth.createSessionCookie(session.id)
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: "/",
        ...sessionCookie.attributes
      })
    } catch (e) {
      console.error(e)
      return fail(500, {
        message: "An unknown error occurred"
      })
    }
    return redirect(302, "/")
  }
}
