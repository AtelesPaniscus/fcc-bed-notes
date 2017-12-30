const mongodb = require('mongodb');
const assert = require('assert');

const url = "mongodb://localhost:27017/learnyoumongo";

const selectDocs = {age: {$gt : parseInt(process.argv[2], 10)}};
const projection = {name: 1, age: 1, _id: 0};

var mongo = mongodb.MongoClient;

mongo.connect(url, (err, db) => {
    assert.equal(null, err);

    db.collection('parrots').find(
        selectDocs, projection).toArray((err, documents) => {
            assert.equal(null, err);

            console.log(documents);
            db.close();
        });
});
