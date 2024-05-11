import {Request} from "../interface/Request";
import {dbConnect} from "../database";
import {DbResponse} from "../interface/DbResponse";
import {APIResponse} from "../interface/APIResponse";

export const insertData = async (request: Request)=> {
    let apiResponse: APIResponse;

    try {
        let database = await dbConnect();
        let dbResponse = await database.insertOne(request) as DbResponse

        if (dbResponse.acknowledged) {
            apiResponse = {
                code: 200,
                message: "Book added successfully!",
                data: dbResponse.insertedId
            }

            return {
                statusCode: 200,
                body: JSON.stringify(apiResponse)
            }
        } else {
            apiResponse = {
                code: 500,
                message: "Error occurred while saving the book!",
                data: null
            }

            return {
                statusCode: 500,
                body: JSON.stringify(apiResponse)
            }
        }
    } catch (err)
    {
        apiResponse = {
            code: 500,
            message: "Internal Server Error! " + err,
            data: null
        }
        return {statusCode: 500, body: JSON.stringify(apiResponse)}
    }
}