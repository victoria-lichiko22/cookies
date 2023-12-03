import {Context} from "@netlify/functions";

import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();

export default async (req: Request, context: Context) => {
    try {
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        const user = queryParams.get("user")
        console.log("request from:", user)
        const count = await getRecordCountForUsername(user)
        if (count > 0) {
            return { statusCode: 403, body: "Приходи завтра" }
        }

        const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);
        const results = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
        await logUserRequest(user)
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
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
        return result.length > 0 ? result[0].count : 0
    } catch (error) {
        console.log('getRecordCountForUsername error: ' + error.toString());
    }
}
