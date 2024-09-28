import mongoose, { Schema } from 'mongoose';
import { Book } from '../resource/request/book';

let bookSchema = new Schema<Book>({
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

export const BookModel = mongoose.model<Book>('Book', bookSchema);