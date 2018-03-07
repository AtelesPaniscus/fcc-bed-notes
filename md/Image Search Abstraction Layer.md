# Image Search Abstraction Layer

This is the fourth of five microservice projects.

It is of similar complexity to the last project but it requires a static lookup database.
The instructions did not provide one I could use so I tried to invent one myself.

I allowed three days for this project with the possibility of a fourth in order to provision by own database.

For the fCC instructions see <https://www.freecodecamp.org/challenges/image-search-abstraction-layer>.

It is rather unclear what the `?offset=nn` required by one of the use cases is supposed to do.
The best interpretation is that it means do not display the first _nn_ 'documents' retrieved.

The example solution output JSON with no pretty printing.
The solution in the video used pretty printing and the thumbnail URL was actually an valid HTML link.
Neat but not part of a User Story (as far as I can tell - my simple attempts to mimic this behaviour failed).

The current User Stories appear to be simpler than those inferred from the example solution and the video.

## The Images

The exercise (examples) used a database of images.

It would have help had the instruction said to clone some existing database but it did not.

One of the example solutions appeared to provide a UI for uploading (or perhaps just registering) images.
How tedious.  The instructions (in the accompanying video) suggested I look at how this upload worked.
It used AJAX to pass the images off to some server script that presumably extracted meta-data from the image url.
I don't know.

I decided to do my own database of images.
Subject primates, source Wikipedia.
It was a challenge to come up with a subject 'large' enough to be realistic, but not so large as to be 'impractical' for this exercise.
There are more primates than I realised.
I would have been better off with wild cats.

## Set Up - My Way

I created an empty GitHub repository named `fcc-image-search-microservice`.

I made a copy of my local fCC boilerplate repository, renamed the remote URL and pushed:

```bash
    $ cp -pR fcc-boilerplate/ fcc-image-search-microservice
    $ cd fcc-image-search-microservice
    $ git remote set-url github git@github.com:AtelesPaniscus/fcc-image-search-microservice.git
    $ git push github
```

That should be all that is needed here.
I kept the clone since local editing of README.md and other boilerplate files is less painful than using the `glitch` editor.

I imported (cloned) the new GitHub repository into a `glitch` project, renamed the `glitch` project and gave it a description.
I copied the `glitch` project URL to the GitHub repository meta-data and pinned the project in `glitch`.

I logged into `mlab` and created a new MongoDB for deployment purposes:

  * Plan Type - Sandbox
  * Cloud Provider    - AWS
  * Region    - Europe (ew-west-1)
  * Storage   - 0.5 GB
  * Mongodb   - 3.4.13 (MMAPv1)
  * Database Name     - `fcc-microservice-4`
     * could not have my preferred name
  * have to set a user id and password

In the glitch project's `.env` file:

```bash
  MONGO_URI=mongodb://<user-name>:<password>@ds261128.mlab.com:61128/fcc-microservice-4
```

Note: later fannying about changed this to:

```bash
  MONGO_URI=mongodb://<user-name>:<password>@ds111319.mlab.com:11319/fccimagesearch
```

I also set up a local MondoDB for development purposes.  Open the `glitch` console:

```bash
    $ npm install --save mongodb;
    $ cat > mongod
    mkdir -p data;
    mongod --dbpath=data --nojournal --rest "$@";
    $ chmod a+x mongod
```

With 'recent' mongoDB versions, the fanning around the a bind address of 0.0.0.0 is not necessary.
It even tells you so.

In the glitch project's `.env` file:

```bash
    MONGO_URI=mongodb://localhost:27017/fcc-microservice-4
```

## The Application

The application comprises `server.js` - the microservice - and `loaddatabase.js` - the standalone database loader.

The loader itself is 17 lines of JavaScript plus a little boilerplate.
The bulk of the file is the hard coded array of primates that is loaded into the database.

The server application (`server.js`) comprises some 135 lines of code that include 2 database access routines and 2 callback routines.
Half the application is boilerplate.


### Day 1

On Day 1 I did the setup and the first pass adaptation of:

  * README.md and LICENCE.md
  * index.html and style.css
  * package.json and server.js

All that was done with `server.js` was ensure that the correct URL 'routes' (paths) are recognised (there are only two).

### Day 2

