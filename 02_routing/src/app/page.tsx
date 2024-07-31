import Link from "next/link";

// Home page (route -> '/')
export default function Home() {
    return (
        <>
            <h1>Home page</h1>
            <Link href="/blog">Blog</Link>
            <br />
            <Link href="/products">Products</Link>
            <br />
            <br />
        </>
    );
}

// Create any page.tsx then layout.tsx file will be created automatically.
