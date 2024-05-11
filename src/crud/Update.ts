import {BookRequest} from "../resource/request/BookRequest";
import {dbConnect} from "../database";
import {APIResponse} from "../resource/response/APIResponse";
import {ObjectId} from "mongodb";
import {UpdateResponse} from "../resource/response/UpdateResponse";

export const updateData = async (id: string, bookRequest: BookRequest)=> {
    let apiResponse: APIResponse;

    try {
        let database = await dbConnect();
        const filter = {  "_id" : new ObjectId(id)}
        const book = {
            $set: {
                title: bookRequest.title,
                description: bookRequest.description,
                year: bookRequest.year,
                origin: bookRequest.origin,
                author: bookRequest.author,
                lastModifiedDate: new Date().getTime()
            },
        }

        let updateResponse = await database.updateOne(filter, book) as UpdateResponse

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