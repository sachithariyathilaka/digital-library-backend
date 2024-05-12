import {DatabaseService} from "./database-service";
import {BookRequest} from "../resource/request/BookRequest";
import {APIResponse} from "../resource/response/api-response";
import {Book} from "../model/Book";
import {ObjectId} from "mongodb";
import {ResponseHandler} from "../resource/response/response-handler";
import {Status} from "../enums/status";

export class BookService {

    constructor(private databaseService: DatabaseService) {
    }

    async saveBook(bookRequest: BookRequest) {
        let apiResponse: APIResponse;

        try {
            let database = await this.databaseService.dbConnect()
            let book = new Book(bookRequest);
            let result = await database.insertOne(book) as any

            if (result.acknowledged) {
                apiResponse = new APIResponse(200, "Book added successfully!", result.insertedId)
                return new ResponseHandler(200, apiResponse)
            } else {
                apiResponse = new APIResponse(500, "Error occurred while saving the book!", null)
                return new ResponseHandler(500, apiResponse)
            }
        } catch (err)
        {
            apiResponse = new APIResponse( 500, "Internal Server Error! " + err, null)
            return new ResponseHandler(500, apiResponse)
        }
    }

    async loadBooks() {
        let apiResponse: APIResponse;

        try {
            let database = await this.databaseService.dbConnect()
            let books = await database.find().toArray()

            if (books.length > 0) {
                apiResponse = new APIResponse(200, "Books fetched successfully!", books)
                return new ResponseHandler(200, apiResponse)
            } else {
                apiResponse = new APIResponse(204, "No books available!", [])
                return new ResponseHandler(204, apiResponse)
            }
        } catch (err)
        {
            apiResponse = new APIResponse(500, "Internal Server Error! " + err, null)
            return new ResponseHandler(500, apiResponse)
        }
    }

    async updateBook(id: string, bookRequest: BookRequest) {
        let apiResponse: APIResponse;

        try {
            let database = await this.databaseService.dbConnect()
            let version = bookRequest.version
            let status = await this.validateBook(id, version)

            if (status != Status.NO_ERRORS)
            {
                apiResponse = new APIResponse(422, status, id)
                return new ResponseHandler(422, apiResponse)
            } else {
                const filter = {  "_id" : new ObjectId(id)}
                const request = {$set: new Book(bookRequest)}
                let result = await database.updateOne(filter, request) as any

                if (result.acknowledged && result.matchedCount == 1 && result.modifiedCount == 1) {
                    apiResponse = new APIResponse(200, "Book updated successfully!", id)
                    return new ResponseHandler(200, apiResponse)
                } else {
                    apiResponse = new APIResponse(500, "Error occurred while updating the book!", id)
                    return new ResponseHandler(500, apiResponse)
                }
            }
        } catch (err)
        {
            apiResponse = new APIResponse(500, "Internal Server Error! " + err, id)
            return new ResponseHandler(500, apiResponse)
        }
    }

    async validateBook(id: string, version: number) {
        let database = await this.databaseService.dbConnect()
        const filter = {_id: new ObjectId(id)}
        let book = await database.findOne(filter) as any

        if (!book)
            return Status.INVALID_ID
        else if (book.version != version)
            return Status.INVALID_VERSION
        else
            return Status.NO_ERRORS
    }

    async deleteBook(id: string) {
        let apiResponse: APIResponse;

        try {
            let database = await this.databaseService.dbConnect()
            const filter = {  "_id" : new ObjectId(id)}
            let result = await database.deleteOne(filter) as any

            if (result.acknowledged && result.deletedCount == 1) {
                apiResponse = new APIResponse(200, "Book deleted successfully!", id)
                return new ResponseHandler(200, apiResponse)
            } else {
                apiResponse = new APIResponse(500, "Error occurred while deleting the book!", id)
                return new ResponseHandler(500, apiResponse)
            }
        } catch (err)
        {   apiResponse = new APIResponse(500, "Internal Server Error! " + err, id)
            return new ResponseHandler(500, apiResponse)
        }
    }
}