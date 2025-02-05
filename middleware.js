import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Kiểm tra đường dẫn không hợp lệ
  if (!url.pathname.startsWith("/") && !url.pathname.startsWith("/api")) {
    url.pathname = "/error"; // Điều hướng đến /error
    return NextResponse.redirect(url);
  }
}
