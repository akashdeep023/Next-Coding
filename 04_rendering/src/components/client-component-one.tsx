"use client";

import { useState } from "react";
import { ClientComponentTwo } from "./client-component-two";
import { ServerComponentOne } from "./server-component-one";

// 2. Client component inside client component - WORKING
// export const ClientComponentOne = () => {
// 	const [name, setName] = useState("Batman");
// 	return (
// 		<>
// 			<h1>Client component one</h1>
// 			<ClientComponentTwo />
// 		</>
// 	);
// };

// 4. Client component inside server component - NOT WORKING
// export const ClientComponentOne = () => {
// 	const [name, setName] = useState("Batman");
// 	return (
// 		<>
// 			<h1>Client component one</h1>
// 			<ServerComponentOne />
// 		</>
// 	);
// };

// 4. SOL- pass props,children: Client component inside server component - NOT WORKING
export const ClientComponentOne = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [name, setName] = useState("Batman");
	return (
		<>
			<h1>Client component one</h1>
			{children}
		</>
	);
};
