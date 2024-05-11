import {APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2} from "aws-lambda";
import {Request} from "./src/interface/Request";
import {insertData} from "./src/crud/Insert";
import {loadData} from "./src/crud/Load";
import {deleteData} from "./src/crud/Delete";
import {updateData} from "./src/crud/Update";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {

    try {
        switch (event.requestContext.http.method)
        {
            case "POST":
                const insertRequest = JSON.parse(event.body) as unknown as Request
                return insertData(insertRequest)

            case "GET":
                return loadData()

            case "PUT":
                const updateParams = event.queryStringParameters as any
                const updateRequest = JSON.parse(event.body) as unknown as Request
                return updateData(updateParams.id, updateRequest)

            case "DELETE":
                const deleteParams = event.queryStringParameters as any
                return deleteData(deleteParams.id)

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

