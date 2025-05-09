# NEXT.JS

## React.js

-   React is a library for building user interfaces.

-   It's not feasible to create a fully-featured application ready for production.

-   You need to make decisions about other features such as routing, data fetching and more.

## Next.js

-   Next.js is a React Framework for building web applications.

-   It uses React for building user interfaces.

-   Provides additional features that enable you to build production-ready applications.

-   These features include routing, optimized rendering, data fetching, bundling, compiling and more.

-   You don't need to install additional packages as Next.js provides everything you need.

-   Opinions and conventions should be followed to implement these features.

-   Next.js simplifies the process of building a web application for production.

    1.  Routing
    2.  Api routes
    3.  Redirect
    4.  Data fetching
    5.  Styling
    6.  Optimization
    7.  Dev and prod build system and more

## Prerequisites

-   HTML, CSS, JavaScript fundamentals
-   ES6 + features
-   React fundamentals

### Create next application & Start application

```
npx create-next-app@latest
```

Need to install the following packages. \
Enter Project name - project_name \
And More information

```
cd project_name
npm run dev
```

Get started by editing `src/app/page.tsx`

## React Server Components (RSC)

React Server Components is a new architecture that was introduced by the React team and quickly adopted by Next.js. \
This architecture introduces a new approach to creating React components by dividing them into two distinct types.

-   Server Components
-   Client Components

### Server Components

> By default, Next.js treats all components as Server components. \
> These components can perform server-side tasks like reading files or featching data directly from a database. \
> The trade-off is that they can't use React hooks or handle user interctions.

### Client Components

> To create a client component, you'll need to add the `use client` directive at the top of your component file. \
> While Client components can't perform server-side tasks like reading files, they can use hooks and handle user interactions. \
> Client components are the traditional React components you're already familiar with from previous versions of React.

## Routing

Next.js has a file-system based routing mechanism \
URL paths that users can access in the browser are defined by files and folders in youu codebase

### Routing Conventions

All routes must be placed inside the **app** folder \
Every file that corresponds to a route must be named **page.js** or **page.tsx** \
Every folder corresponds to a path segment in the browser URL.

### Home Route `/`

> Scenario 1

```
app
├── layout.tsx
└── page.tsx    (/ -> route)
```

`/`

### File based routing contd. `Route1`

> Scenario 2

```
app
├── about
│ └── page.tsx  (/about -> route)
├── profile
│ └── page.tsx  (/profile -> route)
├── layout.tsx
└── page.tsx    (/ -> route)
```

`/` `/about` `/profile`

### Nested Routes `Route1/Route2`

> Scenario 3

```
app
├── blog
│ ├── first
│ │ └── page.tsx    (/blog/first -> route)
│ ├── second
│ │ └── page.tsx    (/blog/second -> route)
│ └── page.tsx      (/blog -> route)
├── layout.tsx
└── page.tsx        (/ -> route)
```

`/` `/blog` `/blog/first` `/blog/second`

### Dynamic Routes `Route1/[Route1ID]`

> Scenario 4

```
app
├── products
│ ├── [productId]
│ │ └── page.tsx    (/products/productId -> route)
│ └── page.tsx      (/products -> route)
├── layout.tsx
└── page.tsx        (/ -> route)
```

`/` `/products` `/products/1` `/products/100`

```tsx
export default async function ProductDetails({
	params,
}: {
	params: Promise<{ productId: string }>;
}) {
	// const productId = (await params).productId;
	const { productId } = await params;
	return <h1>Product {productId} page</h1>;
}
```

### Nested Dynamic Routes `Route1/[Route1ID]/Route2/[Route2ID]`

> Scenario 5

```
app
├── products
│ ├── [productId]
│ │ ├── reviews
│ │ │ └── [reviewId]
│ │ │   └── page.tsx    (/products/productId/reviews/reviewId -> route)
│ │ └── page.tsx        (/products/productId -> route)
│ └── page.tsx          (/products -> route)
├── layout.tsx
└── page.tsx            (/ -> route)
```

`/` `/products` `/products/1` `/products/1/reviews/1` `/products/100/reviews/5`

```tsx
export default async function ReviewsDetails({
	params,
}: {
	params: Promise<{ productId: string; reviewId: string }>;
}) {
	const { productId, reviewId } = await params;
	return (
		<h1>
			Reviews {reviewId} for Products {productId}
		</h1>
	);
}
```

### Catch all Segments `Route1/[[...slug]]`

> Scenario 6

```
app
├── docs
│ └── [[...slug]] ya [...slug]
│   └── page.tsx    (/docs/routing & /docs/routing/catch-all-segments -> route)
├── layout.tsx
└── page.tsx        (/ -> route)
```

`/` `/docs` `/docs/routing` `/docs/routing/catch-all-segments` `/docs/abc/pqr/xyz`

```tsx
export default async function Docs({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}) {
	const { slug } = await params;
	if (slug?.length === 2) {
		return (
			<h1>
				Viewing docs for feature {slug[0]} and concept {slug[1]}
			</h1>
		);
	} else if (slug?.length === 1) {
		return <h1>Viewing docs for feature {slug[0]}</h1>;
	}
	return <h1>Docs home page</h1>;
}
```

### Not found page `Route1/not-found.tsx`

