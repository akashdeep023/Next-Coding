import { serverSideFunction } from "@/utils/server-utils"; // server components
import ImageSlider from "@/components/ImageSlider"; // client components
// import { clientSideFunction } from "@/utils/client-utils"; // work only in client components

// ServerRoute page is a server components
export default function ServerRoute() {
	const result = serverSideFunction();
	// const clientResult = clientSideFunction(); // throws error: client components cannot be used in server components
	return (
		<>
			<h1>Server Route {result}</h1>
			{/* <p>{clientResult}</p> */}
			<ImageSlider />
		</>
	);
}
