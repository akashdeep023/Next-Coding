import { RemoveProduct } from "@/action/product";
import { getProducts } from "@/prisma-db";
import Link from "next/link";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string | null;
};

export default async function ProductsPrismaDBPage() {
	const products: Product[] = await getProducts();
	return (
		<ul className="space-y-4 p-4">
			{products.map((product) => (
				<li
					key={product.id}
					className="p-4 bg-white shadow-md rounded-lg text-gray-700"
				>
					<h2 className="text-xl font-semibold">
						<Link href={`/product-db/${product.id}`}>
							{product.title}
						</Link>
					</h2>
					<p>{product.description}</p>
					<p className="text-lg font-medium">${product.price}</p>
					<form action={RemoveProduct.bind(null, product.id)}>
						<button
							type="submit"
							className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
						>
							Delete
						</button>
					</form>
				</li>
			))}
		</ul>
	);
}