-   Route not match - not-found.tsx
-   not-found.tsx function does not accept **props**, use `usePathname` hook.
-   Use this hook to render page not found - `notFound`

```
app
├── products
│ ├── [productId]
│ │ ├── reviews
│ │ │ └── [reviewId]
│ │ │   └── not-found.tsx   (/products/(page not found) -> route) (productId < 1000)
│ │ │   └── page.tsx        (/products/productId/reviews/reviewId -> route)
│ │ └── page.tsx            (/products/productId -> route)
│ └── page.tsx              (/products -> route)
├── layout.tsx
├── not-found.tsx           (page not found | 404)
└── page.tsx                (/ -> route)
```

`/` `/jack` `/products/1/reviews/1001`

### File Colocation

-   routes file name must be `page.tsx`
-   `export default` (otherwise elements will not be displayed and a 404 error will occur)
-   Create React Component at `src/component` path

### Private Folders `_lib`

-   A way to tell Next.js, "Hey, this folder is just for internal stuff - don't include it in the routing system."
-   The folder and all its subfolders are excluded from routing.
-   Add an underscore `_` at the start of the folder name.
-   Private folders are super useful for a bunch of things:
    -   Keeping your UI logic separate from routing logic
    -   Having a consistent way to organize internal files in your project
    -   Making it easier to group related files in your code editor
    -   Avoiding potential naming conflicts with future Next.js file naming conventions
-   If you actually want an underscore in your URL, use `%5F` instead. That's just the URL-encoded version of an underscore.

### Route Groups `(auth)`

-   Allows us to logically group our routes and project files without affecting the the URL

```
app
├── (auth)              (not included in routes)
│ ├── forgot-password
│ │ └── page.tsx        (/forgot-password -> route)
│ ├── login
│ │ └── page.tsx        (/login -> route)
│ └── register
│   └── page.tsx        (/register -> route)
├── layout.tsx
└── page.tsx            (/ -> route)
```

`/` `/login` `/register` `/forgot-password`

### Layouts `layout.tsx`

-   Pages are route-specific UI components
-   A layout is UI that is shared between multiple pages in you app
-   Default export a React component from a **layout.js** or **layout.tsx** file.
-   That component should accept a `children` prop that will be populated with a child page during rendering.
-   we don't need to create layout from scretch because Next.js provide one by default.

```tsx
// RootLayout Function
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div>
					<p>Header</p>
				</div>
				{children}
				<div>
					<p>Footer</p>
				</div>
			</body>
		</html>
	);
}
// Replace children variable from routes page.jsx
```

**Nested Layout**

```
app
├── products
│ ├── [productId]
│ │ ├── layout.tsx          (product layout)
│ │ └── page.tsx            (/products/productId -> route)
│ └── page.tsx              (/products -> route)
├── layout.tsx              (root layout)
├── not-found.tsx           (page not found | 404)
└── page.tsx                (/ -> route)
```

### Route Group Layout / Multiple Root Layouts

-   To organize our project structure without affecting the URLs.
-   Apply layouts selectively to specific parts of our app.

```
app
├── (auth)                  (not included in routes)
│ ├── forgot-password
│ │ └── page.tsx            (/forgot-password -> route)
│ └── (with-auth-layout)    (not included in routes)
│   ├── layout.tsx          (auth layout)
│   ├── login
│   │ └── page.tsx          (/login -> route)
│   └── register
│     └── page.tsx          (/register -> route)
├── layout.tsx              (root layout)
└── page.tsx                (/ -> route)
```

### Routing Metadata

The Metadata API in Next.js is a powerful feature that lets us define metadata for each page \
Metadata ensures our content looks geat when it's shared or indexed by search engines \
Two ways to handle metadata in layout.tsx or page.tsx files:

1.  export a static `metadata` object
2.  export a dynamic `generateMetadata` function

> **Configuring Metadata**

**Metadata rules**

-   Both `layout.tsx` and `page.tsx` files can export metadata. Layout metadata applies to all pages, while page metadata is specific to that pages
-   Metadata is read in order, from the root level down to the final page level
-   When metadata exists in multiple places along a route, they merge together, with page metadata overriding layout metadata for matching properties

**title Metadata**

-   The title field's primary purpose is to define the document title.
-   It can be either a string or an object.
-   `absolute`, `default`, `template`

```tsx
import { Metadata } from "next";
export const metadata: Metadata = {
	// title object
	title: {
		// absolute: "Next Routing",   // Exact title name
		default: "Routing on Next.js", // default for all pages
		template: "%s | Routing Chapter", // replace %s with child title
	},
	description: "Generated by Next.js",
};
```

### Navigation

-   File based routing system
-   Defining routes for our application's root, nested routes, dynamic routes, and catch-all routes

**Link Tag**

-   For client-side navigation, Next.js gives us the `<Link>` component
-   `Link` tag used to navigate different pages
-   Syntax `<Link href="/">Home</Link>`

**replace Attributes**

-   `replace` attribute Replace the current history state instead of adding a new url into the stack.
-   Syntax `<Link href="/products/1" replace>Product 1</Link>`

**usePathname**

-   This function returns the current path.
-   `usePathname` works on the client side. To use `usePathname` on the server side, write `"use client";` at the top of the file.

