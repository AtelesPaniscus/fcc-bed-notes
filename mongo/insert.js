const mongodb = require('mongodb');
const assert = require('assert');

const url = "mongodb://localhost:27017/learnyoumongo";

const selectDoc = {firstName : process.argv[2], lastName : process.argv[3]};

var mongo = mongodb.MongoClient;

mongo.connect(url, (err, db) => {
    assert.equal(null, err);

    db.collection('users').insertOne(
        selectDoc, (err, documents) => {
            assert.equal(null, err);

            console.log(JSON.stringify(selectDoc));
            db.close();
        });
});
