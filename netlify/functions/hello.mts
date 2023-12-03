import type { Context } from "@netlify/functions"
import {json} from "stream/consumers";

export default async () => {
    return new Response("Hello, world!"+ event.toString())
}
