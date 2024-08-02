// This component will be rendered on the client-side only (not server-side)
"use client";
export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h3>Error in Review</h3>
            <h3>{error.message}</h3>
            <button onClick={reset}>Try Again</button>
        </div>
    );
}
