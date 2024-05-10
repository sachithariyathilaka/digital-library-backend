import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from "aws-lambda";
import {Request} from "./src/interface/Request";
import {Response} from "./src/interface/Response";
import {DatabaseResponse} from "./src/interface/DatabaseResponse";

let dbConnect = require('./src/database/database')

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {
        const requestBody = event.body as unknown as Request
        let response = await insertData(requestBody)
        let responseBody: Response;

        if (response.acknowledged) {
            responseBody = {
                code: 200,
                message: "Book added successfully!",
                data: response.insertedId
            }

            return {
                statusCode: 200,
                body: JSON.stringify(responseBody)
            }
        } else {
            responseBody = {
                code: 500,
                message: "Error occurred while saving the book!",
                data: null
            }

            return {
                statusCode: 500,
                body: JSON.stringify(responseBody)
            }
        }

    } catch (err)
    {
        return {statusCode: 500, body: JSON.stringify("Internal Server Error!")}
    }
}

export const insertData = async (request: Request)=> {
    let database = await dbConnect();
    return await database.insertOne(request) as DatabaseResponse;
}