const mongodb = require('mongodb');
const assert = require('assert');

const url = "mongodb://localhost:27017/learnyoumongo";

const selectDocs = {age: {$gt : parseInt(process.argv[2], 10)}};

var mongo = mongodb.MongoClient;

mongo.connect(url, (err, db) => {
    assert.equal(null, err);

    db.collection('parrots').count(
        selectDocs, (err, count) => {
            assert.equal(null, err);

            console.log(count);
            db.close();
        });
});
