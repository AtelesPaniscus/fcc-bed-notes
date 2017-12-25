const http = require('http');

http.get(process.argv[2], (response) => {

    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        console.log(chunk);
    });

    response.on('end', () => {
    });

    response.on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
});
