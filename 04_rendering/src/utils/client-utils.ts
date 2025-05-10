import "client-only"; // client-only module works only in client components

export const clientSideFunction = () => {
	console.log(
		`use window object,
        use localStorage`
	);
	return "client result";
};
