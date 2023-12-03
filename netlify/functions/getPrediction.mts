import {Context} from "@netlify/functions";

import { MongoClient } from "mongodb";

export default async (req: Request, context: Context) => {
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    const clientPromise = mongoClient.connect();
    try {
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        const user = queryParams.get("user")
        console.log("request from:", user)
        const count = await getRecordCountForUsername(user)
        console.log("record count:", count)
        if (count > 0) {
            console.log("return forbidden")
            return new Response("forbidden", { status: 403 })
        }
        console.log("get data")
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
    }
}

async function getRecordCountForUsername(username: string) {
    try {
        console.log('getRecordCountForUsername', username);
        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_USERLOG_COLLECTION);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const result = await collection.aggregate([
            {
                $match: {
                    user: username,
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
        console.log(`getRecordCountForUsername result: ${r}`)
        return r
    } catch (error) {
        console.log('getRecordCountForUsername error: ' + error.toString());
    }
}
