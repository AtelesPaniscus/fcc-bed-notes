var fs = require('fs');

var buffy = fs.readFileSync(process.argv[2]);

console.log(buffy.toString().split('\n').length - 1);
