// Metadata Static
// export const metadata = {
//     title: "Product Details",
// };

import { Metadata } from "next";
type Props = {
	params: Promise<{ productId: string }>;
};
// Metadata Dynamic
export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const { productId } = await params;
	// find product details
	const title = await new Promise((resolve) => {
		setTimeout(() => {
			resolve(`iPhone ${productId}`);
		}, 100);
	});
	// return title
	return {
		title: `Product ${title}`,
	};
};

// Dynamic Routes ----------------------------------------------------------------
// Products details page (route -> '/products/1' ... '/products/100')
export default async function ProductDetails({ params }: Props) {
	// const productId = (await params).productId;
	const { productId } = await params;
	return <h1>Product {productId} page</h1>;
}
