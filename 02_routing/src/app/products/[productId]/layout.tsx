"use client";
// Create function to generate rendom number
// function generateInt(count: number) {
// 	return Math.floor(Math.random() * count);
// }

export default function ProductDetailsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const rendom = generateInt(2);
	// if (rendom == 1) {
	// 	throw new Error("Error: Product not found");
	// }
	return (
		<>
			{children}
			<div
				style={{
					backgroundColor: "lightyellow",
					fontSize: "16px",
					padding: "5px 5px",
				}}
			>
				<p>Product Features</p>
			</div>
		</>
	);
}