**params and searchParams**

For a given URL

-   `params` is a promise that resolves to an object containing the dynamic route parameters (like id)
-   `searchParams` is a promise that resolves to an object containing the query parameters (like filters and sorting)
-   While `page.tsx` has access to both `params` and `searchParams`, `layout.tsx` only has access to `params`

**useRouter / Navigation Programmatically**

-   `useRouter` works on the client side. To use `useRouter` on the server side, write `"use client";` at the top of the file.
-   This function is used to navigate to other path.

```tsx
import { useRouter } from "next/router";
// use
const route = useRouter();
router.push("/"); // navigate to "/"
router.replace("/"); // Replace "/" with the current path
router.back(); // navigate back
router.forward(); // navigate forward
```

```tsx
import {redirect} = from "next/navigation";
// use
redirect("/products");
```

### Templates `template.tsx`

-   **Templates** are **similar** to layout in that they wrap each child layout or page
-   But, with templates, when a user navigates between routes that share a template, a new instance of the component is `mounted`, DOM elements are recreated, `state is not preserved`, and effects are `re-synchronized`

-   A template can be defined by exporting a default React component from a `template.js` or `template.tsx` file
-   Similar to layout, templates also should accept a children prop which will render the nested segments in the route.
-   You can also use both layout and template component

> **layout** -> `state preserved`

> **template** -> `state not preserved`

### Loading UI `loading.tsx`

-   This file allows us to create a loading state that are displayed to users while a specific route segment's content is loaded

-   The loading state appears immediately upon navigation, giving users the assurance that the application is responsive and actively loading content.

1. It gives users immediate feedback when they navigate somewhere new This makes your app feel snappy and responsive, and users know their click actually did something.
2. Next.js keeps shared layouts interactive while new content loads Users can still use things like navigation menus or sidebars even if the main content isn't ready yet.

### Error Handling `error.tsx`

-   Automatically wrap a route segment and its nested children in a React Error Boundary
-   You can create error UI for specific segments using the file-system hierarchy
-   Isolate errors to affected segments while keeping the rest of the application functional
-   Add functionality to attempt to recover from an error without a full page reload.

```tsx
// Components Hierarchy
// layout.tsx
// template.tsx
// error.tsx
// loading.tsx
// not-found.tsx
// page.tsx

<Layout>
	<Template>
		<ErrorBoundary fallback={<Error />}>
			<Suspense fallback={<Loading />}>
				<ErrorBoundary fallback={<NotFound />}>
					<Page />
				</ErrorBoundary>
			</Suspense>
		</ErrorBoundary>
	</Template>
</Layout>
```

**Recovering From Errors**

```tsx
// This component will be rendered on the client-side only (not server-side)
"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	const router = useRouter();
	const reload = () => {
		startTransition(() => {
			router.refresh();
			reset();
		});
	};
	return (
		<div>
			<h3>{error.message}</h3>
			<button onClick={reload}>Try Again</button>
		</div>
	);
}
```

**Handling Errors in Nested Routes**

-   Errors bubble up to the closest parent error boundary.
-   An `error.tsx` file handles errors not just for its own folder, but for all the nested child segments below it too.
-   By strategically `error.tsx` files at different levels in your route folders, you can control exactly how detailed your error handling gets.
-   Where you put your `error.tsx` file makes a huge difference - it determines exactly which parts of your UI get affected when things go wrong.

**Handling Error in Layouts**

-   An `error.tsx` file will handle errors for all its nested child sections.
-   There's an intersting catch with `layout.tsx` components in the same segment.
-   The error boundary won't catch errors thrown in `layout.tsx` within the same segment because of how the `component hierarchy` works.
-   The layout actually sits above the error boundary in the component tree.

**Handling global errors** `global-error.tsx`

-   If an error boundary can't catch errors in the `layout.tsx` file from the same segment, what about errors in the `root layout`?
-   It doesn't have a parent segment - how do we handle those errors?
-   `Next.js` provides a special file called `global-error.tsx` that goes in your `root app` directory.
-   This is your last line of defense when something goes catastrophically wrong as the highest levell of your app.
    -   Works only in production mode
    -   Requires html and body tags to be rendered

### Special Files

1. **layout.tsx**: Defines the overall structure and layout of the application.
2. **template.tsx**: Provides a template for common elements across multiple pages.
3. **error.tsx**: Handles and displays error messages and pages.
4. **loading.tsx**: Displays a loading indicator or animation while content is being fetched.
5. **not-found.tsx**: Renders a 404 page when a route is not found.
6. **page.tsx**: Represents an individual page within the application.

### Advanced routing patterns

1. Parallel Routes `@folder`
2. Intercepting Routes ``

### Parallel Routes `@folder`

> Scenario 7

-   What they are:

    -   Parallel routes are an advanced routing mechanism that allows for the simulataneous rendering of multiple pages within the same layout.

-   How to set them up:

    -   Parallel routes in Next.js are defined using a feature known as slots.
    -   Slots help structure our content in a modular fashion.
    -   To define a slot, we use the `@folder` naming convention.
    -   Each slot is then passed as a prop to its corresponding `layout.tsx` file.

