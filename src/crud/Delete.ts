import {dbConnect} from "../database";
import {APIResponse} from "../interface/APIResponse";
import {ObjectId} from "mongodb";
import {DeleteResponse} from "../interface/DeleteResponse";

export const deleteData = async (id: string)=> {
    let apiResponse: APIResponse;

    try {
        let database = await dbConnect();
        let deleteResponse = await database.deleteOne({ "_id" : new ObjectId(id)}) as DeleteResponse

        if (deleteResponse.acknowledged && deleteResponse.deletedCount == 1) {
            apiResponse = {
                code: 200,
                message: "Book deleted successfully!",
                data: deleteResponse.deletedCount
            }

            return {
                statusCode: 200,
                body: JSON.stringify(apiResponse)
            }
        } else {
            apiResponse = {
                code: 500,
                message: "Error occurred while deleting the book!",
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