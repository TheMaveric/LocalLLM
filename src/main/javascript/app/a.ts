import http from 'http';

function getResponse(inputText: string): string {
    http.createServer().listen(8080);
    http.get("/api/v1/getResponse",inputText)
}