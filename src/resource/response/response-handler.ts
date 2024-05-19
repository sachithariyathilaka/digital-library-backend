import {headers} from "../constant";

export class ResponseHandler {
    statusCode: number
    headers: any
    body: any

    constructor(statusCode: number, body: any) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.body = body;
    }
}