import mongoose, { Schema } from 'mongoose';
import { BookRequest } from '../resource/request/book-request';

let bookSchema = new Schema<BookRequest>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    origin: { type: String, required: true },
    quantity: { type: Number, required: true },
    version: { type: Number, required: true},
    createdDate: { type: Number, required: true },
    lastModifiedDate: { type: Number, required: true }
});

export const Book = mongoose.model<BookRequest>('Book', bookSchema);