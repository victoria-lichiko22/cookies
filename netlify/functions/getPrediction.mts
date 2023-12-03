import {Context} from "@netlify/functions";

import { MongoClient } from "mongodb";

export default async (req: Request, context: Context) => {
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    const clientPromise = mongoClient.connect();
    try {
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        const user = queryParams.get("user")
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
