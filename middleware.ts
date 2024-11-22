import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;

  if (
    nextUrl.pathname.startsWith("/_next") ||
    nextUrl.pathname.includes("/api/") ||
    /\.(.*)$/.test(nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  const langParam = nextUrl.searchParams.get("lang");
  let locale = langParam || cookies.get("NEXT_LOCALE")?.value || "en";

  if (!langParam) {
    const response = NextResponse.redirect(
      new URL(`${nextUrl.pathname}?lang=${locale}${nextUrl.search}`, req.url)
    );
    response.cookies.set("NEXT_LOCALE", locale);
    return response;
  }

  if (langParam !== cookies.get("NEXT_LOCALE")?.value) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", langParam);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|assets).*)"],
};
