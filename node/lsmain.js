const lsfilter = require('./lsmodule.js');

lsfilter(process.argv[2], process.argv[3], (err, names) => {
    if (err)
        console.log(err);
    else
        names.forEach((name) => {
            console.log(name);
        });
});
