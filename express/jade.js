const express = require('express');
const path = require('path');

const website = process.argv[3]||path.join(__dirname + 'templates');

var app = express();

app.set('view engine', "pug");
app.set('views', website);

app.get("/home", (request, response) => {
    response.render("index.jade", {date: new Date().toDateString()});
});

app.listen(Number(process.argv[2]));
