# Timestamp Microservice

This is the fifth and last microservice project.

It is another simple microservice that involves uploading a file and returning the number of bytes in the file.
It was done in a single day.

It does not require MongoDB.
Instead it involves using a third party 'middelware' package to handle the upload.
The instructions suggest using <https://www.npmjs.com/package/multer>

There seems to be little ambiguity in the instructions.
The user story is trivial so this project is about using the middleware.
A small frontend form is required but it is suggested you don't spend time making this look pretty.

## Set Up - My Way

I created an empty GutHub repository named `fcc-file-metadata-microservice`.

I made a copy of my local fCC boilerplate repository, renamed the remote URL and pushed:

```bash
    $ cp -pR fcc-boilerplate/ fcc-file-metadata-microservice
    $ cd fcc-file-metadata-microservice
    $ git remote set-url github git@github.com:AtelesPaniscus/fcc-file-metadata-microservice.git
    $ git push github
```

I kept the clone since local editing of README.md and other boilerplate files is less painful than using the `glitch` editor.

I imported (cloned) the new GitHub repository into a `glitch` project, renamed the `glitch` project and gave it a description.
I copied the `glitch` project URL to the GitHub repository meta-data and pinned the project in `glitch`.

## The Application

I did the setup and the first pass adaptation of:

  * README.md and LICENCE.md
  * index.html and style.css
  * package.json and server.js

A study of the (brief) `multer` documentation suggest a successful solution would be simple but,
for a novice, I felt the documentation was assuming too much prior knowledge.

I groped my way to a working solution, changing a little bit here and a little bit there.
The final hurdle requred recourse to this article: <https://stackoverflow.com/questions/31530200/node-multer-unexpected-field>.
In order to understand a crash that begins with:

```
    Error: Unexpected field
        at makeError (/app/node_modules/multer/lib/make-error.js:12:13)
```

Essentially, if in the front end `html` you have:

```html
    <input type="file" value="Browse..." name="AtelesPaniscus">
```

then somewhere in your application you need:

```js
    upload.single('AtelesPaniscus'),
```

There was nothing in the (simple) `multer` documentation to indicate a need for names to correspond.

I followed the multer examples and coded:

```js
    var upload = multer({ dest: 'uploads/' });
```

but this meant each file tht was uploaded was stored in my `glitch` project.
Oops.  For this project, this is better:

```js
    var upload = multer();
```

My solution was one source file (`server.js`) that comprised 31 lines of code.
The 'application' was a mere 6 lines.

## At the End

I used the `Export to GitHub` option in `glitch` to `push` the final project back to my GitHub repository.
In GitHub I generated a pull request, merged it and then deleted the `glitch` branch.
