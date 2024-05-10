import {MongoClient} from 'mongodb';

export const connectionString = "mongodb+srv://root:root@aws-lambda-node.sihhtz3.mongodb.net/?retryWrites=true&w=majority&appName=aws-lambda-node";
export const database = "tutorial"
export const collection = 'books'

async function dbConnect()
{
    const client= new MongoClient(connectionString)
    let result = await client.connect()
    let db = result.db(database)
    return db.collection(collection)
}

module.exports = dbConnect;
