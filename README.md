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

-   You don;t need to install additional packages as Next.js provides everything you need.

-   Opinions and conventions should be followed to implement these features.

-   Next.js simplifies the process of building a web application for production.

1. Routing
2. Api routes
3. Redirect
4. Data fetching
5. Styling
6. Optimization
7. Dev and prod build system and more

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

## Routing

Next.js has a file-system based routing mechanism \
URL paths that users can access in the browser are defined by files and folders in youu codebase

### Routing Conventions

All routes must be placed inside the **app** folder \
Every file that corresponds to a route must be named **page.js** or **page.tsx** \
Every folder corresponds to a path segment in the browser URL.

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

### Nested Routes

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

### Dynamic Routes

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
export default function ProductDetails({
    params,
}: {
    params: { productId: string };
}) {
    return <h1>Products {params.productId} page</h1>;
}
```

### Nested Dynamic Routes

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
export default function Product({
    params,
}: {
    params: {
        productIs: string;
        reviewId: string;
    };
}) {
    return (
        <>
            Reviews {params.reviewId} && Products {params.productId}
        </>
    );
}
```

### Catch all Segments

```
app
├── docs
│ └── [[...slug]] ya [...slug]
│   └── page.tsx    (/products/productId -> route)
├── layout.tsx
└── page.tsx        (/ -> route)
```

`/` `/docs` `/docs/routing` `/docs/routing/catch-all-segments`

```tsx
export default function Docs({ params }: { params: { slug: string[] } }) {
    if (params.slug?.length === 2) {
        return (
            <h1>
                Docs {params.slug[0]} & {params.slug[1]}{" "}
            </h1>
        );
    } else if (params.slug?.length === 1) {
        return <h1>Docs {params.slug[0]}</h1>;
    }
    return <h1>Docs home page</h1>;
}
```

### Not found page

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

-   routes file name must be page.tsx
-   export default (otherwise elements will not be displayed and a 404 error will occur)
-   Create React Component at src/component path

### Private Folders

-   A private folder indicates that it is a private implementation detail and should not be considered by the routing system.
-   The folder and all its subfolders are excluded from routing.
-   Prefix the folder name with an underscore ( \_ )

### Route Groups

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

### Layouts

-   You can define a layout by default exporting a React component from a **layout.js** or **layout.tsx** file.
-   That component should accept a children prop that will be populated with a child page during rendering.

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

### Route Group Layout

-   To organize your project in a manner that doesn't affect the URL.
-   To selectively apply a layout to certain segments while leaving others untouched.

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

**Configuring Metadata**

-   Export a static metadata object
-   Export a dynamic generateMetadata function

**Metadata rules**

-   Both layout.tsx and page.tsx files can export metadata. If defined in a layout, it applies to all pages in the layout, but if defined in a page, it applies only to that pages
-   Metadata is read in order, from the root level down to the final page level
-   When there's metadata in multiple pages for the same route, they get combined but page metadata will replace layout metadata if they have the same properties

**title Metadata**

-   The title field's primary purpose is to define the document title.
-   It can be either a string or an object.

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

-   `Link` tag used to navigate different pages
-   Syntax `<Link href="/">Home</Link>`
-   `replace` attribute Replace the current history state instead of adding a new url into the stack.