-   Parallel routes use cases

    -   Dashboards with multiple sections
    -   Split-view interfaces
    -   Multi-pane layouts
    -   Complex admin interfaces

-   Parallel routes benefits
    -   Paralles routes are great for splitting a layout into manageable slots (especilly when different teams work on different parts)
    -   Independent route handling
        -   Each slot in your layout, such as users, revenue, and notifications, can handle its own loading and error states
        -   This granular control is particularly useful in scenarios where different sections of the page load at varying speeds or encounter unique error
    -   Sub-navigation
        -   Each slot can essentially functions as a mini-application, complete with its own navigation and state management
        -   Users can interact with each section separately, applying filters, sorting data, or navigation through pages without affecting other parts

```
app
├── complex-dashboard
│ ├── @notifications
│ │ └── page.tsx
│ ├── @revenue
│ │ └── page.tsx
│ └── @users
│   └── page.tsx
├── layout.tsx
└── page.tsx
```

### Unmatched Routes `default.tsx`

**Sub-Navigation from the UI**

-   When navigating through the UI (like clicking links), Next.js keeps showing whatever was in the unmatched slots before

**Page reload**

-   Next.js immediately searches for a `default.tsx` file within each unmatched slot
-   This file is critical as a fallback to render content when the framewrok connot retrieve a slot's active state from the current URL
-   If this `default.tsx` file is missing in any of the unmatched slots for the current route Next.js will render a 404 error.

**default.tsx**

-   The `default.tsx` file in Next.js serves as a fallback to render content when the framwork cannot retrieve a slot's active state from the current URL.
-   You have complete freedom to define the UI fro unmatched routes: you can either mirror the content found in page.tsx or craft an entirely custom view.

### Conditional routes `complex-dashboard/@login`

-   Imagine you want to show different content based on whether a user is logged in or not
-   You might want to display a dashboard for authenticated users but show a login page for those who aren't
-   Conditional routes allow us to achieve this while maintaining completely separate code on the same URL

### Intercepting Routes `(.)`,`(..)`,`(..)(..)`,`(...)`

-   Intercepting routes is an advanced routing machanism that allows you to load a route form another part of your application within the current layout.
-   It's particularly useful when you what to display new content while keeping your user in the same context.

**Intercepting routes conventions**

-   `(.)` to match segments on the `same level` Ex- (.)route
-   `(..)` to match segments `one level above` Ex- (..)route
-   `(..)(..)` to match segments `two level above` Ex- (..)(..)route
-   `(...)` to match segments from the `root app directory` Ex- (...)route

### 🌐 Example & Comparison Table

-   If you navigate from `/posts` to `/posts/123`, the modal pops up, and the background remains the post list.
-   If you refresh or visit `/posts/123` directly, you see the full post detail page.

| Feature                  | Parallel Routes                                 | Intercepting Routes                                               |
| ------------------------ | ----------------------------------------------- | ----------------------------------------------------------------- |
| 🧠 Purpose               | Render multiple independent routes in parallel. | Render a route as an overlay without full navigation.             |
| 📐 Layout Behavior       | Divides the page into multiple slots.           | Displays a route's content above the current route (e.g., modal). |
| 🧾 URL Behavior          | Usually same URL for multiple parallel areas.   | URL updates, but background page remains active.                  |
| 💡 Typical Use Case      | Dashboards, chat layouts, sidebars.             | Modals, drawers, previews.                                        |
| ⚙️ Folder Naming         | `@slotName` folders inside layouts.             | `@(.)[route]` folders for modal/intercepted content.              |
| 🏎️ Navigation Experience | Different route parts load together.            | Background persists, new route overlays on top.                   |

> 🎯 Summary:

| Concept             | Explanation                                   |
| ------------------- | --------------------------------------------- |
| Parallel Routes     | Layout splits into multiple dynamic sections. |
| Intercepting Routes | Allows overlay-like navigation for routes.    |

✅ Use **Parallel Routes** when you want:

-   Different components (main, sidebar, notifications) to work in parallel.

✅ Use **Intercepting Routes** when you want:

-   One route to load on top of another (like modals) while preserving page context.

> 💡 **Tip:**

Both can be combined!  
For example: a dashboard with a sidebar (`Parallel Route`) and a post detail modal (`Intercepting Route`) on top.

## Route Handlers

We've learned how to route to pages\
The app router lets you create custom request handlers for your routes using a feature called `Route Handlers`\
Unlike page routes, which give us HTML content, Route Handlers let us build `RESTful` endpoints with complete control over the response\
Think of it like building a `Node` + `Express` app\
There's no need to set up and configure a separate `server`\
Route Handlers are great when making external `API` requests as well\
For example, if you're building an app that needs to talk to third-party services\
Route handlers run `server-side`, our sensitive info like private keys stays `secure` and never reaches the browser.\
Route Handlers are the equivalent of API routes in Page route\
Next.js supports `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`\
If an `unsupported` method is called, Next.js will return a `405` Method Not Allowed response.\
By default `route.ts` (route handler) response the request.

### Handling GET Request `comments/route.ts`

```ts
export async function GET() {
	// return new Response("Hello world!");
	return Response.json(comments);
}
```

GET `/comments`

### Handling POST Request `comments/route.ts`

