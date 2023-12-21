export default async (event) => {
    console.log("Received an update from Telegram!", event.body);
    return { statusCode: 200 };
};
