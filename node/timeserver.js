const net = require('net');
const strftime = require('strftime');

var server = net.createServer( (socket) => {
    socket.end(strftime("%Y-%m-%d %H:%M\n", new Date()));
});

server.listen(Number(process.argv[2]));
