import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Custome matcher configuration to run middleware only on the /profile route
// export function middleware(request: NextRequest) {
// 	return NextResponse.redirect(new URL("/", request.url));
// }
// export const config = {
// 	matcher: "/profile",
// };

// Conditional statements to check the request method and URL
// export function middleware(request: NextRequest) {
// 	if (request.nextUrl.pathname === "/profile") {
// 		// Redirect - route changing /profile to /hello
// 		// return NextResponse.redirect(new URL("/hello", request.url));

// 		// Rewrite - route not changing /profile to /profile
// 		return NextResponse.rewrite(new URL("/hello", request.url));
// 	}
// }

// Setting a cookie in the response and header
export function middleware(request: NextRequest) {
	const response = NextResponse.next();
	// cookie setting
	const themePreference = request.cookies.get("theme");
	if (!themePreference) {
		response.cookies.set("theme", "dark");
	}
	// header setting
	response.headers.set("custom-header", "custom-value");
	return response;
}
