import {MongoClient} from "mongodb";
import {collection, connectionString, database} from "../resource/constant";

export class DatabaseService {
    async dbConnect() {
        const client= new MongoClient(connectionString)
        let result = await client.connect()
        let db = result.db(database)
        return db.collection(collection)
    }
}