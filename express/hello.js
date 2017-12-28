const express = require('express');

var app = express();

app.get("/home", (request, response) => {
    response.writeHead(200, 'Content-Type/', "text/plain");

    response.end("Hello World!");
});

app.listen(Number(process.argv[2]));
