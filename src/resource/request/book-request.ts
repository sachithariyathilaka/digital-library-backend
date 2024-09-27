import { Document } from 'mongoose';

export interface BookRequest extends Document {
    title: string;
    description: string;
    year: number;
    author: string;
    origin: string;
    quantity: number;
    version: number;
    createdDate: number;
    lastModifiedDate: number;
}

export const getBookRequest = (bookRequest) => {
    bookRequest.lastModifiedDate = new Date().getTime();

    if (bookRequest.version)
        bookRequest.version = bookRequest.version + 1
    else {
        bookRequest.version = 1
        bookRequest.createdDate = new Date().getTime()
    }

    return bookRequest;
}