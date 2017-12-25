const fs = require('fs');
const path = require('path');

fs.readdir(process.argv[2], (err, pathNames) => {
    if (err)
        console.log(err);
    else
        pathNames.forEach((pathName) => {
            if (path.extname(pathName).slice(1) == process.argv[3])
                console.log(pathName);
        });
});
