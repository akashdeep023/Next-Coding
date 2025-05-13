"use client";
import { EditProduct, FormState } from "@/action/product";
import { useActionState } from "react";
import { Product } from "@/app/product-db/page";

export default function EditProductForm({ product }: { product: Product }) {
	const initialState: FormState = {
		errors: {},
	};

	const editProductWithId = EditProduct.bind(null, product.id);
	const [state, formAction, isPending] = useActionState(
		editProductWithId,
		initialState
	);
	return (
		<form action={formAction} className="p-4 space-y-4 max-w-96">
			<div>
				<label className="text-white">
					Title
					<input
						type="text"
						className="block w-full p-2 text-black bg-white mb-2 border rounded"
						name="title"
						defaultValue={product.title}
					/>
				</label>
				{state.errors.title && (
					<p className="text-red-500">{state.errors.title}</p>
				)}
			</div>
			<div>
				<label className="text-white">
					Price
					<input
						type="number"
						className="block w-full p-2 text-black bg-white mb-2 border rounded"
						name="price"
						defaultValue={product.price}
					/>
				</label>{" "}
				{state.errors.price && (
					<p className="text-red-500">{state.errors.title}</p>
				)}
			</div>
			<div>
				<label className="text-white">
					Description
					<textarea
						className="block w-full p-2 text-black bg-white mb-2 border rounded"
						name="description"
						rows={4}
						defaultValue={product.description ?? ""}
					/>
				</label>{" "}
				{state.errors.description && (
					<p className="text-red-500">{state.errors.title}</p>
				)}
			</div>
			<button
				type="submit"
				className="block w-full p-2 text-white bg-blue-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
				disabled={isPending}
			>
				Submit
			</button>
		</form>
	);
}
