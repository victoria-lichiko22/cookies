import type { Context } from "@netlify/functions"
import {json} from "stream/consumers";

export default async (event, context, callback) => {
    console.log(event)
    console.log(context)
    console.log(callback)
    return new Response("Hello, world!")
}