```ts
export async function POST(request: Request) {
	const comment = await request.json();
	// save to db
	return new Response(JSON.stringify(newComment), {
		headers: { "Content-Type": "application/json" },
		status: 201,
	});
}
```

POST `/comments`

### Handling Dynamic Route `comments/[id]/route.ts`

```ts
import { comments } from "../data";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { id } = await params;
	// find comment by id
	return Response.json(comment);
}
```

GET `/comments/1`, `/comments/2`

### Handling PATCH Route `comments/[id]/route.ts`

```ts
export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const body = await request.json();
	// update comment by id
	return Response.json(comment);
}
```

PATCH `/comments/1`, `/comments/2`

### Handling DELETE Route `comments/[id]/route.ts`

```ts
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	// delete comment by id
	return Response.json(comment);
}
```

DELETE `/comments/1`, `/comments/2`

### Handling URL Query Parameters `/comments?query=xyz`

```ts
import { NextRequest } from "next/server";
import { comments } from "./data";
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get("query") || "";
	const filteredComments = query
		? comments.filter((comment) => comment.text.includes(query))
		: comments;
	return Response.json(filteredComments);
}
```

Param `/comment?query=first

### Headers in Route Handlers

HTTP headers represent the metada associated with an API request and response.

**Request Headers**

-   These are send by the client, such as a web browser, to the server. They contain essential information about the request, which helps the server understand and process it correctly.
-   `User-Agent` which identifies the browser and operating system to the server.
-   `Accept` which indicates the content types like text, video, or image formats that the client can process.
-   `Authorization` header used by the client to authenticate itself to the server.

**Response Headers**

-   These are sent back from the server to the client. They provide information about the server and the data being sent in the response.
-   `Content-Type` header which indicates the media type of the response. It tells the client what the data type of the returned content is, such as text/html for HTML documents, application/json for JSON data, etc.

```ts
import { headers } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	// const requestHeaders = new Headers(request.headers);
	// console.log(requestHeaders.get("Authorization"));.

	const headerList = await headers();
	console.log(headerList.get("Authorization"));

	// return new Response("Profile API route!");
	return new Response("<h1>Profile API route!</h1>", {
		headers: { "Content-Type": "text/html" },
	});
}
```

### Cookies in Route Handlers

-   Cookies are small pieces of data that a server sends to a user's web browser.
-   The browser can store the cookies and send them back to the same server with future request.
-   Cookies serve three main purposes:
    -   managing sessions (like user logins and shopping carts)
    -   handling personalization (such as user preferences and themes)
    -   tracking (like recording and analyzing user behavior)

```ts
import { cookies, headers } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const theme = request.cookies.get("theme");
	console.log(theme); // { name: 'theme', value: 'dark' }

	const cookieStore = await cookies();
	cookieStore.set("resultsPerPage", "20");
	console.log(cookieStore.get("resultsPerPage"));

	return new Response("<h1>Profile API route!</h1>", {
		headers: { "Set-Cookie": "theme=dark" },
	});
}
```

### Redirects in Route Handlers

```ts
// api/v1/users
export async function GET() {
	// get v1 users data
	return Response.json(users);
}

// api/v2/users
export async function GET() {
	// get v2 users data
	return Response.json(users);
}

// api/v1/users (redirect)
import { redirect } from "next/navigation";
export async function GET() {
	redirect("/api/v2/users");
}
```

### Caching in Route Handlers

Route handlers are not cached by default but you can opt into caching when using the GET method.

-   Route handlers are **not cached** by default but you can opt into caching when using the **GET** method.
-   Caching only works with **GET** methods.
-   Other HTTP methods like POST, PUT, or DELETE are **never cached**.
-   If you're using dynamic functions like **headers()** and **cookies()**, or working with the request object in your GET method, **caching won't be applied**.

```ts
export const dynamic = "force-static"; // Force static rendering for this route
export const revalidate = 10; // Disable revalidation for this route

