import {BookRequest} from "../resource/request/BookRequest";
import {dbConnect} from "../database";
import {InsertResponse} from "../resource/response/InsertResponse";
import {APIResponse} from "../resource/response/APIResponse";
import {Book} from "../model/Book";

export const insertData = async (bookRequest: BookRequest)=> {
    let apiResponse: APIResponse;

    try {
        let database = await dbConnect();
        let book: Book = {
            title: bookRequest.title,
            description: bookRequest.description,
            year: bookRequest.year,
            origin: bookRequest.origin,
            author: bookRequest.author,
            createDate: new Date().getTime(),
            lastModifiedDate: new Date().getTime()
        }

        let insertResponse = await database.insertOne(book) as InsertResponse

        if (insertResponse.acknowledged) {
            apiResponse = {
                code: 200,
                message: "Book added successfully!",
                data: insertResponse.insertedId
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