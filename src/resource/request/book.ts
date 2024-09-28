import { Document } from 'mongoose';

export interface Book extends Document {
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

export const getBook = (book) => {
    book.lastModifiedDate = new Date().getTime();

    if (book.version)
        book.version = book.version + 1
    else {
        book.version = 1
        book.createdDate = new Date().getTime()
    }

    return book;
}