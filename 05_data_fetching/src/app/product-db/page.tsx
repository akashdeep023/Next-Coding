import { getProducts } from "@/prisma-db";
import { ProductsDetail } from "./product-detail";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string | null;
};

export default async function ProductsPrismaDBPage({
	searchParams,
}: {
	searchParams: Promise<{ query: string }>;
}) {
	const { query } = await searchParams;
	const products: Product[] = await getProducts(query);
	return <ProductsDetail products={products} />;
}
