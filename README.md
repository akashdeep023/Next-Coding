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

**useRouter**

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

### Templates

-   **Templates** are **similar** to layout in that they wrap each child layout or page
-   But, with templates, when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, **state is not preserved**, and effects are re-synchronized

-   A template can be defined by exporting a default React component from a template.js or template.tsx file
-   Similar to layout, templates also should accept a children prop which will render the nested segments in the route.

### Loading UI

-   This file allows us to create a loading state that are displayed to users while a specific route segment's content is loaded

-   The loading state appears immediately upon navigation, giving users the assurance that the application is responsive and actively loading content.

### Error Handling

-   Automatically wrap a route segment and its nested children in a React Error Boundary
-   Create error UI tailored to specific segments using the file-system hierarchy to adjust granularity
-   Isolate errors to affected segments while keeping the rest of the application functional
-   Add functionality to attempt to recover from an error without a full page reload.

```tsx
// Components Hierarchy
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
"use client";
export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error;
	reset: () => void; // Recovering Errors function
}) {
	return (
		<div>
			<h3>Error in Review</h3>
			<h3>{error.message}</h3>
			<button onClick={reset}>Try Again</button>
		</div>
	);
}
```

**Handling Errors in Nested Routes**

-   Errors bubble up to the closest parent error boundary.
-   An `error.tsx` file will cater to errors for all its nested child segments
-   By positioning `error.tsx` files at different levels in the nested folders of a route, you can achieve a more granular level of error handling.

**Handling Error in Layouts**

-   An `error.tsx` file will handle errors for all its nested child sections
-   The error boundary does not catch errors thrown here because it's nested in the inside the layout component

### Special Files

1. **layout.tsx**: Defines the overall structure and layout of the application.
2. **template.tsx**: Provides a template for common elements across multiple pages.
3. **error.tsx**: Handles and displays error messages and pages.
4. **loading.tsx**: Displays a loading indicator or animation while content is being fetched.
5. **not-found.tsx**: Renders a 404 page when a route is not found.
6. **page.tsx**: Represents an individual page within the application.

### Parallel Routes

-   Parallel routes are an advanced routing mechanism that allows for the simulataneous rendering of multiple pages within the same layout.
-   Parallel routes in Next.js are defined using a feature known as slots.
-   Slots help structure our content in a modular fashion.
-   To define a slot, we use the `@folder` naming convention.
-   Each slot is then passed as a prop to its corresponding `layout.tsx` file.

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

### Unmatched Routes

**Navigation from the UI**

-   In the case of navigation within the UI, Next.js retains the previously active state of a slot regardless of changes in the URL.

**Page reload**

-   Nextjs immediately searches for a `default.tsx` file within each unmatched slot
-   The persence of this file is critical, as it provides a the default content that Next.js will renter in the user interface
-   If this `default.tsx` file is missing in any of the unmatched slots for the current route Next.js will render a 404 error.

**default.tsx**

-   The `default.tsx` file in Next.js serves as a fallback to render content when the framwork cannot retrieve a slot's active state from the current URL.
-   You have complete freedom to define the UI fro unmatched routes: you can either mirror the content found in page.tsx or craft an entirely custom view.
