import type { Context } from "@netlify/functions"

export default async (req: Request, context: Context) => {
    const userBody = await req.text()
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const userParam = queryParams.get("user");
    return new Response(`Hello, world! UserParam: ${userParam || 'No user specified'} UserBody: ${userBody || 'No user specified'}`);
}
