import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from "aws-lambda";
import {Request} from "./interface/Request";
import {Response} from "./interface/Response";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {
        const request = event.queryStringParameters as unknown as Request;
        let response: Response = { message: "Hello " + request.name };

        return {statusCode: 200, body: JSON.stringify(response)};
    } catch (err)
    {
        return {statusCode: 500, body: JSON.stringify("Internal Server Error!")}
    }
}