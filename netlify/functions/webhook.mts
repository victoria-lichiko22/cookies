export default async (req: Request) => {
    const message = await req.json()
    console.log("Received an update from Telegram!", message);
    return new Response("",{ statusCode: 200 });
}
