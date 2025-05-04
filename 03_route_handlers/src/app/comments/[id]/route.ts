import { comments } from "../data";

export async function GET(
	_request: Request, // This is the request object, but we don't need it here thats why we use _request
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const comment = comments.find((comment) => comment.id === parseInt(id));
	if (!comment) {
		return new Response("Comment not found", { status: 404 });
	}
	return Response.json(comment);
}

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const body = await request.json();
	const { text } = body;
	const comment = comments.find((comment) => comment.id === parseInt(id));
	if (!comment) {
		return new Response("Comment not found", { status: 404 });
	}
	comment.text = text;
	return Response.json(comment);
}

export async function DELETE(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;
	const index = comments.findIndex((comment) => comment.id === parseInt(id));
	if (index === -1) {
		return new Response("Comment not found", { status: 404 });
	}
	const deletedComment = comments[index];
	comments.splice(index, 1);
	return Response.json(deletedComment);
}
