# Learn You Mode

Node.js is a JavaScript run-time environment for server-side JavaScript code:
historically, JavaScript was used client-side using the JavaScript engine in a browser.
Node.js allows the server to produce dynamic web page content before a web-page is sent to the browser client.
It is a foundation of the "JavaScript everywhere" paradigm.

The fcc programme delegates to the Node School [Learn You Node](https://github.com/workshopper/learnyounode) tutorial.
It is split over over three fcc waypoints:

  * Start a Nodejs Server (exercise 1-7)
  * Continue working with Nodejs Servers (exercises 8-10)
  * Finish working with Nodejs Servers (exercises 11-13)

On Cloud9, I recommend using a 'blank', not a 'node.js' container.

---

I thought this tutorial was good.
It illustrates both the power of node.js and the basic patterns on which (I guess) the great majority of servers are based.
The notes below, as they stand, rather assume I remember rather more than I did.

Each exercise has an 'official' solution:  study these as they offer further insight.

In your container, the `learnyounode` module is installed under:

    $HOME/.nvm/versions/node/vx.y.z/lib/node_modules/learnyounode

Among other things, here you will find:

  * node_apidoc/        - a directory with API documentation for all modules used in the tutorial
  * exercises/          - a directory with a sub-directory for each exercise of the tutorial and in those:
    * problem.md        - the text describing the exercise (in markdown format)
    * solution/solution.js - the 'official' solution

What you do not have in your container is a browser with which to examine the API documentation.
It may be simplest to clone the tutorial's repository into your local machine and browse them there.

The tutorial has the same naff interface as all the other Node School tutorials.
Maximise the small viewing area at the bottom of the Cloud9 virtual desktop before use.

To install the tutorial:

```bash
    $ npm install -g learnyounode
```

To run it:

```bash
    $ learnyounode
```

After doing each 'challenge' check your work with:

```bash
    $ learnyounode verify
```

On Cloud9 the choice of colours means you cannot actually see the tutorial instructions.
No such problem on CodeAnywhere.
So I worked through the tutorial(s) on CodeAnywhere and Cloud9 in parallel.

Under CodeAnywhere, the final three exercises failed because the client part of the test program was timing out after 500ms.
Increase this to 1000ms and the verification should work.
The file to change is `exercise.js` in the pertinent exercise directory under the learnyounode module directory (see above).  E.g.

    /home/cabox/.nvm/versions/node/v8.4.0/lib/node_modules/learnyounode/http_file_server/exercise.js


## Hello World !

This exercise writes "HELLO WORLD" to the console (stdout).
When you run `node` from the command line, the output is to the terminal window.

```js
    console.log("HELLO WORLD");
```


## Baby Steps

This exercise prints the sum of its command line arguments.

```js
    const sum = (accumulator, currentValue) => accumulator + Number(currentValue);

    console.log(process.argv.slice(2).reduce(sum, 0));
```

This is using the new (=>) syntax.


## My First I/O !

This exercise counts the number of lines in a file.
The file pathname is a command line parameter.

To all intents and purposes, the hints tell you what to write.

```js
    var fs = require('fs');

    var buffy = fs.readFileSync(process.argv[2]);

    console.log(buffy.toString().split('\n').length - 1);
```

Note: the length method returns the number of elements in an array.
Splitting the file into an array of lines does the counting for us.

Once you have passed the test it suggests that:

```js
    fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
```

tells 'fs' to read characters so that you do not need to convert.

This exercises uses 'synchronous' (aka 'blocking') i/o.
In `node` it is normal to use 'asynchronous' i/o.
In fact, any and all requests are usually 'asynchronous'.
That is the point.


## My First Async I/O !

This exercise is the same as the last exercise except that is uses asynchronous i/o and hence a callback function.
Asynchronous i/o is the Node.js way.

```js
    var fs = require('fs');

    fs.readFile(process.argv[2], 'utf8',
        function (err, str) {
            if (err)
                console.log(err);
            else
                console.log(str.split('\n').length - 1);
        });
```

Recommended reading: <https://github.com/maxogden/art-of-node#callbacks>.


## Filtered LS

This exercise prints a list of the files in a directory filtered by file extension.
The directory and extension are passed in on the command line.

The `readdir` method expects a callback function so asynchronous i/o is inevitable.

```js
    const fs = require('fs');
    const path = require('path');

    fs.readdir(process.argv[2],
        function (err, pathNames) {
            if (err)
                console.log(err);
            else
                pathNames.forEach(
                    function(pathName) {
                        if (path.extname(pathName).slice(1) == process.argv[3])
                            console.log(pathName);
                    });
        });
```


## Make It Modular

This exercise has a very long description.

The goal of this exercise is the same as the last one
only you are required to bury the hard work in a separate module.

This is a common programming idiom in `node` but looks like overkill here:
the main routines provides a callback to print the results and passes it
to our module that provides a callback to `readdir`.

```js
    const fs = require('fs');
    const path = require('path');

    module.exports = function(dir, ext, callback){
        fs.readdir(dir,
            function(err, pathNames){
                if (err)
                    return callback(err);

                callback(null, pathNames.filter(
                    function(pathName){
                        return path.extname(pathName).slice(1) == ext;
                    })
                );
            })
    }
```

and call it from a main routine:

```js
    const lsfilter = require('./lsmodule.js');

    lsfilter(process.argv[2], process.argv[3],
        function(err, names){
            if (err)
                console.log(err);
            else
                names.forEach(
                    function(name) {
                        console.log(name);
                    });

        });
```


## HTTP Client

This exercise uses HTTP (and the http module).
It accepts GET requests and prints the data content of the requests to the console.
The source URL is a command line parameter.

You will not be able to do this without reading some documentation:
[https://nodejs.org/api/http.html#http_http_get_options_callback]
(https://nodejs.org/api/http.html#http_http_get_options_callback).
This is very much reference, not tutorial, documentation.

The exercise says to use `http.get()`, which is a simplification.
The solution below is a simplification of the example in the reference documentation.

```js
    const http = require('http');

    http.get(process.argv[2], (response) => {

        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            console.log(chunk);
        });

        response.on('end', () => {
        });

        response.on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    });
```

The 'official' answer is yet another simplification:

```js
    var http = require('http')

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      response.on('data', console.log)
      response.on('error', console.error)
    }).on('error', console.error)
```


## HTTP Collect

This exercise requires an application that will receive a series of GET requests containing data.
When the HTTP connection is closed (at the other end),
the application must print out the total number of data characters received and the data itself as one long line.

This can be done by writing code yourself or by using existing modules.
It is hinted you should use existing modules and a couple are suggested.

Here is my solution 'writing code' myself.
Big deal.
It seems to me that the application is simply a side-effect of the data collection.

```js
    const http = require('http');

    http.get(process.argv[2], (response) => {
        var data = "";

        response.setEncoding('utf8');

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log(data.length);
            console.log(data);
        });

        response.on('err', (err) => {
            console.error(`Got error: ${err.message}`);
        });
    });
```

I tried but failed to use existing modules.
This was probably due to my naïvety and I perhaps ought to try again.

I tried to install one of the modules referenced but that failed.
However, since the module documentation was already installed then perhaps so too was the module.
Given how simple the 'application' is, I doubt much of the module's functionality would be required.


## Juggling Async

This exercise is an example of concurrency:
three instances of the same code dealing with three data sources concurrently.

The task is the same as for the last exercise except thaT three data sources
are passed in as parameters and the GET requests that provide the data from
these sources are all mixed up.

Collect the data from all three and when the very final chunk of data is received
only then print out the data received for all three sources in command line parameter order.

For this exercise it is suggested not using a module will be simpler.
They used the bl module but otherwise my answer was similar.
My choice of names is not very good.

```js
    const http = require('http');

    var datalist = [undefined, undefined, undefined];
    var responsefuse = datalist.length;

    function readStream(url, stream, callback) {
        http.get(url, (response) => {
            var data = "";

            response.setEncoding('utf8');

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                if (saveStream(stream, data))
                    printStreams();
            });

            response.on('err', (err) => {
                console.error(`Got error: ${err.message}`);
            });
        });
    }

    function    saveStream(stream, data) {
        datalist[stream - 1] = data;
        responsefuse -= 1;

        return (responsefuse === 0);
    }

    function    printStreams() {
        datalist.forEach((data) => {
            if (data)
                console.log(data);
        });
    }

    readStream(process.argv[2], 1, printStreams);
    readStream(process.argv[3], 2, printStreams);
    readStream(process.argv[4], 3, printStreams);
```

## Time Server

This is an example of the TCP server that closes the connection after each request.
In response to a request, it returns the current date and time (to the nearest minute).

This uses TCP, not HTTP, so requires a different module.
It also needs the built in Data() object and hints at using the `strfmt` module.
At the time I seemed to be unable to install modules so my solution formats the result the hard way.

```js
    const net = require('net');

    var server = net.createServer( (socket) => {
        var now = new Data();

        var str = now.getFullYear() + '-' +
                (now.getMonth() + 1) + '-' +
                now.getDate() + ' ' +
                now.getHours() + ':' +
                now.getMinutes() + '\n';

        socket.end(str);
    });

    server.listen(process.argv[2]);
```

This is technically incorrect as it ought to pad to two digits but I just happened to do this in the afternoon at the end of the year so it quirked.
This is why I need the `strfmt` module.

Also, the brokenness that stops installation of `npm`` modules also means
the CodeAnywhere version will not work but it verifies because the reference is also broken.

Eureka.
I could not install `npm` modules because I was in the wrong directory (not the 'workspace' directory as the fcc instructions told me to be).
It also seems that `require` does not work unless the source code is also in the 'workspace' directory.

My solution using the `strftime` module.

```js
    const net = require('net');
    const strftime = require('strftime');

    var server = net.createServer( (socket) => {
        socket.end(strftime("%Y-%m-%d %H:%M\n", new Date()));
    });

    server.listen(process.argv[2]);
```


## HTTP File Server

This exercise is a simple example of an HTTP file server.
It streams a file in response to each request it receives.
The file pathname is passed in on the command line.

```js
    const fs = require('fs');
    const http = require('http');

    var server = http.createServer((request, response) => {
        resquest.writeHead(200, {'content-type': 'text/plain' });
        var stream = fs.createReadStream(process.argv[3]);

        stream.pipe(response);
    });

    server.listen(Number(process.argv[2]));
```

but I did not have the `res.writeHead` until I saw the solution.
I did not explicitly convert the port number.

I guess the subtleties of request and response headers and data type conversions
are beyond the scope of these exercises.

Under CodeAnywhere this exercise would not work until the timeout in the test client was lengthened.


## HTTP Uppercaserer

This exercise is another simple example of an HTTP.
It accepts POST requests and returns the data they contain after conversion to upper case.

```js
    const http = require('http');
    const map = require('through2-map');

    var server = http.createServer((instream, outstream) => {
        outstream.writeHead(200, {'content-type': 'text/plain' });

        if (instream.method != 'POST') {
            return (instream.end('Send me a POST'));
        }

        instream.pipe(map((chunk)  => {
            return chunk.toString().toUpperCase();
            })
        ).pipe(outstream);
    });

    server.listen(Number(process.argv[2]));
```

The uses of `through2-map` to convert stream data on the fly came from the exercise hints.

The test for POST came from the 'official' solution.

Under CodeAnywhere this exercise would not work until the timeout in the test client was lengthened.


## HTTP JSON API Server

This exercise services HTTP GET requests and returns data in JSON format.
It has two 'endpoints'. '/api/parsetime' and '/api/unixtime'.
Each request contains a date-time stamp that is converted.
The first converts the stamp to hour-minute-second, the second to 'epoch time'.

```js
    const http = require('http');
    const url = require('url');

    function parsetime(isotime)
    {
        var date = new Date(isotime);

        return (JSON.stringify({
            hour   : date.getHours(),
            minute : date.getMinutes(),
            second : date.getSeconds(),
        }));
    }

    function unixtime(isotime)
    {
        var date = new Date(isotime);

        return (JSON.stringify({
            unixtime: date.getTime()
        }));
    }

    var server = http.createServer((request, response) => {
        var json;
        var parsed = url.parse(request.url, true);

        if (parsed.pathname == '/api/parsetime')
            json = parsetime(parsed.query['iso']);

        if (parsed.pathname == '/api/unixtime')
            json = unixtime(parsed.query['iso']);

        if (json) {
            response.writeHead(200, {'content-type': 'application/json' });
            response.end(json);
        }
        else {
            response.writeHEAD(404);
            response.end("WTF");
        }
    });

    server.listen(Number(process.argv[2]));
```

The 404 response came from the 'official' answer.

Under CodeAnywhere this exercise too would not work until the timeout in the test client was lengthened.
