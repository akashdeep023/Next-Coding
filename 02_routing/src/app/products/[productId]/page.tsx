// Dynamic Routes ----------------------------------------------------------------
// Products details page (route -> '/products/1' ... '/products/100')
export default function ProductDetails({
    params,
}: {
    params: { productId: string };
}) {
    return <h1>Products {params.productId} page</h1>;
}
