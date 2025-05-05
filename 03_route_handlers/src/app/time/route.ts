export const dynamic = "force-static"; // Force static rendering for this route
export const revalidate = 10; // Disable revalidation for this route

export async function GET() {
	return Response.json({ time: new Date().toLocaleTimeString() });
}
