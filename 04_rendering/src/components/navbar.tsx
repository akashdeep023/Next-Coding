// "use client"; // Make this a client component then all the components inside this file will be client components
// import { useState } from "react";
import { NavLinks } from "./nav-links";
import { NavSearch } from "./nav-search";

export const Navbar = () => {
	console.log("Navbar rendered");
	// const [search, setSearch] = useState("false");
	return (
		<div>
			<NavLinks />
			<NavSearch />
		</div>
	);
};
