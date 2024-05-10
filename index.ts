import {
    APIGatewayProxyEventV2,
    APIGatewayProxyStructuredResultV2
} from "aws-lambda";

interface Input {
    name: string;
}

interface Output {
    message: string;
}

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {

        const body = event.queryStringParameters as unknown as Input;

        let output: Output = {
            message: "Hello " + body.name
        }

        return {
            statusCode: 200,
            body: JSON.stringify(output)
        }
    } catch (err)
    {
        console.log(err);
    }
}