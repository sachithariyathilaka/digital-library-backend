import express, { Application } from 'express';
import mongoose from 'mongoose';
import {deleteBook, insertBook, loadBooks, updateBook} from "./service/book-service";
import serverlessHttp from "serverless-http";

mongoose.connect(process.env.MONGO_DB_URL).catch(err => console.error('MongoDB connection error: ', err));

const app: Application = express();
app.use(express.json());

app.post('/books', insertBook);
app.put('/books/:id', updateBook);
app.get('/books', loadBooks);
app.delete('/books/:id', deleteBook);

export const handler = serverlessHttp(app);
