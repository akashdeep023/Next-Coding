// This component will be rendered on the client-side only (not server-side)
"use client";
export default function ErrorBoundary({ error }: { error: Error }) {
    return (
        <div>
            <h3>Error in Review</h3>
            <h3>{error.message}</h3>
        </div>
    );
}
