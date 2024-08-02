// Nested Dynamic Routes ----------------------------------------------------------------

import { notFound } from "next/navigation"; // review page not found

// Create function to generate rendom number
function generateInt(count: number) {
    return Math.floor(Math.random() * count);
}

// Reviews details page (route -> '/products/1/reviews/1' ... '/products/100/reviews/5')
export default function ReviewsDetails({
    params,
}: {
    params: {
        productId: string;
        reviewId: string;
    };
}) {
    const rendom = generateInt(2);
    if (rendom == 1) {
        throw new Error("Error: Review not found"); // throw error when review not found
    }
    if (parseInt(params.reviewId) > 1000) {
        notFound();
    }
    return (
        <h1>
            Reviews {params.reviewId} for Products {params.productId}
        </h1>
    );
}
