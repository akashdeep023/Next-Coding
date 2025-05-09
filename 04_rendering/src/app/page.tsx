import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<Link href={"/about"}>About</Link>
			<Link href={"/dashboard"}>Dashboard</Link>
		</div>
	);
}
