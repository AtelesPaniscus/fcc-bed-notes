const express = require('express');
const bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));

app.post("/form", (request, response) => {
    response.writeHead(200, 'Content-Type/', "text/plain");

    response.end(request.body.str.split('').reverse().join(''));
});

app.listen(Number(process.argv[2]));