export async function GET() {
	return Response.json({ time: new Date().toLocaleTimeString() });
}
```

### Middleware

-   Middleware in Next.js is a powerful feature that lets you intercept and control the flow of request and responses throughout your application.
-   It does this at a global level, significantly enhancing features like redirects, URL rewrites, authentication, headers, cookies, and more.
-   Middleware lets you specify paths where it should be active
    -   Custome matcher config
    -   Conditional statements

```ts
// Custome matcher configuration to run middleware only on the /profile route
export function middleware(request: NextRequest) {
	return NextResponse.redirect(new URL("/", request.url));
}
export const config = {
	matcher: "/profile",
};
```

```ts
// Conditional statements to check the request method and URL
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === "/profile") {
		// Redirect - route changing /profile to /hello
		// return NextResponse.redirect(new URL("/hello", request.url));

		// Rewrite - route not changing /profile to /profile
		return NextResponse.rewrite(new URL("/hello", request.url));
	}
}
```

```ts
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
```

## Rendering in NEXT.JS

-   Rendering is the process of transforming the component code you write into user interfaces that users can see and interact with.
-   In Next.js, the tricky part to building a performant application is figuring out when and where this transformation should happen.
-   `CSR`, `SSR` and `RSCs`?
-   Rendering in React -> Rendering in Next.js
-   Sometimes it takes a couple of passes for these concepts to really sink in.

### Rendering in React

-   We need to look at how React's rendering has evolved over the past decasde.
-   You probably remember when React was primarily used for building Single Page Application (SPAs).

### Client-Side Rendering (CSR)

-   This whole approach - where your browser (the client) transforms React components into what you see on screen - that's what we call client-side rendering (CSR).
-   CSR became super popular for SPAs (Single page application), and everyone was using it.
-   It was't long befor developers began noticing some inherent drawbacks to his approach.

**Drawbacks of CSR**

`SEO`

-   When search engines crawl your site, they're mainly looking at HTML content. But with CSR, your initial HTML is basically just an empty div - great for search engines trying to figure out what your page is about.
-   When you have a lot of components making API calls, the meaningful content might load too slowly for search engines to even catch it.

`Performance`

-   Your browser (the client) has to do everything: fetch data, build the UI, make everything interractive... that's a lot of work!
-   Users often end up staring at a blank screen or a loading spinner while all this happens.
-   Every time you add a new feature to your app, that JavaScript bundle gets bigger, making users wait even longer.
-   This is especially frustrating for people with slower internet connections

### Server-Side Solutions (SSR)

-   Search engines can now easily index the server-rendered content, solving out SEO problem
-   Users see actual HTML content right away instead of staring at a blank screen or loading spinner.

`Hydration`

-   During hydration, React takes control in the browser and reconstructs the component tree in memory, using the server-rendered HTML as a bluprint.
-   It carefully maps out where all the interactive elements should go, then hooks up the JavaScript logic.
-   This involves initializing application state, adding click and mouseover handlers, and setting up all the dynamic features needed for a full interactive user experience.

1. Static Site Generation (SSG)
2. Server Side Rendering (SSR)

-   SSG happens during build time when you deploy your application to the server.
-   This results in pages that are already rendered and ready to serve. It's perfect for content that stays relatively stable, like blog posts.
-   SSR, on the other hand, renders pages on-demand when users request them. It's ideal for personalized content like social media feeds where the HTML changes based on who's logged in.
-   Server-Side Rendering (SSR) was a significant improvement over Client-Side Rendering (CSR), providing faster initial page loads and better SEO.

**Drawbacks of SSR**

1. You have to fetch everything before you can show anything.

-   Components cannot start rendering and then pause or "wait" while data is still being loaded.
-   If a component needs to fetch data from a database or another source (like an API), this fetching must be completed before the server can begin rendering the page.
-   This can delay the server's response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.

2. You have to load everything before you can hydrate anything.

-   For successfull hydration, where React adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree.
-   This means that all the JavaScript for the components must be loaded on the client before you can start hydration any of them.

3. You have to hydrate everything before you can interact with anything.

-   React hydrates the component tree in a single pass, meaning once it starts hydrating, it won't stop until it's finished with the entire tree.
-   As a consequence, all components must be hydrated before you can interact with any of them.

**Drawbacks of SSR - all or nothing waterfall**

1. having to load the data for the entire page
2. loading the JavaScript for the entire page, and
3. hydrating the page

-   at once, create an "all or nothing" waterfall problem that spans from the server to the client, where each issue must be resolved before moving to the next one.
-   This becomes really inefficient when some parts of your app are slower than others, as is often the case in real-world apps.

**Suspense SSR architecture**

-   Use the `<Suspense>` component to unlock two major SSR features:
    1.  HTML streaming on the server.
    2.  SElective hydration on the client.

`HTML streaming on the server`

HTML steaming solves our first problem:

-   You don't have to fetch everything before you can show anything.
-   If a particular section is slow and could potentially delay the initial HTML, no problem!
-   It can be seamlessly integrated into the stream later when it's ready.

The other hurdle

-   Even with faster HTML delivery, we can't start hydrating until we've loaded all the JavaScript for the main section.
-   If that's a big chunk of code. we're still keeping users waiting from beingle able to interact with the page.

Code splitting

-   It lets you tell you bundler, "These parts of the code aren't urgent - split them into separate scripts."
-   Using `React.lazy` for code splitting separates your main section's code from the core JavaScript bundle.
-   The brower can download React and most of your app's code independently, without getting stuck waiting for that main section's code.

Selective hydration on the client

-   By wrapping your main section in a `<Suspense>` component, you're not just enabling streaming but also telling React it's okay to hydrate other parts of the page before everything's ready.
-   This is what we call selective hydration.
-   It allows for the hydration of parts of the page as they become available, even before the rest of the HTML and the JavaScript code are fully downloaded.
-   Thanks to selective hydration, a heavy chunk of JavaScript won't hold up the rest of your page from becoming interactive.
-   Selective hydration also solves our third problem: the necessity to "hydrate everything to interact with anything".
-   React start hydrating as soon as it can, which means users can interact with things like the header and side navigation without waiting for the main content.
-   This process is managed automatically by React.
-   In scenarios where multiple components are awaiting hydration, React prioritizes hydration based on user interactions.

**The evolution of React**
CSR -> SSR -> Suspense for SSR

Suspense for SSR brought us closer to a seamless rendering experience.

`Challenges`

-   Large bundle sizes causing excessive downloads for users.
-   Unnecessary hydration delaying interactivity.
-   Heavy client-side processing leading to poorer performance.

### React-Server Component (RSC)

-   React Server Components (RSC) represent a new architecture designed by the React team.
-   This approach leverages the strengths of both server and client environments to optimize efficiency, load times, and interactivity.
-   The architecture introduces a dual-component model
    -   Client Components
    -   Server Components
-   This distinction is based not on the components functionality but rather on their execution environment and the specific systems they are designed to interact with.

**Client Components**

-   Client Components are the familiar React components we've been using
-   They are typically rendered on the client-side (CSR) but, they can also be rendered to HTML on the server (SSR), allowing users to immediately see the page's HTML content rather than a blank screen
-   "client components" can render on the server
-   Optimization strategy
-   Client components primarily operate on the client but can (and should ) also run once on the server for better performance

`Client Components contd.`

-   Client Components have full access to the client environment, such as the browser, allowing them to use state, effects, and event listeners for handling interactivity
-   They can also access browser-exclusive APIs like geolocation or localStorage, allowing you to build UI for specific use cases
-   In fact, the term "Client Component" doesn't signify anything new; it simply helps differentiate these components from the newly introduced Server Components

**Server Components**

-   Server Components represent a new type of React component specifically designed to operate exclusively on the server
-   And unlike client components, their code stays on the server and is never downloaded to the client
-   This design choice offers multiple benefits to React applications

`Benefits of Server Components`

-   Smaller bundle sizes

    -   Since Server Components stay on the server, all their dependencies stay there too
    -   This is fantastic for users with slower connections or less powerful devices since they don't need to download, parse, and execute that JavaScript
    -   Plus, there's no hydration step, making your app load and become interactive faster

-   Direct access to server-side resources

    -   Server Components can talk directly to databases and file systems, making data fetching super efficient without any client-side processing
    -   They use the server's power and proximity to data sources to manage compute-intensive rendering tasks

-   Enhanced security

    -   Since Server Components run only on the server, sensitive data and logic - like API keys and tokens - never leave the server

-   Improved data fetching

    -   Server Components allow you to move data fetching to the server, closer to your data source
    -   This can improve performance by reducing time it takes to fetch data needed for rendering, and the number of requests the client needs to make

-   Caching

    -   When you render on the server, you can cache the results and reuse them for different users and requests
    -   This means better performance and lower costs since you're not re-rendering and re-fetching data all the time

-   Faster initial page load and First Contentful Paint

    -   By generating HTML on the server, users see your content immediately - no waiting for JavaScript to download and execute

-   Improved SEO

    -   Search engine bots can easily read the server-rendered HTML, making your pages more indexable

-   Efficient streaming

    -   Server Components can split the rendering process into chunks that stream to the client as they're ready
    -   This means users start seeing content faster instead of waiting for the entire page to render on the server

`React server component (RSC) contd.`

-   Server Components handle data fetching and static rendering, while Client Components take care of rendering the interactive elements
-   The beauty of this setup is that you get the best of both server and client rendering while using a single language, framework, and set of APIs

`RSC key takeaways`

-   React Server Components offer a new approach to building React apps by separating components into two: Server Components and Client Components
-   Server Components run exclusively on the server - they fetch data and prepare content without sending code to the browser
-   This makes your app faster because users download less code
-   However, they can't handle any interactions
-   Client Components, on the other hand, run in the browser and manage all the interactive parts like clicks and typing
-   They can also get an initial server render for faster page loads

> **RSC + Next.js**

-   Every component in a Next.js app `default` to being a `server component`.
-   Running components on the server brings several advantages: `zero-bundle size`, `direct access` to server-side `resources`, improved `security`, and `better SEO`.

**Summary**

-   In the RSC architecture and by extension in the Next.js app router, components are server components by default.
-   To create client components, add the `"use client"` directive at the top of the file.
-   Server components are rendered `exclusively` on the server.
-   Client components are rendered `once on the server` and then `on the client`.

```tsx
// Default Server components
export default async function AboutPage() {
	console.log("About server component");
	// Time not change in production mode
	return <h1>About page {new Date().toLocaleTimeString()}</h1>;
}
```

```tsx
// Client components
("use client");
import { useState } from "react";
export default function DashboardPage() {
	console.log("Dashboard client component");
	const [name, setName] = useState("");
	return (
		<div>
			<h1>Dashboard</h1>
			<input
				className="border"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<p>Hello, {name}!</p>
		</div>
	);
}
```

`RSC rendering lifecycle`

-   We're going to learn about the rendering lifecycle of server and client components.
-   In simpler terms, we'll explore how they come to life on your screen
-   When we talk about React Server Components (RSC), we're dealing with three key players:
    -   your browser (the client)
    -   Next.js (our framework)

Server rendering strategies

1. Static rendering
2. Dynamic rendering
3. Streaming

### Static rendering

-   Static rendering is a `server rendering` strategy where we generate `HTML pages` when building our application
-   Think of it as preparing all your content in advance - before any user visits your site
-   Once built, these pages can be cached by CDNs and served instantly to users
-   With this approach, the same `pre-rendered` page can be shared among different users, giving your app a significant performance boost
-   Static rendering perfect for things like `blog posts`, `e-commerce product listings`, `documentation`, and `marketing pages`.

```tsx
export default async function AboutPage() {
	console.log("About server component");
	// Time not change in production mode
	return <h1>About page {new Date().toLocaleTimeString()}</h1>;
}
```

**How to statically render?**

-   Static rendering is the `default strategy` in the app router
-   All routes are automatically prepared at build time without any additional setup
-   "Hold on - you keep talking about `generating HTML` at build time, but we haven't built our application yet, right? We're just running it in development mode?"

**Prefetching**

-   Prefetching is a technique that `preloads routes` in the background as their links become visible
-   For static routes like ours, Next.js `automatically prefetches` and caches the whole route
-   When our home page loads, Next.js is already prefetching `about` and `dashboard` routes for instant navigation

```tsx
import Link from "next/link";

