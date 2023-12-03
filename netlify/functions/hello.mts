import type { Context } from "@netlify/functions"

export default async (req: NetlifyRequest, context: Context) => {
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const user = queryParams.get("user");
    return new Response(`Hello, world! User: ${user || 'No user specified'}`);
}
