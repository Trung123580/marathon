import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token-app")
  if (token && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (!token && request.nextUrl.pathname === "/change-password") {
    return NextResponse.redirect(new URL("/", request.url))
  }
  if (request.nextUrl.pathname === '/'){
    return NextResponse.redirect(new URL("/event/mangdenultratrail2025", request.url)) // để tạm thời
  }
  // You can keep any other middleware logic here if needed
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
