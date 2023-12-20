import {Context} from "@netlify/functions";

import { MongoClient } from "mongodb";
import crypto from "crypto";

export default async (req: Request, context: Context) => {
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    const clientPromise = mongoClient.connect();
    try {
        const tgData = await req.text()
        const data = Object.fromEntries(new URLSearchParams(tgData))
        const user = JSON.parse(data.user).id
        const ok = verifyInitData(tgData)
        if (!ok) {
            return new Response("", { status: 400 })
        }

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const results = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
        await logUserRequest(user)
        return new Response(JSON.stringify(results))
    } catch (error) {
        return new Response(error.toString(), { status: 500 })
    } finally {
        await mongoClient.close()
    }
}



const logUserRequest = async (user: string) => {
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    const clientPromise = mongoClient.connect();
    try {
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_USERLOG_COLLECTION);
        const doc = {
            user: user,
            timestamp: new Date(),
        }
        const result = await collection.insertOne(doc);
        console.log(`log was inserted with the _id: ${result.insertedId}`);
    } catch (error) {
        console.log('logUserRequest error: ' + error.toString());
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
