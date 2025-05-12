import { Submit } from "@/components/submit";
import { addProduct } from "@/prisma-db";
import { redirect } from "next/navigation";

export default function AddProductPage() {
	async function CreateProduct(formData: FormData) {
		"use server";
		const title = formData.get("title") as string;
		const price = formData.get("price") as string;
		const description = formData.get("description") as string;

		await addProduct(title, parseInt(price), description);
		redirect("/product-db");
	}
	return (
		<form action={CreateProduct} className="p-4 space-y-4 max-w-96">
			<label className="text-white">
				Title
				<input
					type="text"
					className="block w-full p-2 text-black bg-white mb-2 border rounded"
					name="title"
				/>
			</label>
			<label className="text-white">
				Price
				<input
					type="number"
					className="block w-full p-2 text-black bg-white mb-2 border rounded"
					name="price"
				/>
			</label>
			<label className="text-white">
				Description
				<textarea
					className="block w-full p-2 text-black bg-white mb-2 border rounded"
					name="description"
				/>
			</label>
			{/* <button
				type="submit"
				className="block w-full p-2 text-white bg-blue-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
			>
				Add Product
			</button> */}
			<Submit />
		</form>
	);
}