#### The Database Loader

I implemented a static database loader in `loaddatabase.js`.
There was some trouble with duplicate keys solved by reordering the code - a race condition perhaps ?

After updating the `scripts` section of `package.json` to:

```json
  "scripts": {
    "start": "node server.js",
    "load": "node loaddatabase.js"
  },
```

The database could be loaded with either:

```bash
    $ node loaddatabase.js
    $ npm run load
```

The loader itself is trivial and probably could be done using the mongo shell.
It ought to read a file containing the JSON to load but I've been lazy and 'hard coded' the JSON into the loader instead of a separate file.


#### The Server

This was built up in stages.

First a dummy query was implemented that update the query log and a first pass 'print the log' function was implemented.

Next a retrieve function was added to the dummy query:  it was able to filter on just one keyword.

There was an issue creating 'find projections':  the old syntax used in the 'tutorial' challenges from Node School did not work.
It looked compatible with the MondoDB documentation but not with the `npm mongo` package.

Where previously one might write:

```js
    find(query,projection)
```

you now need to write:

```js
    find(query).project(projection)
```

Most of the improvements to my server application were actually simple manipulation of the database retrievals before conversion to a JavaScript array:

  * project(projection) to limit the fields retrieved
  * sort(new2old) to get the log entries ordered from newest to oldest
  * skip(offset) to implement the `?offset=` user story
  * limit(10) to retrict the number of documents displayed

The log was improved:  store the current date/time stamp as a UNIX epoch number and,
after retrieval but before sending the response, convert the epoch number into a human readable string
using a JavaScript equivalent to `foreach`.

A similar mechansim was tried as a way of converting URLs to hyperlinks but that failed.

Retieval of images using one of several keywords proved simple:
if the document field is an array, then MongoDB will retrieve all documents for which
at least one array element meets the criterion.


### Day 3

The final day should have seen a simple migration of the database to `mlab` and the addition of more 'documents' to the 'primates' collection
but I was a little bit behind with the coding and then it all went pear shaped anyway.

The database loader evolved to:

  * drop the primates collection to avoid duplicates;
  * ignore the error that occurs if the collection does not exist.

A pretty print was added with a global:

```js
    app.set('json spaces', 2);
```

and returning JSON responses with just:

```js
   response.json(docs);
```

It all went pear shaped when I tried to switch to a database hosted on `mlab`.


## Trouble with mlab

To use the database loader with `mlab` you need to ensure the environment is correct:

```sh
    $source .env
```

I found that both loader and server failed to authenticate with `mlab`.

I had done the same as for the last project so what could be wrong ?
Password ?  I deleted the existing user and tried again.

I retried this and then that until I had actually started again from scratch with a new database and no dashes with time.
Still no joy.

After wasting hours I tried the Internet.
There was not a lot of pertinent information.
What there was suggest a version compatibility issue.
This was the opinion of someone who had been onto support at `mlab`.

It seems corporate users wanted more security so `mlab` moved up to MongoDB 3.x.x with more secure authentication
but which is not backwards compatible with MongoDb 2.x.x, which is what `glitch` provides by default.

I did the research to find out how to update to MongoDB 3.x.x.
Fine.  Well within my confort zone:

```bash
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
```

This does not work:  `lsb_release` is not known.
Never mind, use the string `xenial`.

This does not work:  no write access to `/etc/apt/sources.list.d/` and no `sudo`.


## The Fudge

Now, the reason for using something like `glitch` is so that the good folks at fCC can review my solution:
no matter when, `glitch` will spin up my container and start my server application.

The reason for using something like `mlab` is so that the same happens for the database.

If I can use `package.json` to run a shell script that starts my server application instead of starting my server application directly,
then that shell script should also be able to start a local mongo server so that I don't need `mlab`.

This does the trick.  Here is the full fudge:

```bash
    killall mongod
    ./mongod > /dev/null &
    node loaddatabase.js
    node server.js
```

It is simple and crude but does the job and I do not want to spend more time 'improving' it.


## At the End

I did not delete the local mongo database directory but the fudge means that is by-the-bye.

I used the `Export to GitHub` option in `glitch` to `push` the final project back to my GitHub repository.
In GitHub I generated a pull request, merged it and then deleted the `glitch` branch.
