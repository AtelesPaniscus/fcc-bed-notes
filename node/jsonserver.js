const http = require('http');
const url = require('url');

function parsetime(isotime)
{
    var date = new Date(isotime);

    return ({
        hour   : date.getHours(),
        minute : date.getMinutes(),
        second : date.getSeconds(),
    });
}

function unixtime(isotime)
{
    var date = new Date(isotime);

    return ({
        unixtime: date.getTime()
    });
}

var server = http.createServer((request, response) => {
    var str;
    var parsed = url.parse(request.url, true);

    if (parsed.pathname == '/api/parsetime')
        str = parsetime(parsed.query['iso']);

    if (parsed.pathname == '/api/unixtime')
        str = unixtime(parsed.query['iso']);

    if (str) {
        response.writeHead(200, {'content-type': 'application/json' });
        response.end(JSON.stringify(json));
    }
    else {
        response.writeHEAD(404);
        response.end("WTF");
    }
});

server.listen(Number(process.argv[2]));
