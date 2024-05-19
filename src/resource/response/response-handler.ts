export class ResponseHandler {
    statusCode: number
    headers: any
    body: any

    constructor(statusCode: number, headers: any, body: any) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.body = body;
    }
}