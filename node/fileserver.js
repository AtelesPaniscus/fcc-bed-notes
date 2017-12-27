const fs = require('fs');
const http = require('http');

var server = http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/plain' });

    var stream = fs.createReadStream(process.argv[3]);

    stream.pipe(response);
});

server.listen(Number(process.argv[2]));