export default function Home() {
	// About and Dashboard Link
	return (
		<div className="flex flex-col gap-4">
			<Link href={"/about"}>About</Link>
			<Link href={"/dashboard"}>Dashboard</Link>
		</div>
	);
}
```

### Dynamic rendering

-   Dynamic rendering is a `server rendering` strategy where routes are rendered uniquely for each user when they make a request
-   It is useful when you need to show personalized data or information that's only available at request time (and not ahead of time during prerendering) - things like `cookies` or URL `search parameters`
-   `News websites`, personalized `shopping pages`, and `social media feeds` are some examples where dynamic rendering is beneficial

**Dynamic rendering summary**

-   Dynamic rendering is a strategy where the HTML is generated at `request time`
-   Next.js `automatically enables` it when it encounters `dynamic functions` like `cookies`, `headers`, `connection`, `draftMode`, `after` or `searchParams prop`
-   Dynamic rendering is great for personalized content like social media feeds
-   You `don't have to stress` about choosing between `static` and `dynamic` rendering
-   Next.js `automatically` selects the optimal rendering strategy for each route based on the `features` and `APIs` you're using

```tsx
import { cookies } from "next/headers";
export default async function AboutPage() {
	const cookieStore = await cookies();
	const theme = cookieStore.get("theme");
	console.log(theme);
	console.log("About server component");
	// Time change in production mode because dynamic rendering
	return <h1>About page {new Date().toLocaleTimeString()}</h1>;
}
```

