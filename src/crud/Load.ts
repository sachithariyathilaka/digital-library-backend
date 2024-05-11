import {dbConnect} from "../database";
import {APIResponse} from "../interface/APIResponse";

export const loadData = async ()=> {
    let apiResponse: APIResponse;

    try {
        let database = await dbConnect();
        let books = await database.find().toArray()

        if (books.length > 0) {
            apiResponse = {
                code: 200,
                message: "Books fetched successfully!",
                data: books
            }

            return {
                statusCode: 200,
                body: JSON.stringify(apiResponse)
            }
        } else {
            apiResponse = {
                code: 204,
                message: "No books available!",
                data: []
            }

            return {
                statusCode: 204,
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