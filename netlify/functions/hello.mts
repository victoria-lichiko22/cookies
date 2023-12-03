import type { Context } from "@netlify/functions"

export default async (req: NetlifyRequest, context: Context) => {
    const queryParams = req.url.searchParams;
    const user = queryParams.get("user")
    return new Response("Hello, world!"+ user)
}
