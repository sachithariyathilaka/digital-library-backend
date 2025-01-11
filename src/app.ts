import express, { Application } from 'express';
import mongoose from 'mongoose';
import serverlessHttp from "serverless-http";
import {registerBookController} from "./controller/book-controller";

mongoose.connect(process.env.MONGO_DB_URL).catch(err => console.error('MongoDB connection error: ', err));

const app: Application = express();
app.use(express.json());

registerBookController(app)

export const handler = serverlessHttp(app);
