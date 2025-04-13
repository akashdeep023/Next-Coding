"use client";

// The file name must be not-found.tsx (This will work if the review root child doesn't match)
import { usePathname } from "next/navigation";

export default function NotFound() {
	const pathname = usePathname();
	const productId = pathname.split("/")[2];
	const reviewId = pathname.split("/")[4];
	return (
		<div>
			<h1>
				Review {reviewId} not found for product {productId}
			</h1>
		</div>
	);
}
