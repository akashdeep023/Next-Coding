"use client";
import { RemoveProduct } from "@/action/product";
import { getProducts } from "@/prisma-db";
import Form from "next/form";
import Link from "next/link";
import { useOptimistic } from "react";

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string | null;
};

export const ProductsDetail = ({ products }: { products: Product[] }) => {
	const [optimisticProducts, setOptimisticProducts] = useOptimistic(
		products,
		(currentProducts, productId) => {
			return currentProducts.filter(
				(product) => product.id !== productId
			);
		}
	);

	const removeProductById = async (productId: number) => {
		setOptimisticProducts(productId);
		await RemoveProduct(productId);
	};

	return (
		<ul className="space-y-4 p-4">
			{optimisticProducts.map((product) => (
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
					<Form action={removeProductById.bind(null, product.id)}>
						<button
							type="submit"
							className="cursor-pointer mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
						>
							Delete
						</button>
					</Form>
				</li>
			))}
		</ul>
	);
};
