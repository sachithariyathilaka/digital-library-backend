import { Request, Response } from 'express';
import {Book} from "../model/book";
import {APIResponse} from "../resource/response/api-response";
import {getBookRequest} from "../resource/request/book-request";
import {Status} from "../enums/status";

export const insertBook = async (req: Request, res: Response): Promise<void> => {
    let apiResponse: APIResponse;

    try {
        let bookRequest = getBookRequest(req.body);
        let book = await new Book(bookRequest).save();

        if (book) {
            apiResponse = new APIResponse(201, "Book added successfully!", book._id)
            res.status(201).json(apiResponse);
        } else {
            apiResponse = new APIResponse(500, "Error occurred while saving the book!", null)
            res.status(500).json(apiResponse);
        }
    } catch (error) {
        apiResponse = new APIResponse( 500, "Internal Server Error! " + error, null)
        res.status(500).json(apiResponse);
    }
};

export const  updateBook = async (req: Request, res: Response) => {
    let apiResponse: APIResponse;
    let bookId = req.params.id;

    try {
        let bookRequest = getBookRequest(req.body);
        let status = await validateBook(bookId, bookRequest.version);

        if (status != Status.NO_ERRORS) {
            apiResponse = new APIResponse(422, status, bookId);
            res.status(422).json(apiResponse);
        } else {
            let updatedBook = await Book.findByIdAndUpdate(bookId, bookRequest) as any;

            if (updatedBook) {
                apiResponse = new APIResponse(200, "Book updated successfully!", bookId);
                res.status(200).json(apiResponse);
            } else {
                apiResponse = new APIResponse(500, "Error occurred while updating the book!", bookId)
                res.status(500).json(apiResponse);
            }
        }
    } catch (err) {
        apiResponse = new APIResponse(500, "Internal Server Error! " + err, bookId);
        res.status(500).json(apiResponse);
    }
}

let validateBook = async (id: string, version: number) => {
    let book = await Book.findById(id) as any;

    if (!book)
        return Status.INVALID_ID
    else if (book.version != version - 1)
        return Status.INVALID_VERSION
    else
        return Status.NO_ERRORS
}

export const loadBooks = async (req: Request, res: Response): Promise<void> => {
    let apiResponse: APIResponse;

    try {
        let books = await Book.find() as Array<any>;

        if (books.length > 0) {
            apiResponse = new APIResponse(200, "Books fetched successfully!", books);
            res.status(200).json(apiResponse);
        } else {
            apiResponse = new APIResponse(204, "No books available!", []);
            res.status(204).json(apiResponse);
        }
    } catch (err) {
        apiResponse = new APIResponse(500, "Internal Server Error! " + err, null);
        res.status(500).json(apiResponse);
    }
}

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    let apiResponse: APIResponse;
    let bookId = req.params.id;

    try {
        let deletedBook = await Book.findByIdAndDelete(bookId);

        if (deletedBook) {
            apiResponse = new APIResponse(200, "Books deleted successfully!", bookId);
            res.status(200).json(apiResponse);
        } else {
            apiResponse = new APIResponse(500, "Error occurred while deleting the book!", bookId);
            res.status(500).json(apiResponse);
        }
    } catch (err)
    {   apiResponse = new APIResponse(500, "Internal Server Error! " + err, bookId);
        res.status(500).json(apiResponse);
    }
}