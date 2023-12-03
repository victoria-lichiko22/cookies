import {Context} from "@netlify/functions";

import { MongoClient } from "mongodb";

export default async (req: Request, context: Context) => {
    const mongoClient = new MongoClient(process.env.MONGODB_URI);
    const clientPromise = mongoClient.connect();
    try {
        const queryParams = new URLSearchParams(req.url.split('?')[1]);
        const user = queryParams.get("user")
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
