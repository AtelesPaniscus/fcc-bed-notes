const express = require('express');
const path = require('path');

const website = process.argv[3]||path.join(__dirname + 'public');

var app = express();

app.use(express.static(website)));

app.listen(Number(process.argv[2]));
