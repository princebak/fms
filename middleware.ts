import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/dashboard") {
    const localSession = request.cookies.get("next-auth.session-token");
    const onlineSession = request.cookies.get(
      "__Secure-next-auth.session-token"
    );

    if (!localSession && !onlineSession) {
      console.log("Not logged in");
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login page
    }
  }

  return NextResponse.next();
}
