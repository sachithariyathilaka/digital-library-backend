import {RequestBody} from "../interface/RequestBody";
import {dbConnect} from "../database";
import {DatabaseResponse} from "../interface/DatabaseResponse";

export const insertData = async (request: RequestBody)=> {
    let database = await dbConnect();
    return await database.insertOne(request) as DatabaseResponse;
}