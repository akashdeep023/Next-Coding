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
			<h3>Error in Review</h3>
			<h3>{error.message}</h3>
			<button onClick={reload}>Try Again</button>
		</div>
	);
}
