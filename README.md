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
export default function Product({ params }: { params: { productId: string } }) {
    return <>Products {productId}</>;
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
            Products {productId} & {reviewId}
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
export default function Product({ params }: { params: { slug: string[] } }) {
    if (slug?.length === 2) {
        return <>Docs {slug[0]} & slug[1] </>;
    } else {
        return <>Docs {slug[0]}</>;
    }
    return (
        <>
            Products {productId} & {reviewId}
        </>
    );
}
```

### Not found page

```
app
├── products
│ ├── [productId]
│ │ └── page.tsx        (/products/productId -> route)
│ │ └── not-found.tsx   (/products/(page not found) -> route) (productId < 1000)
│ └── page.tsx          (/products -> route)
├── layout.tsx
├── not-found.tsx       (page not found | 404)
└── page.tsx            (/ -> route)
```

`/` `/jack` `/products/1001`

### File Colocation
