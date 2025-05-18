import {
	SignInButton,
	SignOutButton,
	SignUpButton,
	// UserButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";
export const Navigation = () => {
	return (
		<nav className="bg-[var(--background)] border-b border-[var(--foreground)]/10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16 items-center">
					<div className="flex-shrink-0">
						<h1 className="text-xl font-semibold text-[var(--foreground)]">
							Next.js App
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<SignedOut>
							{/* <SignInButton mode="modal" />
							<SignUpButton mode="modal" /> */}
							<SignInButton>
								<button className="px-3 cursor-pointer py-1 rounded-2xl border border-gray-300">
									Sign in
								</button>
							</SignInButton>
							<SignUpButton>
								<button className="px-3 cursor-pointer py-1 rounded-2xl border border-gray-300">
									Sign up
								</button>
							</SignUpButton>
						</SignedOut>
						<SignedIn>
							{/* <UserButton /> */}
							<Link
								href="/user-profile"
								className="px-3 cursor-pointer py-1 rounded-2xl border border-gray-300"
							>
								Profile
							</Link>
							{/* <SignOutButton /> */}
							<SignOutButton>
								<button className="px-3 cursor-pointer py-1 rounded-2xl border border-gray-300">
									Sign out
								</button>
							</SignOutButton>
						</SignedIn>
					</div>
				</div>
			</div>
		</nav>
	);
};
