// This is a client component
"use client";
// That uses the `useFormStatus` hook to get the form status
import { useFormStatus } from "react-dom";

export const Submit = () => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="block w-full p-2 text-white bg-blue-500 rounded cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
			disabled={pending}
		>
			Submit
		</button>
	);
};
