import {Request} from "../interface/Request";
import {dbConnect} from "../database";
import {APIResponse} from "../interface/APIResponse";
import {ObjectId} from "mongodb";
import {UpdateResponse} from "../interface/UpdateResponse";

export const updateData = async (id: string, request: Request)=> {
    let apiResponse: APIResponse;

    try {
        let database = await dbConnect();
        const filter = {  "_id" : new ObjectId(id)}
        const updateRequest = {
            $set: {
                title: request.title,
                description: request.description,
                year: request.year,
                origin: request.origin,
                author: request.author
            },
        }

        let updateResponse = await database.updateOne(filter, updateRequest) as UpdateResponse

        if (updateResponse.acknowledged && updateResponse.matchedCount == 1 && updateResponse.modifiedCount == 1) {
            apiResponse = {
                code: 200,
                message: "Book updated successfully!",
                data: updateResponse.modifiedCount
            }

            return {
                statusCode: 200,
                body: JSON.stringify(apiResponse)
            }
        } else {
            apiResponse = {
                code: 500,
                message: "Error occurred while updating the book!",
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