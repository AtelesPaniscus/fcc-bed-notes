const express = require('express');

var app = express();

app.get("/search", (request, response) => {
    response.writeHead(200, 'Content-Type/', "application/json");

    response.end(JSON.stringify(request.query));
});

app.listen(process.argv[2]);
