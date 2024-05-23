import {BookRequest} from "../resource/request/book-request";

export class Book {
    title: string
    description: string
    year: number
    author: string
    origin: string
    quantity: number
    version: number
    createdDate: number
    lastModifiedDate: number

    constructor(bookRequest: BookRequest) {
        this.title = bookRequest.title;
        this.description = bookRequest.description;
        this.year = bookRequest.year;
        this.author = bookRequest.author;
        this.origin = bookRequest.origin;
        this.quantity = bookRequest.quantity;
        this.lastModifiedDate = new Date().getTime();

        if (bookRequest.version)
            this.version = bookRequest.version + 1
        else {
            this.version = 1
            this.createdDate = new Date().getTime()
        }
    }
}