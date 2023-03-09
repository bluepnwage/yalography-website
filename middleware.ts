import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const notFound = new URL("/404", req.url);
  const token = req.cookies.get("fb-token");
  if (req.nextUrl.pathname === "/") {
    if (req.nextUrl.searchParams.get("admin")) return NextResponse.next();
    if (token) {
      console.log("it ran");
      const url = new URL("", req.nextUrl);
      url.searchParams.set("admin", "1");
      console.log(url.search);
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  } else {
    if (!token) {
      return NextResponse.rewrite(notFound);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/"]
};
