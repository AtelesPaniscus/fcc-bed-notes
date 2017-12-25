const fs = require('fs');
const path = require('path');

module.exports = function (dir, ext, callback) {
    fs.readdir(dir, (err, names) => {
        if (err)
            return callback(err);

        var result = [];
        names.forEach((name) => {
            if (path.extname(name).slice(1) == ext)
                result.push(name);
        });
        callback(null, result);
    });
}
