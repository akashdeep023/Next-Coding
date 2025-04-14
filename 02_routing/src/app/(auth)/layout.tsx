"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./auth-style.css";

const navLinks = [
	{ name: "Login", href: "/login" },
	{ name: "Register", href: "/register" },
	{ name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<div>
			{navLinks.map((navLink) => {
				const isActive = pathname.startsWith(navLink.href);
				return (
					<span key={navLink.name}>
						<Link
							className={
								isActive
									? "font-bold mr-4"
									: "text-blue-500 mr-4"
							}
							href={navLink.href}
						>
							{navLink.name}
						</Link>
						&nbsp;&nbsp;
					</span>
				);
			})}
			{children}
		</div>
	);
}
