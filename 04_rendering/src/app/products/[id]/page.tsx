// generateStaticParams is used to specify the dynamic routes that should be pre-rendered at build time
export async function generateStaticParams() {
	return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

// This is a dynamic route that will be rendered at build time for the specified params
export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	return (
		<h1>
			Product {id} details rendered at {new Date().toLocaleString()}
		</h1>
	);
}
