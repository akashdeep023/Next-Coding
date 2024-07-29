// Nested Dynamic Routes ----------------------------------------------------------------

import { notFound } from "next/navigation"; // review page not found

// Reviews details page (route -> '/products/1/reviews/1' ... '/products/100/reviews/5')
export default function ReviewsDetails({
    params,
}: {
    params: {
        productId: string;
        reviewId: string;
    };
}) {
    if (parseInt(params.reviewId) > 1000) {
        notFound();
    }
    return (
        <h1>
            Reviews {params.reviewId} && Products {params.productId}
        </h1>
    );
}
