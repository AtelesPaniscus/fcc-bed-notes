const express = require('express');
const crypto = require('crypto');

var app = express();

app.put("/message/:id", (request, response) => {
    const id = request.params.id;

    const str = crypto.createHash('sha1').update(new Date().toDateString() + id).digest('hex');

    response.send(str);
});

app.listen(Number(process.argv[2]));
