import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const notFound = new URL("/404", req.url);
  const token = req.cookies.get("fb-token");

  if (!token) {
    return NextResponse.rewrite(notFound);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*"
};
