const http = require('http');

var datalist = [undefined, undefined, undefined];
var responsefuse = datalist.length;

function readStream(url, stream, callback) {
    http.get(url, (response) => {
        var data = "";

        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (saveStream(stream, data))
                callback();
        });

        response.on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });
}

function    saveStream(stream, data) {
    datalist[stream - 1] = data;
    responsefuse -= 1;

    return (responsefuse == 0);
}

function    printStreams() {
    datalist.forEach((data) => {
        if (data)
            console.log(data);
    });
}

readStream(process.argv[2], 1, printStreams);
readStream(process.argv[3], 2, printStreams);
readStream(process.argv[4], 3, printStreams);
