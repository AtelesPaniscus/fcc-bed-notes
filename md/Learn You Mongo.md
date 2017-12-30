# Learn You Mongo

MongoDB is a document-oriented database program that uses JSON-like documents with schemas.
It classifies as a NoSQL database.

The fcc waypoint delegates to the Node School [Learn You Mongo](https://github.com/evanlucas/learnyoumongo) tutorial.

On Cloud9, I recommend using a 'blank', not a 'node.js' container.

As a preliminary, you need to install MongoDB in your container with:

```bash
    $ sudo apt-get install mongodb-org
```

and set up your 'mongod alias' using these [directions](https://community.c9.io/t/setting-up-mongodb/1717):

```bash
    $ mkdir data
    $ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
    $ chmod a+x mongod
```

and then always use `./mongod` instead of `.mongod`.

This was fine in the Cloud9 container but did not work under CodeAnywhere.

The issue is that `mongodb` is not available from the Ubuntu repositories.
The incantation to add the `mongodb` repository to the CodeAnywhere container is:

```bash
    $ cat > mongodb.list
    deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen
    $ sudo cp -p mongodb.list /etc/apt/sources.list.d/
    $ sudo apt-get update
```

The  'mongod alias' setup looked OK but $IP was not defined on CodeAnywhere.
Fix with:

```bash
    $ export IP=0.0.0.0
```

----

This Node School tutorial is in serious need of TLC.
It uses an out-of-date API and you have to use the resources to guess your way to a working answer.
Several of the exercises swallow the Node.js console output so you are programming blind.

Each exercise has an 'official' solution:  study these as they offer further insight.

The tutorial has `html` reference documentation (aka resources) you might find handy.
See [Learn You Node](Learn%20You%20Node.html) for how you might browse the documentation comfortably.

The tutorial has the same naff interface as all the other Node School tutorials.
Maximise the small console viewing area at the bottom of the Cloud9 virtual desktop before use.

To install the tutorial:

```bash
    $ npm install -g learnyoumongo
```

To run it:

```bash
    $ learnyoumongo
```

After doing each 'challenge' check your work with:

```bash
    $ learnyoumongo verify
```

This swallows any console log output and so is unsuitable for debugging.
Instead try:

```bash
    $ learnyoumongo run.
```

which gives you useful debugging output for some exercises.

On Cloud9 the choice of colours means you cannot actually see the tutorial instructions.
No such problem on CodeAnywhere.
So I worked through the tutorial(s) on CodeAnywhere and Cloud9 in parallel.


## Mongod

This first exercise simply verifies that mongoDB is installed and available on $PATH.

```sh
    $ mongod --version
    db version v2.6.12
```

## Connect

This exercise starts the mongoDB server (not in the background but in a second terminal window).

```sh
    mkdir -p data
    ./mongod --port 27017
```

It then says to install `mongodb` as a `npm` package.

```sh
    npm init
    npm install mongodb
```

This may seem a bit weird since mongoDB is installed and is up and running.
Also, it seems, this is not necessary for the exercise verification to pass.
However, this is a `node` project and `package.json` needs to know that it uses mongo so do it.


## Find

Write a `node.js` program that finds something in a collection and prints the results to the console.
The exercise has lots of hints.

Resources:

  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

You may well get this error:

```
    db.collection is not a function
    Cannot read property 'parrots' of undefined
```

It's all magic, so how the hell are you supposed to debug this ?

The test actually populates and depopulates the database for you so you can't look around
(that is just the kind of thing that will give this error).

Relax, this isn't your code.
See <https://github.com/evanlucas/learnyoumongo/issues/3>.
Well, the issue has been open for 2½ years so clearly the author, Evan Lucas, knows best.
Many suggested solutions are just 'magic' and may have nothing to do with the problem.

The final comment worked for me:  use an older version:

```sh
    npm install mongodb@2.2.33
```

And start again with the first 'challenge'.

Oh, and remove the database if the sever crashes rather than trying to recover the database.


My solution:

```js
    const mongodb = require('mongodb');
    const assert = require('assert');

    const url = "mongodb://localhost:27017/learnyoumongo";

    const selectDocs = {age: {$gt : parseInt(process.argv[2], 10)}};

    var mongo = mongodb.MongoClient;

    mongo.connect(url, (err, db) => {
        assert.equal(null, err);

        db.collection('parrots').find(
            selectDocs).toArray((err, documents) => {
                assert.equal(null, err);

                console.log(documents);
                db.close();
            });
    });
```

I guess the `db.close()` needs to be in the inner most asynchronous nest
(else, if the server crashes ... you need a new database).

The 'official' solution can throw an error and so never call `db.close()`. Hmm ...

The 'official' solution does not use `parseInt()` but simple `+` for force conversion.  Yuk.


## Find Project

This exercise is a projection.  Yes, the title uses the verb kind of project.

Resources:

  * http://docs.mongodb.org/manual/reference/method/db.collection.find#explicitly-exclude-the-id-field
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find

The exercise adds one line to the solution to the previous exercise.

The hint was good but I found the mongo API documentation to be less than what I want.

My solution:

```js
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
```


## Insert

This exercise inserts a document into a database collection.
The command line is used to pass in the data to be inserted.

Resources:

  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#insert

All the console.log output is swallowed - even for `learnyoumongo run` - so you are programming totally blind.

My solution:

```js
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
```

It would seem `insert` is deprecated and one should use `insertOne` instead.


## Update

This exercise updates a document in a database collection.
The collection name is passed in from the command line.

Resources:

  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#update
  * http://docs.mongodb.org/manual/tutorial/modify-documents/
  * http://docs.mongodb.org/manual/reference/operator/update/set/#set

My solution:

```js
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
```

Initially I built the wrong data URL from the input parameter.
I had no idea what was wrong until I tried `learnyoumongo run`


## Remove

This exercise removes a document from a database collection using the document's id.
The database name, collection name and document id will be passed in on the command line.

Resources:

  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#remove

My solution:

```js
    const mongodb = require('mongodb');
    const assert = require('assert');

    const url = "mongodb://localhost:27017/" + process.argv[2];

    const selectDoc = {id : process.argv[4]};

    var mongo = mongodb.MongoClient;

    mongo.connect(url, (err, db) => {
        assert.equal(null, err);

        db.collection(process.argv[3]).delete One(
            selectDoc, (err, result) => {
                assert.equal(null, err);

                db.close();
            });
    });
```

This worked first time but I used `delete One()` instead of `remove()`.


## Count

This exercise counts the number of documents in a collection that meet a given criterion.
The criterion is hard coded but the threshold is passed in from the command line.

Resources:

  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#count

My solution;

```js
    const mongodb = require('mongodb');
    const assert = require('assert');

    const url = "mongodb://localhost:27017/learnyoumongo";

    const selectDocs = {age: {$GT : parseInt(process.argv[2], 10)}};

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
```

## Aggregate

This exercise calculates the average price of a book.
The database contains a collection ('books') of documents that hold meta-data about real books, including price.

Resources

  * http://docs.mongodb.org/manual/aggregation/
  * http://docs.mongodb.org/manual/core/aggregation-introduction/
  * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#aggregate

The exercise is simple but the syntax for aggregates (here $avg) is not so.

Operators that may be used in the $group stage include:

  * `$avg`
  * `$first`
  * `$last`
  * `$max`
  * `$min`
  * `$push`
  * `$sum`
  * `$addToSet`

My solution:

```js
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
```

The 'official' solution threw this in for good measure:

```sh
    if (!results.length)
        throw new Error('No results found')
```
