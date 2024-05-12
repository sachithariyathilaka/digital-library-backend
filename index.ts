import {APIGatewayProxyEventV2} from "aws-lambda";
import {BookRequest} from "./src/resource/request/BookRequest";
import {BookService} from "./src/service/book-service";
import {DatabaseService} from "./src/service/database-service";
import {HttpMethod} from "./src/enums/http-method";
import {ResponseHandler} from "./src/resource/response/response-handler";
import {APIResponse} from "./src/resource/response/api-response";

export const handler = async (event: APIGatewayProxyEventV2): Promise<ResponseHandler> => {
    try {
        const bookService = new BookService(new DatabaseService());
        const params = event.queryStringParameters as any

        switch (event.requestContext.http.method)
        {
            case HttpMethod.POST:
                const insertRequest = JSON.parse(event.body) as unknown as BookRequest
                return bookService.saveBook(insertRequest)

            case HttpMethod.GET:
                return bookService.loadBooks()

            case HttpMethod.PUT:
                const updateRequest = JSON.parse(event.body) as unknown as BookRequest
                return bookService.updateBook(params.id, updateRequest)

            case HttpMethod.DELETE:
                return bookService.deleteBook(params.id)

            default:
                let apiResponse = new APIResponse(405, "Method Not Allowed!", null)
                return new ResponseHandler(405, apiResponse)
        }
    } catch (err)
    {
        let apiResponse = new APIResponse(500, "Internal Server Error! " + err, null)
        return new ResponseHandler(500, apiResponse)
    }
}

