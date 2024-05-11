import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from "aws-lambda";
import {Request} from "./src/interface/Request";
import {insertData} from "./src/crud/insert";
import {loadData} from "./src/crud/load";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {
        switch (event.requestContext.http.method)
        {
            case "POST":
                const request = JSON.parse(event.body) as unknown as Request
                return insertData(request)

            case "GET":
                return loadData()

            default:
                let apiResponse = {
                    code: 405,
                    message: "Method Not Allowed!",
                    data: null
                }
                return {statusCode: 405, body: JSON.stringify(apiResponse)}

        }
    } catch (err)
    {
        let apiResponse = {
            code: 500,
            message: "Internal Server Error! " + err,
            data: null
        }

        return {statusCode: 500, body: JSON.stringify(apiResponse)}
    }
}

