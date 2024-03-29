import {sendButton, sendMessage} from "./tgapi/tg.mjs";

export default async (req: Request) => {
    const update = await req.json()
    console.log("Received an update from Telegram!", update);
    // await sendMessage(update.message.chat.id, `Response to ${update.message.text}`)
    await sendButton(update.message.chat.id, `Выбери свою печеньку нажав кнопку ниже`, "Получить предсказание")
    return new Response("Ok");
}
