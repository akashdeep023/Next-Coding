import { serverSideFunction } from "@/utils/server-utils"; // server components
import ImageSlider from "@/components/ImageSlider"; // client components

// ServerRoute page is a server components
export default function ServerRoute() {
	const result = serverSideFunction();
	return (
		<>
			<h1>Server Route {result}</h1>
			<ImageSlider />
		</>
	);
}
