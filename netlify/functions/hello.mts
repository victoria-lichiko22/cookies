import type { Context } from "@netlify/functions"

export default async (req: NetlifyRequest, context: Context) => {
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    // Get the value of the 'user' parameter
    const user = queryParams.get("user");
    // Construct a response with the user parameter
    return new Response(`Hello, world! User: ${user || 'No user specified'}`);
}
