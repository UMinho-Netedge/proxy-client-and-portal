responseBody = {
                "detail": "string",
                "instance": "string",
                "status": 0,
                "title": "string",
                "type": "string"
            }

class Error:
    def error_400(detail):
        responseBody["detail"] = detail
        responseBody["instance"] = "application/problem+json"
        responseBody["status"] = 400
        responseBody["title"] = "Bad Request"
        responseBody["type"] =  "about:blank" # See this later 
        return responseBody, responseBody["status"]

    def error_403(detail):
        responseBody["detail"] = detail
        responseBody["instance"] = "application/problem+json"
        responseBody["status"] = 403
        responseBody["title"] = "Forbidden"
        responseBody["type"] =  "about:blank" # See this later 
        return responseBody, responseBody["status"]

    def error_404():
        responseBody["detail"] = "invalid_route()"
        responseBody["instance"] = "application/problem+json"
        responseBody["status"] = 404
        responseBody["title"] = "Not Found"
        responseBody["type"] =  "about:blank" # See this later 
        return responseBody, responseBody["status"]


