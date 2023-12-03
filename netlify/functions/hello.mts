import type { Context } from "@netlify/functions"
import {json} from "stream/consumers";

export default async (req: Request, context: Context) => {
    const { user } = req.queryStringParameters;
    return new Response("Hello, world!"+ user + req.toString() + context.toString())
}
