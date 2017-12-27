const http = require('http');
const map = require('through2-map');

var server = http.createServer((instream, outstream) => {
    outstream.writeHead(200, {'content-type': 'text/plain' });

    instream.pipe(map((chunk) => {
        return chunk.toString().toUpperCase();
    })).pipe(outstream);
});

server.listen(Number(process.argv[2]));
