import {sendMessage} from "./tgapi/tg.mjs";

export default async (req: Request) => {
    const update = await req.json()
    console.log("Received an update from Telegram!", update);
    await sendMessage(update.message.chat.id, "Response")
    return new Response("",{ statusCode: 200 });
}
