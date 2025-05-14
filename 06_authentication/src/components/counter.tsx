"use client";

import { useState } from "react";
import {
	useAuth,
	// useUser
} from "@clerk/nextjs";

export const Counter = () => {
	const [count, setCount] = useState(0);
	// useAuth is a hook that provides authentication state and methods
	const { isLoaded, userId, sessionId, getToken } = useAuth();

	// useUser is a hook that provides user state and methods
	// const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded || !userId) {
		return null;
	}

	//   if (!isLoaded || !isSignedIn) {
	//     return null;
	//   }
	return (
		<>
			<p>Count: {count}</p>
			<button
				onClick={() => setCount(count + 1)}
				className="border bg-white/10 cursor-pointer p-2 rounded"
			>
				Increment
			</button>
		</>
	);
};
