"use client";

import { useState } from "react";

export default function DashboardPage() {
	console.log("Dashboard client component");
	const [name, setName] = useState("");

	return (
		<div>
			<h1>Dashboard</h1>
			<input
				className="border"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<p>Hello, {name}!</p>
		</div>
	);
}
