// Automatically passed in props to the layout component, no imports are needed

export default function ComplexDashboardLayout({
	children,
	users,
	revenue,
	notifications,
}: {
	children: React.ReactNode;
	users: React.ReactNode;
	revenue: React.ReactNode;
	notifications: React.ReactNode;
}) {
	return (
		<div>
			<div>{children}</div>
			<div style={{ display: "flex" }}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div>{users}</div>
					<div>{revenue}</div>
				</div>
				<div
					style={{
						display: "flex",
						flex: 1,
					}}
				>
					{notifications}
				</div>
			</div>
		</div>
	);
}
// Any file have errors ya loading then show specific components show error ya loading.
