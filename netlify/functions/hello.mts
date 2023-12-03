import type { Context } from "@netlify/functions"
import {json} from "stream/consumers";

export default async (req: Request, context: Context) => {
    const urlparts = req.path.split("/")
    return new Response("Hello, world!"+ urlparts + req.toString() + context.toString())
}
