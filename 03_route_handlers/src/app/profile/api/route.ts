import { cookies, headers } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	// Headers -----
	// const requestHeaders = new Headers(request.headers);
	// console.log(requestHeaders.get("Authorization"));.

	const headerList = await headers();
	console.log(headerList.get("Authorization"));

	// Cookies -----
	const theme = request.cookies.get("theme");
	console.log(theme); // { name: 'theme', value: 'dark' }

	const cookieStore = await cookies();
	cookieStore.set("resultsPerPage", "20");
	console.log(cookieStore.get("resultsPerPage"));

	// return new Response("Profile API route!");
	return new Response("<h1>Profile API route!</h1>", {
		headers: {
			"Content-Type": "text/html",
			"Set-Cookie": "theme=dark",
		},
	});
}
