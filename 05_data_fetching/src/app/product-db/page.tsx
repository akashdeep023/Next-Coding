import { getProducts } from "@/prisma-db";
import { ProductsDetail } from "./product-detail";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string | null;
};

export default async function ProductsPrismaDBPage() {
	const products: Product[] = await getProducts();
	return <ProductsDetail products={products} />;
}
