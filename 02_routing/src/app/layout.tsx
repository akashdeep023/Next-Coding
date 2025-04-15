// export const metadata = {
//     title: "Routing on Next.js", // title string
//     description: "Generated by Next.js",
// };

import { Metadata } from "next";
import { ErrorWrapper } from "./error-wrapper";

export const metadata: Metadata = {
	// title object
	title: {
		// absolute: "Next Routing",   // Exact title name
		default: "Routing on Next.js", // default for all pages
		template: "%s | Routing Chapter", // replace %s with child title
	},
	description: "Generated by Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<header
					style={{
						backgroundColor: "lightblue",
						fontSize: "18px",
						padding: "10px 5px",
					}}
				>
					<p>Header</p>
				</header>
				<ErrorWrapper>{children}</ErrorWrapper>
				<footer
					style={{
						backgroundColor: "darkgray",
						fontSize: "18px",
						padding: "10px 5px",
					}}
				>
					<p>Footer</p>
				</footer>
			</body>
		</html>
	);
}

// Replace children variable from routes page.jsx
