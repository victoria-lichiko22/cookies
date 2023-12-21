import {sendMessage} from "./tgapi/tg.mjs";

export default async (req: Request) => {
    const message = await req.json()
    console.log("Received an update from Telegram!", message);
    await sendMessage(message.chat.id, "Response")
    return new Response("",{ statusCode: 200 });
}
