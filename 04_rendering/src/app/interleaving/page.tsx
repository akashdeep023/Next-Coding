// 1. Server component inside server component - WORKING
// import { ServerComponentOne } from "@/components/server-component-one";
// export default function InterLeavingPage() {
// 	return (
// 		<>
// 			<h1>Interleaving page</h1>
// 			<ServerComponentOne />
// 		</>
// 	);
// }

// 2. Client component inside client component - WORKING
// import { ClientComponentOne } from "@/components/client-component-one";
// export default function InterLeavingPage() {
// 	return (
// 		<>
// 			<h1>Interleaving page</h1>
// 			<ClientComponentOne />
// 		</>
// 	);
// }

// 3. Server component inside client component - WORKING
// import { ServerComponentOne } from "@/components/server-component-one";
// export default function InterLeavingPage() {
// 	return (
// 		<>
// 			<h1>Interleaving page</h1>
// 			<ServerComponentOne />
// 		</>
// 	);
// }

// 4. Client component inside server component - NOT WORKING
// import { ClientComponentOne } from "@/components/client-component-one";
// export default function InterLeavingPage() {
// 	return (
// 		<>
// 			<h1>Interleaving page</h1>
// 			<ClientComponentOne />
// 		</>
// 	);
// }

// 4. SOL- pass props,children: Client component inside server component - WORKING
import { ClientComponentOne } from "@/components/client-component-one";
import { ServerComponentOne } from "@/components/server-component-one";
export default function InterLeavingPage() {
	// passing server component as children
	return (
		<>
			<h1>Interleaving page</h1>
			<ClientComponentOne>
				<ServerComponentOne />
			</ClientComponentOne>
		</>
	);
}
