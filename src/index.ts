import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from "aws-lambda";
import {RequestBody} from "./interface/RequestBody";
import {ResponseBody} from "./interface/ResponseBody";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {
        const requestBody = event.queryStringParameters as unknown as RequestBody;
        let responseBody: ResponseBody = { message: "Hello " + requestBody.name };

        return {statusCode: 200, body: JSON.stringify(responseBody)};
    } catch (err)
    {
        console.log(err);
    }
}