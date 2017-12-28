# Build Web Apps with Express.js

Express.js is a web application framework designed for building web applications and APIs on Node.js.
It is relatively minimal with many features available as plugins.
It is part of the MEAN stack (Mongo, Express, Angular and Node).

The fcc waypoint delegates to the Node School [Express Works](https://github.com/azat-co/expressworks) tutorial.

The fcc instructions first suggest reading [Understanding Express.js](http://evanhahn.com/understanding-express/).
Read it first and again after completing the challenge.

You must also install Express.js.
You are directed to install an fcc version, which has some unexpected side effects.
On Cloud9, I recommend using a 'blank', not a 'node.js' container.

Remember that in a fresh Cloud9 container you have versions 6.11.2 and 3.10.10 of `node` and `npm` ?
Remember that in a fresh CodeAnywhere container you have versions 8.4.0 and 5.6.0 ?
Well, after installing Express, you will be using 4.1.2 and 2.14.4.
So even older.

To install the fcc version of Express.js:

```bash
    $ git clone https://github.com/FreeCodeCamp/fcc-expressworks.git
    $ chmod 744 fcc-expressworks/setup.sh
    $ fcc-expressworks/setup.sh
    $ source ~/.profile
```

This also installs the Node School Express Works tutorial.

---

The Node School tutorial I enjoyed but, as with others, it barely scratches the surface.
It gives a sense of the power of Express.js but what little I learnt was quickly forgotten.
The terminology was foreign to me.  Reading the references is highly recommended.

The tutorial has the same naff interface as all the other Node School tutorials.
Maximise the small viewing area at the bottom of the Cloud9 virtual desktop before use.

Each exercise has an 'official' solution:  study these as they offer further insight.

The tutorial has `html` reference documentation you might find handy.
See [Learn You Node](Learn%20You%20Node.html) for how you might browse the documentation comfortably.

To run the tutorial:

```bash
    $ expressworks
```

After doing each 'challenge' check your work with:

```bash
    $ expressworks verify
```

On Cloud9 the choice of colours means you cannot actually see the tutorial instructions.
No such problem on CodeAnywhere.
So I worked through the tutorial(s) on CodeAnywhere and Cloud9 in parallel.


## Hello

This is a simple exercise to to get you started:
create an express.js application that outputs "Hello World!" when the client navigates to '/home' (on your imaginary web-site).
The port number to use is passed in on the command line.

```js
    const express = require('express');

    var app = express();

    app.get("/home", (request, response) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end("Hello World!");
    });

    app.listen(Number(process.argv[2]));
```


## Static

This exercise involves the application of static middleware to serve `index.html` with any route.
The number of the port to listen on and the file to serve up are passed in on the command line.

I have no idea what the exericse description means.  I know that `express.js` uses the term
`middleware` in way that is new to me and the word route is problematic in American-European english.

I feel this exercise introduces important concepts without any real explanation:

```js
    const express = require('express');
    const path = require('path');

    var app = express();

    app.use(express.static(process.argv[3]||path.join(__dirname, 'public')));

    app.listen(Number(process.argv[2]));
```

What does it do ?  Serves up the contents of the file process.argv[3].

If this isn't given, it uses the right hand side of the ||.
This is why you need the second `require`.
`__dirname` is a `node` special and means `pwd`.
As it happens 'public' becomes 'run'.


## Was Jade Is Now Pug

This exercise creates a home page that is rendered by the Jade template engine.
The home page view should show the current date uses `toDateString`.

Except the Jade template is defunct and has been renamed to pug.
The exercise has not been updated.

First, you need to install the `pug` module (ignore any warning messages):

```sh
    $ npm install pug
```

Second, there are two small changes needed in the solution's code:

```js
    const express = require('express');
    const path = require('path');

    var app = express();

    app.set('view engine', "pug");
    app.set('views', process.argv[3]||path.join(__dirname, 'templates'));

    app.get("/home", (request, response) => {
        response.render("index.jade", {date: new Date().toDateString()});
    });

    app.listen(Number(process.argv[2]));
```

One, change the name passed with `'view engine'`:  this changes the module that is loaded.
Two, change the name passed to `render()` from just plain _index_ to _index.jade_.

Presumably, as an alternative, you could have renamed the file on disk from _index.jade_ to _index.pug_.

Do not use `writeHead()` - it will cause the server to crash with a message about too late to set header fields.


## Good Old Form

In this exercise you write a route ('/form') that processes an HTML form.
Well, at least we now know what a route is.

The form is:

```HTML
    <form><input name="str"/></form>
```

The exercise requires the `str` value to be printed backwards.

According to the hints, `middleware` is a function invoked by Express.js before
it invokes your own request handler.
So everything is crystal now.

The middleware is a module by someone else that we need to install and `require` in our solution.

There is the suggestion I read about Connect middleware here:

        [https://github.com/senchalabs/connect#middleware](https://github.com/senchalabs/connect#middleware)

and about the body-parser (middleware) module here:

        [https://github.com/expressjs/body-parser](https://github.com/expressjs/body-parser)

I have done neither yet.

The exercise appears to be reverse input text and send it back but the exercise is, of course, about using middleware to parse a request form.
I think this pulls apart a very simple POST request so that you do not have to.

Here is my solution.  The correspondence between input and output is unclear:

```js
    const express = require('express');
    const bodyparser = require('body-parser');

    var app = express();

    app.use(bodyparser.urlencoded({extended: false}));

    app.post("/form", (request, response) => {
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(request.body.str.split('').reverse().join(''));
    });

    app.listen(Number(process.argv[2]));
```

The official solution use `response.send()` and did not bother with the `response.writeHead()`.


## Stylish CSS

This exercise uses the middleware-as-a-preprocessor model to turn
an abbreviated, lazy man's, markup into full blown CSS.

I thought is was generating a CSS style sheet but, in fact, the idea is to pre-process every
web page on the given web site.
I do not understand the references to static files (but now thinks this means prepared web pages as opposed to those generated on the fly).

```js
    const express = require('express');
    const path = require('path');
    const stylus = require('stylus');

    var app = express();

    var website = process.argv[3]||path.join(__dirname, 'public');

    app.use(stylus.middleware(website));
    app.use(express.static(website));

    app.listen(Number(process.argv[2]));
```

All the `path.join` does is insert the operating system directory character.


## Param Pam Pam

This exercise processes an HTML PUT request, not a POST request.
The request has the form 'message/:id'.
The response has is a SHA1 of the current date and the id received.

First install the `crypto` module.  Ignore the warning about it being built in:  our node is old.

```js
    const express = require('express');
    const crypto = require('crypto');

    var app = express();

    app.put("/message/:id", (request, response) => {
        var id = request.params.id;

        response.writeHead(200, { "Content-Type": "text/plain" });
        response.end(crypto.createHash('sha1').update(new Date().toDateString() + id).digest('hex'));
    });

    app.listen(Number(process.argv[2]));
```


## What's In a Query

This exercise accepts a GET request, extracts (query) data from it and returns it in JSON format.

Simple enough.  I even guessed the JSON part:

```js
    const express = require('express');

    var app = express();

    app.get("/search", (request, response) => {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify(request.query));
    });

    app.listen(Number(process.argv[2]));
```


## Json Me

This exercise reads a file (whose path is passed in on the command line) and outputs the content in JSON format.

```js
    const express = require('express');
    const fs = require('fs');

    var app = express();

    app.get("/books", (request, response) => {
        fs.readFile (process.argv[3], 'utf8', (err, str) => {
            if (err)
                response.json(err);
            else
                response.json(JSON.parse(str));
        });
    });

    app.listen(Number(process.argv[2]));
```
