const mongodb = require('mongodb');
const assert = require('assert');

const url = "mongodb://localhost:27017/" + process.argv[2];

const selectDoc = {_id : process.argv[4]};

var mongo = mongodb.MongoClient;

mongo.connect(url, (err, db) => {
    assert.equal(null, err);

    db.collection(process.argv[3]).deleteOne(
        selectDoc, (err, result) => {
            assert.equal(null, err);

            db.close();
        });
});
