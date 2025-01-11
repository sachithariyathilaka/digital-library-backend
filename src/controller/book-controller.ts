import {Application} from "express";
import {deleteBook, insertBook, loadBooks, updateBook} from "../service/book-service";

export const registerBookController = (app: Application) => {
    app.post('/books', insertBook);
    app.put('/books/:id', updateBook);
    app.get('/books', loadBooks);
    app.delete('/books/:id', deleteBook);
}