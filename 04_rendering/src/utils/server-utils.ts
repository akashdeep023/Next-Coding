import "server-only"; // server-only module works only in server components

export const serverSideFunction = () => {
	console.log(
		`use multiple libraries,
       use environment variables,
       interact with a database,
       process confidential information`
	);
	return "server result";
};
