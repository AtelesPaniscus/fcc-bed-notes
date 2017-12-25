const fs = require('fs');

fs.readFile(process.argv[2], 'utf8', (err, str) => {
    if (err)
        console.log(err);
    else
        console.log(str.split('\n').length - 1);
});
