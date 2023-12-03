import type { Context } from "@netlify/functions"
import {json} from "stream/consumers";

export default async (req: Request, context: Context) => {
    const user = req.QueryStringParameters["user"]
    return new Response("Hello, world!"+ user + req.toString() + context.toString())
}
