"use client";
import { CreateProduct, FormState } from "@/action/product";
import { useActionState } from "react";

export default function AddProductPage() {
	const initialState: FormState = {
		errors: {},
	};

	const [state, formAction, isPending] = useActionState(
		CreateProduct,
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
					/>
				</label>{" "}
				{state.errors.description && (
					<p className="text-red-500">{state.errors.title}</p>
				)}
			</div>
			{/* <button
				type="submit"
				className="block w-full p-2 text-white bg-blue-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
			>
				Add Product
			</button> */}
			{/* <Submit /> */}
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
