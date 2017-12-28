const express = require('express');
const fs = require('fs');

var app = express();

app.get("/books", (request, response) => {
    fs.readFile(process.argv[3], 'utf8', (err, str) => {
        if (err)
            response.json(err);
        else
            response.json(JSON.parse(str));
    });
});

app.listen(Number(process.argv[2]));
