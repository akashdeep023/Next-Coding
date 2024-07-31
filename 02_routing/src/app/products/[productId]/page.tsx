import { Metadata } from "next";
// Metadata Static
// export const metadata = {
//     title: "Product Details",
// };

type Props = {
    params: {
        productId: string;
    };
};
// Metadata Dynamic
export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    // find product details
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`iPhone ${params.productId}`);
        }, 100);
    });
    // return title
    return {
        title: `Product ${title}`,
    };
};

// Dynamic Routes ----------------------------------------------------------------
// Products details page (route -> '/products/1' ... '/products/100')
export default function ProductDetails(
    { params }: Props // {params: { productId: string }};
) {
    return <h1>Products {params.productId} page</h1>;
}
