const http = require('http');

http.get(process.argv[2], (response) => {
    var data = "";

    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        console.log(data.length);
        console.log(data);
    });

    response.on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
});
