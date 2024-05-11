import {MongoClient} from "mongodb";

export const connectionString = "mongodb+srv://root:root@aws-lambda-node.nyipsqz.mongodb.net/?retryWrites=true&w=majority&appName=aws-lambda-node";
export const database = "library"
export const collection = 'books'

export const dbConnect = async () => {
    const client= new MongoClient(connectionString)
    let result = await client.connect()
    let db = result.db(database)
    return db.collection(collection)
}