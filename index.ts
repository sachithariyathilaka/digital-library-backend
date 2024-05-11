import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from "aws-lambda";
import {RequestBody} from "./src/interface/RequestBody";
import {ResponseBody} from "./src/interface/ResponseBody";
import {insertData} from "./src/crud/insert";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {
        const requestBody = JSON.parse(event.body) as unknown as RequestBody
        let response = await insertData(requestBody)
        let responseBody: ResponseBody;

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
        return {statusCode: 500, body: JSON.stringify("Internal Server Error! " + err)}
    }
}