const mongodb = require('mongodb');
const assert = require('assert');

const url = "mongodb://localhost:27017/learnyoumongo";

const selectDocs = {$match: {size: process.argv[2]}};
const aggregateDocs = {$group: {_id: 'average', average: {$avg: '$price'}}};

var mongo = mongodb.MongoClient;

mongo.connect(url, (err, db) => {
    assert.equal(null, err);

    db.collection('prices').aggregate(
        [selectDocs, aggregateDocs].toArray(), (err, results) => {
            assert.equal(null, err);

            console.log(results[0].average.toFixed(2));
            db.close();
        });
});
