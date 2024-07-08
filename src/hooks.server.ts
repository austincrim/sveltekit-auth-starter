import { redirect } from "@sveltejs/kit"
import { auth } from "$lib/server/auth"

export const PUBLIC_ROUTES = ["/login", "/register"]

export async function handle({ event, resolve }) {
  if (PUBLIC_ROUTES.includes(event.url.pathname)) {
    return await resolve(event)
  }

  const sessionId = event.cookies.get(auth.sessionCookieName)
  if (!sessionId) {
    event.locals.user = null
    event.locals.session = null
    return redirect(302, "/login")
  }

  const { session, user } = await auth.validateSession(sessionId)
  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id)
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })
  }
  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie()
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })
  }
  event.locals.user = user
  event.locals.session = session
  return resolve(event)
}
