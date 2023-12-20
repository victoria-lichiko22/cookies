import {Context} from "@netlify/functions";

import { MongoClient } from "mongodb";
import crypto from "crypto";

export default async (req: Request, context: Context) => {
    console.log("function start")
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    const clientPromise = mongoClient.connect();
    try {
        // const queryParams = new URLSearchParams(req.url.split('?')[1]);
        // const user = queryParams.get("user")
        const tgData = await req.text()
        const data = Object.fromEntries(new URLSearchParams(tgData))
        const user = JSON.parse(data.user).id
        const ok = verifyInitData(tgData)
        if (!ok) {
            return new Response("", { status: 400 })
        }

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_USERLOG_COLLECTION);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const result = await collection.aggregate([
            {
                $match: {
                    user: user,
                    timestamp: { $gte: currentDate },
                },
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                },
            },
        ]).toArray();
        const r = result.length > 0 ? result[0].count : 0
        return new Response(r)
    } catch (error) {
        return new Response(error.toString(), { status: 500 })
    } finally {
        await mongoClient.close()
    }
}

const verifyInitData = (telegramInitData: string): boolean => {
    const urlParams = new URLSearchParams(telegramInitData);

    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    urlParams.sort();

    let dataCheckString = '';
    for (const [key, value] of urlParams.entries()) {
        dataCheckString += `${key}=${value}\n`;
    }
    dataCheckString = dataCheckString.slice(0, -1);

    const secret = crypto.createHmac('sha256', 'WebAppData').update(process.env.API_TOKEN ?? '');
    const calculatedHash = crypto.createHmac('sha256', secret.digest()).update(dataCheckString).digest('hex');

    return calculatedHash === hash;
}
