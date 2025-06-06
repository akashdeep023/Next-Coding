import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
	return (
		<div className="flex flex-col items-center justify-center py-8">
			<UserProfile path="/user-profile" />
		</div>
	);
}
