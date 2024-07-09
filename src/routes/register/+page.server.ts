import { fail, redirect } from "@sveltejs/kit"
import { hashSync } from "@node-rs/argon2"
import { db } from "$lib/server/db/drizzle"
import { users } from "$lib/server/db/schema"
import { auth } from "$lib/server/auth"

export const load = async ({ locals }) => {
  if (locals.user) redirect(302, "/")
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData()
    const email = formData.get("email")?.toString().trim()
    const password = formData.get("password")?.toString().trim()
    const confirmed = formData.get("confirmed")?.toString().trim()
    if (typeof email !== "string" || email.length === 0) {
      return fail(400, {
        message: "Invalid email"
      })
    }
    if (
      typeof password !== "string" ||
      typeof confirmed !== "string" ||
      password !== confirmed
    ) {
      return fail(400, {
        message: "Invalid password"
      })
    }
    let existing = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)
    })
    if (existing) {
      return fail(400, {
        message: "user exists with that email"
      })
    }
    try {
      let hash = hashSync(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      })
      let [user] = await db
        .insert(users)
        .values({ email, password_hash: hash })
        .returning()

      const session = await auth.createSession(user.id, {})
      const sessionCookie = auth.createSessionCookie(session.id)
      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      })
    } catch (e) {
      console.error(e)
      return fail(500, {
        message: "An unknown error occurred"
      })
    }

    redirect(302, "/")
  }
}