**generateStaticParams()**

-   `generateStaticParams` is a `function` that
    -   works alongside dynamic route segments
    -   to generate `static routes` during `build time`
    -   instead of on demand at request time
    -   giving us a nice performance boost

```tsx
// ProductsPage (Static rendering)
import Link from "next/link";
export default function ProductsPage() {
	return (
		<div className="flex flex-col gap-1">
			<h1>Products</h1>
			<Link href="/products/1">Product 1</Link>
			<Link href="/products/2">Product 2</Link>
			<Link href="/products/3">Product 3</Link>
		</div>
	);
}
```

```tsx
// ProductsPage (Dynamic rendering)
export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<h1>
			Product {id} details rendered at {new Date().toLocaleString()}
		</h1>
	);
}
```

```tsx
// ProductsPage (Static rendering) using generateStaticParams fn
export async function generateStaticParams() {
	return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<h1>
			Product {id} details rendered at {new Date().toLocaleString()}
		</h1>
	);
}
```

**Multiple dynamic route segments**

Suppose we have a product catalog with categories and products

`/products/[category]/[product]/page.tsx`

```ts
export async function generateStaticParams() {
	return [
		{ category: "electronics", product: "smartphone" },
		{ category: "electronics", product: "laptop" },
		{ category: "books", product: "science-fiction" },
		{ category: "books", product: "biography" },
	];
}
```

**dynamicParams()**

-   Control what happens when a `dynamic segment` is visited that was not generated with `generateStaticParams`()

-   `true` - Next.js will `statically` render pages on demand for `any dynamic` segments not included in generateStaticParams()

-   `false` - Next.js will return a `404 error` for `any dynamic` segments not included in our pre-rendered list

`dynamicParams contd.`

`true:`

-   If you're building an e-commerce site, you'll probably want to keep dynamicParams set to true

-   This way, you can pre-render your most popular product pages for better performance, but still allow access to all your other products - they'll just be rendered on demand

`false:`

-   if you're working with something like a blog where you have a smaller, more fixed number of pages, you can pre-render all of them and set dynamicParams to false

-   If someone tries to access a blog post that doesn't exist, they'll get a clean 404 error instead of waiting for a page that will never exist

### Steaming

-   Streaming is a strategy that allows for `progressive UI` rendering from the server
-   Work is broken down into smaller chunks and streamed to the `client` as soon as they're ready
-   This means users can see parts of the page right away, without waiting for everything to load
-   It's particularly powerful for improving initial page load times and handling UI elements that depend on slower data fetches, which would normally hold up the entire route
-   Streaming comes built right into the App Router

```tsx
import { Suspense } from "react";
import { Product } from "@/components/product";
import { Reviews } from "@/components/reviews";
export default function ProductDetailPage() {
	return (
		<div>
			<h1>Product detail page</h1>
			<Suspense fallback={<p>Loading product details...</p>}>
				<Product />
			</Suspense>
			<Suspense fallback={<p>Loading reviews details...</p>}>
				<Reviews />
			</Suspense>
		</div>
	);
}
```
