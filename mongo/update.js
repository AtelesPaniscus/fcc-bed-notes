const mongodb = require('mongodb');
const assert = require('assert');

const url = "mongodb://localhost:27017/" + process.argv[2];

const selectDoc = {username : "tinatime"};
const updateDoc = {$set: {age : 40}};

var mongo = mongodb.MongoClient;

mongo.connect(url, (err, db) => {
    assert.equal(null, err);

    db.collection('users').updateOne(
        selectDoc, updateDoc, (err, result) => {
            assert.equal(null, err);

            db.close();
        });
});
