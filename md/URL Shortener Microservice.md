# URL Shortener Microservice

This is the third of five microservice projects.

It is a slightly more complex microservice that redirects by replacing 'short' URLs with 'real' URLs using a MongoDB to store the short-to-real relationship.
I allowed three days for this project.

For the fCC instructions see <https://www.freecodecamp.org/challenges/url-shortener-microservice>.
They recommend using a MongoDB database.

Step 1 of the instructions reference an example application.
This helps visualise the otherwise abstract problem and clarifies how to implement the user stories.

Step 4 of the instructions references <http://www.example.com> but I am not sure what this is supposed to achieve.

Step 7 of the instructions references a wiki page "Guide for using MongoDB and deploying to Heroku" (from 2016).
The examples uses `mlab` for the database but says that you do not have to.
It is worth a read.


## Set Up - My Way

I cloned and renamed my version of the simple fCC boilerplate repository.

I created an empty GutHub repository of the same name.
I set it up as the remote of my local repository and pushed it to GitHub.

I kept the clone since local editing of README.md and other boilerplate files is less painful than using the `glitch` editor.

I imported (cloned) the new GitHub repository into a `glitch` project and renamed it (with less of a struggle),
set the description, copied the project URL to the GitHub repository meta-data and pinned the project in `glitch`.

## The Application

I did this over three days.
Someone who knows what they are doing should not require more than one.

My solution was one file (`server.js`) that comprises some 150 lines of code that included 3 database access routines and 4 application routines.
The database access is asynchronous and so 3 of the application routines were callback routines.

### Day 1

The goal was a complete application except for the (crucial) MongoDB database bit.

The cloned repository has a complete set of files and I rewrote/edited these to suit using previous exercises as a guide:

  * LICENCE.md (new but only a one line change from the previous exercise)
  * README.md (rewrite)
  * views/index.html (rewrite)
  * public/style.css (unchanged)
  * package.json (lost a lost of time with a stray comma)
  * server.js (adapted)

At the end of play, I had the URL 'routes' defined with a stock (error) response.
No validation of input.

Yes, I did bang my ahead against brick walls and some I had banged my head against before.


### Day 2

The goal was a complete application using a local (not an `mlab`) MongoDB.

First the real JavaScript bits:

  * syntax validation of the URL entered by the user
  * reverse function calls in preparation for asynchronous operation
  * in-memory database using an 'array' of 'objects'
    * problems 'inserting' new values (see below)
  * added URL redirection - this turned out to be simple

The version of `npm` used by `glitch` is 3.10.10.
To validate the URL I needed:

```js
    $ npm install --save valid-url
```

The problems inserting new values was really my mistake.
I confused the JavaScript `object` syntax with the Python `dict` syntax.
I could not take the length of an object so I turned it into an array of objects
and then could not enumerate what I thought were the keys of a dictionary.
I found and tried the `dict` in Collections.js but failed to get that to work.
I may have been trying to use to iterators the wrong way.
I found and tried the built-in Map type but failed to get that to work too.
Perhaps it requires a more recent version of something or other.

So I went back to JavaScript arrays and learnt how to use iterators to process an array.
This taught me to use `concat` to add to an array.

The second part involved conversion to use MongoDB the database:

  * install mongoDB - it is already installed - version 2.6.10
  * install the `npm` mongo package - also known as the driver - version 3.0.3.
  * rewrite code to use mongoDB
    * a collection is created the first time it is referenced so no work there
    * TypeError: db.collection is not a function
        * an extra level of indirection was required
        * see below
  * needed to rearrange code for callbacks again - a fair bit of work
  * needed recursion 'cos I'm using random numbers - not finished

Set up for mongoDB:

    $ cat > mongod
    mkdir -p data
    export IP=0.0.0.0
    mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"'
    $ chmod a+x mongod

The `TypeError` was a version problem.
See <https://stackoverflow.com/questions/43779323/typeerror-db-collection-is-not-a-function>.
The version problem was not in MongoDB but in the Node.js interface package.
Rather than downgrade the package, I changed my source code.
It was simple enough to implement.
See the second (it may have moved) of the suggested 'answers'.


### Day 3

I finished off the JavaScript and tidied up.

The main exercise for the day was to convert to using an `mlab` database.

  * use MONGO_URI and the .env file - note .env not commited to the repository
  * create mlab database - simple
    * Plan Type - Sandbox
    * Cloud Provider    - AWS
    * Region    - Europe (ew-west-1)
    * Storage   - 0.5 GB
    * Mongodb   - 3.4.13 (MMAPv1)
    * Database Name     - `shorturls`
  * have to set a user id and password
    * not good practice to write them down or store them in a repository
    * looks like you can look up the user name but not the password on `mlab`
  * change the URI in .env:
    * mongodb://<user-name>:<password>@ds255768.mlab.com:55768/shorturls
  * done


## At the End

I needed to delete the local mongo database directory.


I used the `Export to GitHub` option in `glitch` to `push` the final project back to my GitHub repository.
In GitHub I generated a pull request, merged it and then deleted the `glitch` branch.

I actually exported from `glitch` twice before accepting the pull request.
